import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    // is post ka owner kon hai basically
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    img: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      // required: true,
    },

    category: {
      type: String,
      default: "general",
    },
    content: {
      type: String,
      required: true,
    },

    // wo jaha ha msaved post karte hai wo
    isFeatured: {
      type: Boolean,
      default: false,
    },
    // visti no of post by user
    visit: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
