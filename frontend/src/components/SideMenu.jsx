import React from "react";
import Search from "./Search";
import { Link, useSearchParams } from "react-router-dom";
const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    console.log("SideMenu.jsx :: target.value");

    console.log(e.target.value);

    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filters</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="appearance-none w-4 h-4 bg-white  border-[1.5px] border-b-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="appearance-none w-4 h-4 bg-white border-[1.5px] border-b-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="appearance-none w-4 h-4 bg-white border-[1.5px] border-b-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="appearance-none w-4 h-4 bg-white border-[1.5px] border-b-blue-800 cursor-pointer rounded-sm checked:bg-blue-800"
            name="sort"
            value="oldest"
            onChange={handleFilterChange}
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Category</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("general")}
        >
          All
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("web-design")}
        >
          Web Design
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("development")}
        >
          Development
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("databases")}
        >
          DataBases
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("seo")}
        >
          Search Engine
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("marketing")}
        >
          Marketing
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
