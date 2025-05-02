import { Router } from "express";
import { Post } from "../models/post.model.js";
import {
  getPosts,
  getPost,
  createPost,
  deletepost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";
import { increaseVisit } from "../middlewares/increaseVisit.js";

const router = Router();
router.route("/upload-auth").get(uploadAuth);

router.route("/").get(getPosts);
router.route("/:slug").get(increaseVisit, getPost);
router.route("/").post(createPost);
router.route("/:id").delete(deletepost);
router.route("/feature").patch(featurePost);

export default router;
