import express, { Router } from "express";
import { cleakWebHook } from "../controllers/webhook.controller.js";
import bodyParser from "body-parser";

const router = Router();

router
  .route("/clerk")
  .post(bodyParser.raw({ type: "application/json" }), cleakWebHook);

// router.post(
//   "/clerk",
//   bodyParser.raw({ type: "application/json" }),
//   async (req, res) => {
//     try {
//       const payload = JSON.parse(req.body.toString()); // Parse raw body
//       console.log("Webhook Payload:", payload);

//       if (!payload.type) {
//         return res.status(400).json({ message: "Invalid webhook payload" });
//       }

//       // Process webhook event
//       res.status(200).json({ message: "Webhook processed successfully" });
//     } catch (error) {
//       console.error("Error processing webhook:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// );

export default router;
