import express from "express";
import webHookRouter from "./src/routes/webHook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
const app = express();

// TODO: this middlerware basically used for the who can edit post aur delete post anyone cannot delete another post
app.use(clerkMiddleware());
app.use("/api/v1/webhooks", webHookRouter);
app.use(express.json());

// console.log(process.env.CLIENT_URL);

app.use(cors(process.env.CLIENT_URL));

// imageki me koi bhi user authenticated hai tabhi hi image upload kar sakate hai bina authenticated ke nahi upload kar sakate hai

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// TODO: for the testing purpose only
// app.get("/auth-state" , (req , res)=>{
//     const authState = req.auth;
//     res.json(authState)
// // })

// app.get("/protect", (req, res) => {
//   const { userId } = req.auth;
//   if(!userId)
//     {
//         return res.status(401).json("not authenticated")
//     }

//     res.status(200).json("Content")
// });

// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("Content");
// });

// Routes
import userRouter from "./src/routes/user.route.js";
import postRouter from "./src/routes/post.route.js";
import commentRouter from "./src/routes/comment.route.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
// app.use("/api/v1/comments", commentRouter);

export { app };
