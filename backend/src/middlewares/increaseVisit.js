import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const increaseVisit = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;
  await Post.findOneAndUpdate({ slug }, { $inc: { visit: 1 } });
  next();
});
