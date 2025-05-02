import React from "react";
import PostListItem from "./PostListItem";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
const fetchPosts = async (pageParam, searchParams) => {
  const seachParamasObj = Object.fromEntries([...searchParams]);

  console.log(seachParamasObj);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/posts`, {
    params: {
      page: pageParam,
      limit: 10,
      ...seachParamasObj,
    },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log("PostList.jsx :: searchParams ");
  console.log(searchParams);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  console.log(data);

  if (isFetching)
    return <span className="loading loading-ring loading-lg"></span>;

  if (error)
    return (
      <Alert variant="outlined" severity="error">
        {error.message}
      </Alert>
    );
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  console.log(data);

  return (
    <InfiniteScroll
      dataLength={allPosts.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading More Posts...</h4>}
      endMessage={
        <p>
          <b>All Posts Loaded !</b>
        </p>
      }
      // below props only if you need pull down functionality
    >
      {/* {items} */}
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
    // {/* <PostListItem />
    // <PostListItem />
    // <PostListItem />
    // <PostListItem />
    // <PostListItem />
    // <PostListItem />
    // // <PostListItem /> */}
  );
};

export default PostList;
