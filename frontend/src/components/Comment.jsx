import React from "react";
import Image from "./Image";
import { format } from "timeago.js";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

const Comment = ({ comment , postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/${comment._id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    // jab succesfully post create ho jayegi tab /res.data.slug per navigate kardena
    onSuccess: (res) => {
      // console.log(`fronted :: Comments.jsx :: mutationFn :: res`);
      // console.log(res);

      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      // console.log("Query invalidated, refetching comments...");
      toast.success("Comment Has Been Successfully Deleted 🎉✅");
    },
    onError: (error) => {
      toast.error(
        `Something Went Wrong :: client :: Comments.jsx :: ${error.response.data}`
      );
    },
  });

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Image
            src={comment.user.img}
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user &&
          (comment.user.username === user.username || role === "admin") && (
            <span
              className="text-sm text-red-300 hover:text-red-500 cursor-pointer"
              onClick={() => mutation.mutate()}
            >
              Delete
              {mutation.isPending && <span>(In Progress)</span>}
            </span>
          )}
      </div>

      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
Comment;
