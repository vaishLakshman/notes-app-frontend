"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full absolute h-17 flex justify-between font-jetbrains text-red-900 bg-orange-200 shadow-md items-center px-3 z-10">
      <div className="app-logo">
        <h1 className="text-base lg:text-xl font-bold">
          <Link href={"/"}>Note-It-Down</Link>
        </h1>
      </div>
      <div className="control-container flex gap-5 mr-5">
        <h2 className="font-semibold hidden lg:block lg:text-lg">
          Welcome {"Vaishnav Lakshman C C"}
        </h2>
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={isOpen ? `M18 15l-6-6-6 6` : `M6 9l6 6 6-6`} />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-15 right-8 bg-white w-fit text-center  shadow-lg">
          <h1 className=" border-b-3 p-3 px-5 font-medium bg-orange-300">
            <Link href={"/"}>Edit Profile</Link>
          </h1>
          <h1 className="p-3 px-5 font-medium bg-orange-300 ">
            <Link href={"/"}>Logout</Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Navbar;
