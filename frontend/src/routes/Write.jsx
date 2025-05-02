import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    img && setValue((prev) => prev + `<p> <image src="${img.url}"/> </p>`);
  }, [img]);
  useEffect(() => {
    video &&
      setValue(
        (prev) =>
          prev + `<p> <iframe class="ql-video" src="${video.url}"/> </p>`
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/posts`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    // jab succesfully post create ho jayegi tab /res.data.slug per navigate kardena
    onSuccess: (res) => {
      console.log(`Write.jsx ::`);
      console.log(res);

      toast.success("Post Successfully Created 🎉✅");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className="">You Should Login !</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6  flex-1 mb-6"
      >
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add a cover Image
          </button>
        </Upload>

        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />

        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            {/* to upload the image */}
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🌆
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶️
            </Upload>
          </div>

          {/* Below is for the editor */}
          <ReactQuill
            theme="snow"
            className="flex-1  rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {"Progress : " + progress}

        {mutation.isError && (
          <span>
            {mutation.error.message} + {`\nWrite.jsx :: mutatio.isError :: `}
          </span>
        )}
      </form>
    </div>
  );
};

export default Write;

// TODO:

// @tanstack/react-query (jo pehle sirf react-query ke naam se jana jata tha) ek powerful library hai React apps ke liye, jo data fetching, caching, syncing, aur updating server state ko manage karne ke liye use hoti hai.
// 🔧 Simple words mein:
// Ye library tumhe manually useEffect, useState, axios/fetch aur loading/error handling likhne se bachati hai. Ye sab kuch smart tarike se manage karti hai.
// ✅ Key Features:
// Automatic Caching: Data ko cache karta hai taaki baar-baar API call na ho.
// Background Refetching: Pichle data ko dikhata rehta hai jab tak naya data fetch ho raha ho.
// Auto Retry: Error aaye to khud se retry karta hai.
// Pagination aur Infinite Scroll: Easy implementation.
// Devtools Support: Debug karne ke liye awesome tools milte hain.
