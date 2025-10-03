import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidHeartCircle } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger + close icons

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[65px] bg-white text-black z-50 border border-gray-200 px-5 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center text-2xl font-bold text-black">
          <BiSolidHeartCircle className="text-purple-800 mr-2 ml-3" />
          LifeLink
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-black hover:text-purple-800">
            Home
          </Link>

          <Link
            to="/signin"
            className="border border-gray-200 rounded-2xl p-2 text-black"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="border border-gray-300 rounded-2xl p-2 text-white bg-red-500 hover:bg-red-600"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center space-y-4 py-4">
          <Link
            to="/"
            className="text-black hover:text-purple-800"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/signin"
            className="border border-gray-200 rounded-2xl px-4 py-2 text-black"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="border border-gray-300 rounded-2xl px-4 py-2 text-white bg-red-500 hover:bg-red-600"
            onClick={() => setIsOpen(false)}
          >
            Join Us
          </Link>
        </div>
      )}
    </>
  );
};
