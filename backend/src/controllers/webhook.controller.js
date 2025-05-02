import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Webhook } from "svix";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";

export const cleakWebHook = asyncHandler(async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  console.log(
    `controller :: webhook.controller.js :: WEBHOOK_SECRET :: ${WEBHOOK_SECRET}`
  );

  if (!WEBHOOK_SECRET) {
    throw new ApiError(
      500,
      "controller :: webhook.controller.js :: web hook is required"
    );
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "Webhook verification failed!",
    });
  }
  //   console.log(evt.data);
  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    await newUser.save();
    console.log("User Saved to Database:", newUser);
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });

    await Post.deleteMany({ user: deletedUser._id });
    await Comment.deleteMany({ user: deletedUser._id });
  }
  return res.status(200).json({
    message: "WebHook Received",
  });
});
