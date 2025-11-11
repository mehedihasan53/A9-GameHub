import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

import {
  FaGamepad,
  FaUsers,
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navLinks = [
    { path: "/", name: "Home", icon: FaHome },
    { path: "/games", name: "All Games", icon: FaGamepad },
    {
      path: "/developer-dashboard",
      name: "Developers Dashboard",
      icon: FaUsers,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full bg-gray-800 shadow-md pt-2">
      <div className="container mx-auto navbar text-gray-200">
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} className="btn btn-ghost text-gray-300">
              <svg
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
              className="menu menu-sm dropdown-content bg-gray-800 rounded-lg z-10 mt-3 w-52 p-2 shadow"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Icon className="text-sm" /> {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            <FaGamepad className="mr-2 text-purple-400" /> GameHub
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center hover:text-purple-400 gap-1 lg:text-lg "
                  >
                    <Icon /> {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/user-info/my-profile"
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUser className="text-xl" />
                )}
                <span className="hidden sm:inline">
                  {user.displayName || "Profile"}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/auth/login"
                className="flex items-center px-3 py-1 sm:px-5 sm:py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 transition gap-2 text-sm sm:text-base"
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center px-3 py-1 sm:px-5 sm:py-2 rounded-lg font-medium bg-pink-600 hover:bg-pink-700 transition gap-2 text-sm sm:text-base"
              >
                <FaUserPlus /> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
