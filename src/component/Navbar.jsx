import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Load user from localStorage (persistent login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown") &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/signin", { replace: true });
  };

  const handleProfileClick = () => {
    if (!user) return;
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
        navigate("/");
    }
    setDropdownOpen(false);
  };

  const firstLetter = user ? user.name.charAt(0).toUpperCase() : "";

  return (
    <main className="fixed top-2 md:top-5 left-0 w-full flex h-[60px] justify-between z-50 md:px-4 items-center ">
      {/* Desktop brand */}
      <div className="md:flex hidden items-center text-2xl font-bold text-red-600">
        LifeLink <FaHeartbeat className="mr-3 ml-3" />
      </div>

      <nav className="bg-white h-full md:w-auto w-full text-black z-50 shadow-md flex justify-between items-center px-6 rounded-xl md:rounded-3xl">
        {/* Mobile brand */}
        <div className="flex md:hidden items-center text-2xl font-bold text-red-600">
          LifeLink <FaHeartbeat className="mr-3 ml-3" />
        </div>

        {/* Menu links */}
        <div
          className={`md:flex items-center space-x-6 transition-transform duration-300 ease-in-out ${
            menuOpen
              ? "fixed top-[65px] right-0 w-52 bg-white shadow-lg flex flex-col space-y-4 p-6 z-40 h-auto"
              : "hidden md:flex"
          }`}
        >
          <Link
            to="/"
            onClick={() => handleLinkClick("home")}
            className={`relative font-medium transition-colors duration-300 ${
              activeLink === "home" ? "text-red-700" : "hover:text-red-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => handleLinkClick("about")}
            className={`relative font-medium transition-colors duration-300 ${
              activeLink === "about" ? "text-red-700" : "hover:text-red-700"
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => handleLinkClick("contact")}
            className={`relative font-medium transition-colors duration-300 ${
              activeLink === "contact" ? "text-red-700" : "hover:text-red-700"
            }`}
          >
            Contact Us
          </Link>

          {/* Register dropdown */}
          {/* <div className="relative dropdown">
            <button
              onClick={(e) => {
                handleLinkClick("");
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="font-medium cursor-pointer hover:text-red-700 flex items-center"
            >
              Register Now <IoMdArrowDropdown />
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <Link
                  to="/register-donor"
                  onClick={() => handleLinkClick("donor")}
                  className="block px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Register as Donor
                </Link>
                <Link
                  to="/register-recipient"
                  onClick={() => handleLinkClick("recipient")}
                  className="block px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Register as Recipient
                </Link>
              </div>
            )}
          </div> */}
        </div>

        {/* Hamburger (mobile) */}
        <div
          className="md:hidden flex flex-col cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="h-[3px] w-6 bg-red-600 mb-1"></div>
          <div className="h-[3px] w-6 bg-red-600 mb-1"></div>
          <div className="h-[3px] w-6 bg-red-600"></div>
        </div>
      </nav>

      {/* Right Section: Login / Join / Profile */}
      <div ref={profileRef} className="hidden md:flex items-center gap-3">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center bg-red-600 text-white font-semibold hover:bg-red-700"
            >
              {firstLetter}
            </button>

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
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-600 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/signin"
              className="border border-gray-200 rounded-xl px-4 py-2 text-black hover:bg-gray-100"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Join Us
            </NavLink>
          </>
        )}
      </div>
    </main>
  );
};

export default Navbar;
