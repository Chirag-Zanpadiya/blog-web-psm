import express from "express";
import { Router } from "express";
import { getUserSavedPosts , savePost } from "../controllers/user.controller.js";
const router = Router();

// router.route("/test").get((req , res)=>{
//     res.send("chirag Zanpadiya is here")
// })
// router.route("/dev").get((req , res)=>{
//     res.send("chirag Zanpadiya is here with development")
// })

router.route("/saved").get(getUserSavedPosts);
router.route("/save").patch(savePost);
export default router;
