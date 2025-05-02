import { IKImage } from "imagekitio-react";
import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";


import Image from "./Image";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="/logo.png" alt="logo photo" w={64} h={64} />
        <div className="flex flex-col justify-center items-center mt-2">
          <span>ZCATechX</span>
          <span>Logo</span>
        </div>
      </Link>
      {/* mobilelogo */}
      <div className="md:hidden">
        {/* mobile btn */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "❌" : "☰"}
        </div>
        {/* mobile link list */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 bg-[#e6e6ff] transition-all ease-in-out  ${
            open ? "-right-0" : "-right-[100%]"
          } `}
        >
          <Link to="/">Home</Link>
          <Link to="/">Treading</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              {" "}
              Login 🧑‍💻{" "}
            </button>
          </Link>
        </div>
      </div>
      {/* destop menu */}
      <div className="hidden md:flex items-center gap-0 xl:gap-12 font-medium">
        <Link to="">Home</Link>
        <Link to="">Treading</Link>
        <Link to="">Most Popular</Link>
        <Link to="">About</Link>
        <SignedOut>
          <Link to="/login" className="cursor-pointer">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              {" "}
              Login 🧑‍💻{" "}
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default NavBar;
