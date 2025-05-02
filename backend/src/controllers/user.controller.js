import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// user ki saved post ke liye
export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;
  console.log("usercontroller.js :: getUserSavedPosts ");

  console.log(req.auth.userId); // Debugging
  if (!clerkUserId) {
    return res.status(401).json("User Is Not Authenticated");
  }
  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json("User not found");
  }
  console.log("user.controller.js :: yahatab a gaye hai ham ::");
  
  res.status(200).json(user.savedPosts);
};

// save post
export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;
  if (!clerkUserId) {
    return res.status(401).json("User Is Not Authenticated");
  }
  const user = await User.findOne({ clerkUserId });

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  setTimeout(() => {
    res.status(200).json(isSaved ? "Post UnSaved" : "Post Saved");
  }, 500);
};
