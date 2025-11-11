import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaCalendar,
} from "react-icons/fa";
import { useAuth } from "../Provider/AuthProvider";

const MyProfile = () => {
  const { user } = useAuth();

  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-300 text-lg">Manage your gaming identity</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="xl:col-span-1">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-600/30 hover:border-pink-500/50 transition-all duration-500 hover:shadow-pink-500/10 text-center">
              <div className="mb-6 relative inline-block">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="Profile"
                  className="w-36 h-36 rounded-full border-4 border-gradient-to-r from-pink-500 to-purple-500 object-cover shadow-2xl hover:scale-105 transition-transform duration-300"
                  onError={(e) =>
                    (e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png")
                  }
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 animate-pulse"></div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 truncate">
                {user?.displayName || "No Name Set"}
              </h2>
              <p className="text-gray-300 text-sm mb-4 truncate">
                {user?.email}
              </p>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-4 py-2 rounded-full text-sm border border-green-500/30 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Active Player
              </div>

              <Link to="/user-info/update-profile" className="block">
                <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg group">
                  <FaEdit className="group-hover:rotate-12 transition-transform duration-300" />
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>

          {/* Account Info */}
          <div className="xl:col-span-3">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-600/30 hover:border-blue-500/50 transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Account Information
                  </h3>
                  <p className="text-gray-400">
                    Your personal gaming profile details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/50 hover:border-pink-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <FaUser className="text-pink-400 text-lg" />
                    </div>
                    <span className="text-gray-400 font-medium">
                      Display Name
                    </span>
                  </div>
                  <p className="text-white text-xl font-bold truncate group-hover:text-pink-400 transition-colors">
                    {user?.displayName || "Not set"}
                  </p>
                </div>

                <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/50 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FaEnvelope className="text-blue-400 text-lg" />
                    </div>
                    <span className="text-gray-400 font-medium">
                      Email Address
                    </span>
                  </div>
                  <p className="text-white text-lg font-medium truncate group-hover:text-blue-400 transition-colors">
                    {user?.email}
                  </p>
                </div>

                <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/50 hover:border-green-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      {user?.emailVerified ? (
                        <FaCheck className="text-green-400 text-lg" />
                      ) : (
                        <FaTimes className="text-yellow-400 text-lg" />
                      )}
                    </div>
                    <span className="text-gray-400 font-medium">
                      Email Status
                    </span>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      user?.emailVerified
                        ? "text-green-400 group-hover:text-green-300"
                        : "text-yellow-400 group-hover:text-yellow-300"
                    } transition-colors`}
                  >
                    {user?.emailVerified ? "Verified" : "Not Verified"}
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/50 hover:border-purple-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FaCalendar className="text-purple-400 text-lg" />
                    </div>
                    <span className="text-gray-400 font-medium">
                      Member Since
                    </span>
                  </div>
                  <p className="text-white text-lg font-bold text-purple-400">
                    {memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center bg-gray-800/50 rounded-2xl p-6 border border-gray-600/30">
          <p className="text-gray-400">
            Need help with your account?{" "}
            <span className="text-pink-400 hover:text-pink-300 cursor-pointer font-medium">
              Contact our support team
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
