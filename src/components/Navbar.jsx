import React from "react";
import { Link } from "react-router-dom";
import {
  FaGamepad,
  FaUsers,
  FaHome,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const navLinks = [
    { path: "/", name: "Home", icon: <FaHome className="mr-1" /> },
    { path: "/games", name: "All Games", icon: <FaGamepad className="mr-1" /> },
    {
      path: "/developers",
      name: "Developers",
      icon: <FaUsers className="mr-1" />,
    },
  ];

  return (
    <div className="w-full bg-gray-800 shadow-md">
      <div className="container mx-auto navbar text-gray-200">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#121926] rounded-lg z-10 mt-3 w-52 p-2 shadow text-gray-200"
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl font-bold ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            <FaGamepad className="mr-2 text-purple-400" />
            GameHub
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  className="flex items-center hover:text-purple-400"
                  to={link.path}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-2">
          <Link
            to="/login"
            className="flex items-center px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 transition"
          >
            <FaSignInAlt className="mr-2" /> Login
          </Link>

          <Link
            to="/register"
            className="flex items-center px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 transition"
          >
            <FaUserPlus className="mr-2" /> Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
