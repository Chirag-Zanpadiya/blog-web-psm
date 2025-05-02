import { Router } from "express";
import {
  getPostComments,
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
const router = Router();

router.route("/comment").get((req, res) => {
  res.send("this is comment routes");
});

router.route("/:postId").get(getPostComments);
router.route("/:postId").post(addComment);
router.route("/:id").delete(deleteComment);

export default router;
