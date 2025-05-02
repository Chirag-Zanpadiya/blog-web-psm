import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ImageKit from "imagekit";

export const getPosts = asyncHandler(async (req, res) => {
  // TODO: page == 1
  const page = parseInt(req.query.page) || 1;

  // TODO: page == 1 2 item show me
  const limit = parseInt(req.query.limit) || 2;

  const query = {};

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }
  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };
  }
  if (author) {
    const user = await User.findOne({ username: author }).select("_id");
    if (!user) {
      return res.status(404).json("No Posts Found");
    }

    query.user = user._id;
  }

  let sortObject = { createdAt: -1 };
  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObject = { createdAt: -1 };
        break;

      case "oldest":
        sortObject = { createdAt: 1 };
        break;

      case "trending":
        sortObject = { visit: -1 };
        break;

      case "popular":
        sortObject = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;

      default:
        break;
    }
  }

  if (featured) {
    query.isFeatured = true;
  }

  const posts = await Post.find(query)
    .populate("user", "username")
    .sort(sortObject)
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  // res.status(200).json(new ApiResponse(201, posts));

  res.status(200).json({ posts, hasMore });
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    // TODO: yaha pe mene spelling mistake ki thi
    "username img"
  );
  res.status(200).json(post);
});

export const createPost = asyncHandler(async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    throw new ApiError(401, "Invalid Access or User is Not Authenticated");
  }

  // TODO: cleark ke ayi huvi id kya DB me hai agar nahi hai toh
  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json("User not found!");
  }

  // unique slug create karna hai + DB me isname slug already hai toh usko piche like test hai pehle DB me toh test2 add kardo

  // let slug = "My New Post" =>"my-new-post"
  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  let existingPost = await Post.findOne({ slug });

  let counter = 2;

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }

  const newPost = new Post({
    user: user._id,
    slug,
    ...req.body,
  });

  const post = await newPost.save();

  res.status(200).json(post);
});

export const deletepost = asyncHandler(async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    throw new ApiError(401, "Invalid Access or User is Not Authenticated");
  }

  // TODO: agar admin hai toh bhi post delete kar sakate hai
  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role == "admin") {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json("Post Has Been Deleted By Admin ");
  }

  // TODO: cleark ke ayi huvi id kya DB me hai agar nahi hai toh
  const user = await User.findOne({ clerkUserId });

  const deletedPost = await Post.findByIdAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    return res
      .status(403)
      .json(
        new ApiError(
          403,
          "You Can Not Delete This Post As You Not Belogs To This Post Or This Is Not Your Post"
        )
      );
  }
  res
    .status(200)
    .json(new ApiResponse(200, deletedPost, "Post Deleted SuccessFully"));
});

// ImageKit secret keys
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
  // res.status(200).json(new ApiResponse(200, result, "Authenticated User"));
};

export const featurePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    throw new ApiError(401, "Invalid Access or User is Not Authenticated");
  }

  // TODO:
  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role !== "admin") {
    return res
      .status(403)
      .json("You Are Not Admind So You Cannot Featured Post");
  }

  // TODO: cleark ke ayi huvi id kya DB me hai agar nahi hai toh
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json("Post Not Found");
  }
  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  res.status(200).json(updatedPost);
};
