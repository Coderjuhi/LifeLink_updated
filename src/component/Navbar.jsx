import React from "react";
import { Link } from "react-router-dom";
import { BiSolidHeartCircle } from "react-icons/bi";

export const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white text-black z-50 border border-gray-200 
        px-3 sm:px-5 py-2 sm:py-3 flex justify-between items-center">
        
        {/* Brand */}
        <div className="flex items-center text-lg sm:text-2xl font-bold text-black">
          <BiSolidHeartCircle className="text-purple-800 mr-2 ml-1 sm:ml-3 w-5 h-5 sm:w-7 sm:h-7" />
          LifeLink
        </div>

        {/* Links in a row (responsive spacing) */}
        <div className="flex flex-row gap-2 sm:gap-6">
          <Link
            to="/"
            className="px-2 sm:px-4 py-1 sm:py-2 rounded-2xl text-black hover:text-purple-800 hover:bg-gray-100"
          >
            Home
          </Link>

          <Link
            to="/signin"
            className="border border-gray-200 rounded-2xl px-2 sm:px-4 py-1 sm:py-2 text-black hover:bg-gray-100"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="border border-gray-300 rounded-2xl px-2 sm:px-4 py-1 sm:py-2 text-white bg-red-500 hover:bg-red-600"
          >
            Join Us
          </Link>
        </div>
      </nav>
    </>
  );
};
