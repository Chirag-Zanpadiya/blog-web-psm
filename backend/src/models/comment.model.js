import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    //kis user ne comment ki 
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    //kis user ne kis post per comment ki hai 
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
