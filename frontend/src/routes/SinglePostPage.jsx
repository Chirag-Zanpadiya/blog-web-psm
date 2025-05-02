import React from "react";
import Image from "../components/Image";
import { Link, useParams } from "react-router-dom";

import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@mui/material";
import axios from "axios";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  // console.log("singlePost.jsx :: slug");
  // console.log(slug.queryKey[1]);
  // console.log(slug);

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/posts/${slug}`
  );

  // console.log("singlePost.jsx :: res");

  // console.log(res.data.user);

  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) {
    return (
      <Alert variant="outlined" severity="info">
        Loading...
      </Alert>
    );
  }

  if (error)
    return (
      <Alert variant="outlined" severity="error">
        {error.message}
      </Alert>
    );
  // console.log("singlePost.jsx :: data ::");

  // console.log(data.user);

  if (!data) {
    return (
      <Alert variant="outlined" severity="warning">
        Data not found
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-2xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>written By</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} w="600" className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col  md:flex-row gap-12">
        {/* text */}

        {/* TODO: yaha pe sare main content hai data.content */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            eligendi et excepturi saepe culpa laudantium harum architecto
            veritatis, libero quae earum aspernatur molestiae magnam
            consequuntur eaque tempore optio similique dolore aliquid error
            quaerat voluptates quam repudiandae officia. Earum aliquid id ipsam
            soluta repellat culpa quam voluptates, deleniti ipsum illum nemo
            sequi totam? Ducimus aliquam quam illum dolor eveniet consequatur
            quidem asperiores fuga, quasi neque vel quibusdam tempore voluptates
            ratione facilis eligendi reprehenderit magni voluptatibus accusamus.
            Repudiandae in cum quidem cumque ea rerum quas ipsum reprehenderit
            harum obcaecati amet exercitationem nulla dicta magnam, corporis
            ipsa quaerat aspernatur vel itaque laudantium dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            veritatis deserunt quo. In ullam ut quod voluptatem eius, est earum
            culpa? Beatae unde quidem tempore corporis voluptas perferendis
            distinctio voluptatem veritatis cupiditate aspernatur et ex ducimus
            iure vero laudantium veniam inventore ab voluptate est expedita
            accusantium at, mollitia ea reprehenderit. Illum cumque dolores
            quasi, error odio expedita. Doloribus amet debitis sunt rem quae a
            commodi necessitatibus nihil dignissimos quod, id consequatur
            distinctio voluptatibus. Quasi consequatur tenetur excepturi,
            perferendis cupiditate commodi. Fugit exercitationem, dignissimos
            impedit odio autem culpa excepturi iure nam? Perspiciatis iste
            molestiae beatae, voluptatem deserunt pariatur praesentium quos.
            Illo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            veritatis deserunt quo. In ullam ut quod voluptatem eius, est earum
            culpa? Beatae unde quidem tempore corporis voluptas perferendis
            distinctio voluptatem veritatis cupiditate aspernatur et ex ducimus
            iure vero laudantium veniam inventore ab voluptate est expedita
            accusantium at, mollitia ea reprehenderit. Illum cumque dolores
            quasi, error odio expedita. Doloribus amet debitis sunt rem quae a
            commodi necessitatibus nihil dignissimos quod, id consequatur
            distinctio voluptatibus. Quasi consequatur tenetur excepturi,
            perferendis cupiditate commodi. Fugit exercitationem, dignissimos
            impedit odio autem culpa excepturi iure nam? Perspiciatis iste
            molestiae beatae, voluptatem deserunt pariatur praesentium quos.
            Illo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            veritatis deserunt quo. In ullam ut quod voluptatem eius, est earum
            culpa? Beatae unde quidem tempore corporis voluptas perferendis
            distinctio voluptatem veritatis cupiditate aspernatur et ex ducimus
            iure vero laudantium veniam inventore ab voluptate est expedita
            accusantium at, mollitia ea reprehenderit. Illum cumque dolores
            quasi, error odio expedita. Doloribus amet debitis sunt rem quae a
            commodi necessitatibus nihil dignissimos quod, id consequatur
            distinctio voluptatibus. Quasi consequatur tenetur excepturi,
            perferendis cupiditate commodi. Fugit exercitationem, dignissimos
            impedit odio autem culpa excepturi iure nam? Perspiciatis iste
            molestiae beatae, voluptatem deserunt pariatur praesentium quos.
            Illo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            veritatis deserunt quo. In ullam ut quod voluptatem eius, est earum
            culpa? Beatae unde quidem tempore corporis voluptas perferendis
            distinctio voluptatem veritatis cupiditate aspernatur et ex ducimus
            iure vero laudantium veniam inventore ab voluptate est expedita
            accusantium at, mollitia ea reprehenderit. Illum cumque dolores
            quasi, error odio expedita. Doloribus amet debitis sunt rem quae a
            commodi necessitatibus nihil dignissimos quod, id consequatur
            distinctio voluptatibus. Quasi consequatur tenetur excepturi,
            perferendis cupiditate commodi. Fugit exercitationem, dignissimos
            impedit odio autem culpa excepturi iure nam? Perspiciatis iste
            molestiae beatae, voluptatem deserunt pariatur praesentium quos.
            Illo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            veritatis deserunt quo. In ullam ut quod voluptatem eius, est earum
            culpa? Beatae unde quidem tempore corporis voluptas perferendis
            distinctio voluptatem veritatis cupiditate aspernatur et ex ducimus
            iure vero laudantium veniam inventore ab voluptate est expedita
            accusantium at, mollitia ea reprehenderit. Illum cumque dolores
            quasi, error odio expedita. Doloribus amet debitis sunt rem quae a
            commodi necessitatibus nihil dignissimos quod, id consequatur
            distinctio voluptatibus. Quasi consequatur tenetur excepturi,
            perferendis cupiditate commodi. Fugit exercitationem, dignissimos
            impedit odio autem culpa excepturi iure nam? Perspiciatis iste
            molestiae beatae, voluptatem deserunt pariatur praesentium quos.
            Illo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            veritatis deserunt quo. In ullam ut quod voluptatem eius, est earum
            culpa? Beatae unde quidem tempore corporis voluptas perferendis
            distinctio voluptatem veritatis cupiditate aspernatur et ex ducimus
            iure vero laudantium veniam inventore ab voluptate est expedita
            accusantium at, mollitia ea reprehenderit. Illum cumque dolores
            quasi, error odio expedita. Doloribus amet debitis sunt rem quae a
            commodi necessitatibus nihil dignissimos quod, id consequatur
            distinctio voluptatibus. Quasi consequatur tenetur excepturi,
            perferendis cupiditate commodi. Fugit exercitationem, dignissimos
            impedit odio autem culpa excepturi iure nam? Perspiciatis iste
            molestiae beatae, voluptatem deserunt pariatur praesentium quos.
            Illo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            veritatis deserunt quo. In ullam ut quod voluptatem eius, est earum
            culpa? Beatae unde quidem tempore corporis voluptas perferendis
            distinctio voluptatem veritatis cupiditate aspernatur et ex ducimus
            iure vero laudantium veniam inventore ab voluptate est expedita
            accusantium at, mollitia ea reprehenderit. Illum cumque dolores
            quasi, error odio expedita. Doloribus amet debitis sunt rem quae a
            commodi necessitatibus nihil dignissimos quod, id consequatur
            distinctio voluptatibus. Quasi consequatur tenetur excepturi,
            perferendis cupiditate commodi. Fugit exercitationem, dignissimos
            impedit odio autem culpa excepturi iure nam? Perspiciatis iste
            molestiae beatae, voluptatem deserunt pariatur praesentium quos.
            Illo.
          </p>
        </div>
        <div className="px-4 h-max sticky top-8">
          <h1 className=" mb-4 text-sm font-medium">Author</h1>
          <div className=" flex flex-col gap-8">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">adipisicing elit. Ratione</p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline">All</Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
