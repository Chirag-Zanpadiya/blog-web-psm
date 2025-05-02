import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    img: {
      type: String,
    },

    savedPosts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
