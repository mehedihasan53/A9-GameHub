import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaGamepad } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-[120px] font-bold text-pink-500">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          Looks like you took a wrong turn. This page doesn’t exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
          >
            <FaHome /> Go Home
          </Link>

          <Link
            to="/games"
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg border border-gray-700"
          >
            <FaGamepad /> Browse Games
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
