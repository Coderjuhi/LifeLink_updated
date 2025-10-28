import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidHeartCircle } from "react-icons/bi";

export const Navbar = ({ user, setUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const firstLetter = user ? user.name.charAt(0).toUpperCase() : "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/signin", { replace: true });
  };

  const handleProfileClick = () => {
    if (!user) return;

    // Redirect based on accountType
    switch (user.accountType) {
      case "donor":
        navigate("/blood-donor");
        break;
      case "recipient":
        navigate("/recipient");
        break;
      case "hospital":
        navigate("/hospital");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        navigate("/"); // fallback
        break;
    }
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black z-50 border border-gray-200 
      px-3 sm:px-5 py-2 sm:py-3 flex justify-between items-center">
      
      {/* Brand */}
      <div className="flex items-center text-lg sm:text-2xl font-bold text-black">
        <BiSolidHeartCircle className="text-purple-800 mr-2 ml-1 sm:ml-3 w-5 h-5 sm:w-7 sm:h-7" />
        LifeLink
      </div>

      {/* Links */}
      <div className="flex flex-row gap-2 sm:gap-6 items-center relative">
        <Link
          to="/"
          className="px-2 sm:px-4 py-1 sm:py-2 rounded-2xl text-black hover:text-purple-800 hover:bg-gray-100"
        >
          Home
        </Link>

        {user ? (
          <div ref={dropdownRef} className="relative">
            {/* Badge as dropdown toggle */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border border-gray-200 rounded-2xl px-2 sm:px-4 py-1 sm:py-2 text-black flex items-center gap-2 hover:bg-gray-100"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-800 text-white flex items-center justify-center text-sm sm:text-base font-semibold">
                {firstLetter}
              </div>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-50">
                <button
                  onClick={handleProfileClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signin"
            className="border border-gray-200 rounded-2xl px-2 sm:px-4 py-1 sm:py-2 text-black hover:bg-gray-100 flex items-center gap-2"
          >
            Sign In
          </Link>
        )}

        <Link
          to="/signup"
          className="border border-gray-300 rounded-2xl px-2 sm:px-4 py-1 sm:py-2 text-white bg-red-500 hover:bg-red-600"
        >
          Join Us
        </Link>
      </div>
    </nav>
  );
};
