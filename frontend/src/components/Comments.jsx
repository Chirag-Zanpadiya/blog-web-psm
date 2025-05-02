import React from "react";
import Comment from "./Comment";
import { Alert } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const fetchComments = async (postId) => {
  // console.log("singlePost.jsx :: slug");
  // console.log(slug.queryKey[1]);
  // console.log(slug);

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/comments/${postId}`
    );

    // console.log("singlePost.jsx :: res");

    // console.log(res.data.user);

    return res.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments");
  }
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      console.log("Comment.jsx :: mutattionFn :: token", token);
      console.log("Comment.jsx :: mutattionFn :: newComment", newComment);
      return axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    // jab succesfully post create ho jayegi tab /res.data.slug per navigate kardena
    onSuccess: (res) => {
      console.log(`fronted :: Comments.jsx :: mutationFn :: res`);
      console.log(res);

      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      console.log("Query invalidated, refetching comments...");
      toast.success("Comment Has Been Successfully Created 🎉✅");
    },
    onError: (error) => {
      toast.error(
        `Something Went Wrong :: client :: Comments.jsx :: ${error.response.data}`
      );
    },
  });

  // if (isPending) {
  //   return (
  //     <Alert variant="outlined" severity="info">
  //       Loading...
  //     </Alert>
  //   );
  // }

  // if (error)
  //   return (
  //     <Alert variant="outlined" severity="error">
  //       {error.message}
  //     </Alert>
  //   );
  // console.log("singlePost.jsx :: data ::");

  // console.log(data.user);

  // if (!data) {
  //   return (
  //     <Alert variant="outlined" severity="warning">
  //       Comments Not Found
  //     </Alert>
  //   );
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      desc: formData.get("desc"),
    };
    console.log("Comment.jsx :: data ");

    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          placeholder="Write Your Comments..."
          className="w-full p-4 rounded-xl bg-amber-50"
        ></textarea>
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
          Send
        </button>
      </form>
      {isPending ? (
        <Alert variant="outlined" severity="info">
          Loading...
        </Alert>
      ) : error ? (
        <Alert variant="outlined" severity="error">
          {error.message}
        </Alert>
      ) : (
        <>
          {mutation.isPending && (
            <Comment
              comment={{
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user.imageUrl,
                  username: user.username,
                },
              }}
            />
          )}
          {data.map((comment) => (
            <Comment key={comment._id} comment={comment} postId = {postId} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
