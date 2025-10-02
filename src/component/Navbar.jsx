import React from 'react'
import { Link } from 'react-router-dom'

import { BiSolidHeartCircle } from 'react-icons/bi'
export const Navbar = () => {
  return (
    <>
    <nav className="fixed top-0 left-0 w-full h-[65px] bg-white text-black z-50 border border-gray-200
     flex justify-between items-center px-5">
        {/* Brand */}

        <div className="flex items-center text-2xl font-bold text-black">
          <BiSolidHeartCircle className="text-purple-800 mr-2 ml-3" />
          LifeLink
        </div>
        <div
          className="md:flex items-center space-x-6 transition-transform duration-300 ease-in-out ">
         <Link
          to="/"
          className="  text-black hover:text-purple-800 "
        >
          Home
        </Link>
       
         <Link
          to="/signin"
          className="border border-gray-200 rounded-2xl p-2 text-black "
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
      </nav>
      </>
  )
}
