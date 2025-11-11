import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { FaCheck, FaUser, FaImage } from "react-icons/fa";

const UpdateProfile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await updateUser({ displayName: name, photoURL: photo });
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        navigate("/user-info/my-profile");
      }, 2000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    //   console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Update Profile
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Update your personal information
        </p>

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-300 rounded-lg flex items-center gap-2">
            <FaCheck className="text-green-400" />
            {message}{" "}
            <span className="text-green-200 text-sm">Redirecting...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Display Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-600 focus:border-pink-500 transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Profile Photo URL
            </label>
            <div className="relative">
              <FaImage className="absolute left-3 top-3 text-gray-400" />
              <input
                type="url"
                placeholder="Enter photo URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-600 focus:border-pink-500 transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <FaCheck />
                Update Profile
              </>
            )}
          </button>
        </form>

        {/* Current Email */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            Current email: <span className="text-white">{user?.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
