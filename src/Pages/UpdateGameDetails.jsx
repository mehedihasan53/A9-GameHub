import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import {
  FaCode,
  FaGamepad,
  FaLink,
  FaStar,
  FaUndo,
  FaUpload,
  FaSave,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";

const UpdateGameDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [game, setGame] = useState(null);

  // Categories from your database
  const categories = [
    "Strategy",
    "Sandbox",
    "Shooter",
    "Battle Royale",
    "Multiplayer",
    "MOBA",
    "Short Video",
    "Endless Runner",
    "Board Game",
    "Card Game",
    "Platformer",
    "Puzzle",
    "Role-Playing",
    "Sports",
  ];

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    coverPhoto: "",
    developer: "",
    category: "Strategy",
    downloadLink: "",
    ratings: "",
    description: "",
    email: user?.email || "",
  });

  // Fetch game data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/addUser/${id}`)
      .then((res) => {
        const gameData = res.data;
        setGame(gameData);

        // Populate form with game data
        setFormData({
          title: gameData.title || "",
          coverPhoto: gameData.coverPhoto || "",
          developer: gameData.developer || "",
          category: gameData.category || "Strategy",
          downloadLink: gameData.downloadLink || "",
          ratings: gameData.ratings?.toString() || "",
          description: gameData.description || "",
          email: gameData.email || user?.email || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching game:", error);
        setLoading(false);
      });
  }, [id, user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setSuccess(false);

    const updatedData = {
      ...formData,
      ratings: parseFloat(formData.ratings) || 0,
    };

    console.log("Updating game data:", updatedData);

    try {
      const res = await axios.put(
        `http://localhost:3000/addUser/${id}`,
        updatedData
      );
      console.log("Update response:", res.data);
      setSuccess(true);

      // Show success message for 2 seconds then redirect
      setTimeout(() => {
        navigate(-1); // Go back to previous page
      }, 2000);
    } catch (error) {
      console.error("Error updating game:", error);
      alert("Failed to update game. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // Reset form to original game data
  const handleReset = () => {
    if (game) {
      setFormData({
        title: game.title || "",
        coverPhoto: game.coverPhoto || "",
        developer: game.developer || "",
        category: game.category || "Strategy",
        downloadLink: game.downloadLink || "",
        ratings: game.ratings?.toString() || "",
        description: game.description || "",
        email: game.email || user?.email || "",
      });
    }
    setSuccess(false);
  };

  // Go back
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading game details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Back Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleGoBack}
            className="absolute left-4 top-4 p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            title="Go Back"
          >
            <FaArrowLeft className="text-xl text-gray-400" />
          </button>

          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <FaGamepad className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Update Game</h1>
          </div>
          <p className="text-gray-400">
            Update details for:{" "}
            <span className="text-purple-400 font-semibold">{game?.title}</span>
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-500/20 border border-green-500/40 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FaSave className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-400">
                  Game Updated Successfully!
                </p>
                <p className="text-green-300 text-sm">
                  Redirecting to previous page...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                <span className="flex items-center gap-2">
                  <FaGamepad className="text-purple-400" />
                  Game Title *
                </span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl p-3.5 text-white 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent transition-all"
                placeholder="Clash of Clans"
              />
            </div>

            {/* Cover Photo */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                <span className="flex items-center gap-2">
                  <FaUpload className="text-pink-400" />
                  Cover Photo URL *
                </span>
              </label>
              <input
                name="coverPhoto"
                type="url"
                value={formData.coverPhoto}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl p-3.5 text-white 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 
                         focus:border-transparent transition-all"
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                <span className="flex items-center gap-2">
                  <FaGamepad className="text-blue-400" />
                  Category *
                </span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl p-3.5 text-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-all"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Developer */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                <span className="flex items-center gap-2">
                  <FaCode className="text-green-400" />
                  Developer *
                </span>
              </label>
              <input
                name="developer"
                value={formData.developer}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl p-3.5 text-white 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 
                         focus:border-transparent transition-all"
                placeholder="Supercell, EA Sports, etc."
              />
            </div>

            {/* Download Link */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                <span className="flex items-center gap-2">
                  <FaLink className="text-yellow-400" />
                  Download Link *
                </span>
              </label>
              <input
                name="downloadLink"
                type="url"
                value={formData.downloadLink}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl p-3.5 text-white 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 
                         focus:border-transparent transition-all"
                placeholder="https://supercell.com/en/games/clashofclans/"
              />
            </div>

            {/* Ratings */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                <span className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  Ratings (0 - 5) *
                </span>
              </label>
              <div className="relative">
                <input
                  name="ratings"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.ratings}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/70 border border-gray-700 rounded-xl p-3.5 text-white 
                           placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 
                           focus:border-transparent transition-all pl-12"
                  placeholder="4.6"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FaStar className="text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Game Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl p-4 text-white 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent transition-all resize-none"
                rows="4"
                placeholder="Describe the game features, gameplay mechanics, story..."
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                <span className="flex items-center gap-2">
                  <FaEnvelope className="text-cyan-400" />
                  Your Email *
                </span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl p-3.5 text-white 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 
                         focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
              {user && (
                <p className="text-xs text-gray-400 mt-1">
                  Logged in as:{" "}
                  <span className="text-cyan-300">{user.email}</span>
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 
                         hover:to-pink-700 text-white font-semibold py-3.5 px-6 rounded-xl 
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed 
                         flex items-center justify-center gap-3"
              >
                {updating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Update Game</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold 
                         rounded-xl border border-gray-700 transition-all flex items-center gap-3"
              >
                <FaUndo />
                <span>Reset</span>
              </button>
            </div>

            {/* Form Note */}
            <div className="pt-4 border-t border-gray-700/50">
              <p className="text-sm text-gray-400 text-center">
                * Required fields. Your email will be stored securely.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateGameDetails;
