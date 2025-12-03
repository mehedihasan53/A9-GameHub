import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import {
  FaEdit,
  FaTrash,
  FaStar,
  FaGamepad,
  FaPlus,
  FaChartBar,
  FaCrown,
  FaLayerGroup,
  FaCalendar,
  FaEye,
  FaDownload,
  FaUser,
} from "react-icons/fa";

const MyGame = () => {
  const [myGame, setMyGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  // Assuming useAuth provides user data, including metadata for creation time
  const { user } = useAuth();
  const navigate = useNavigate();

  /**
   * Format date function
   * Displays relative time (Today, 3 days ago) or a short date.
   */
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "Recently";
      }

      const now = new Date();
      // Calculate time difference in milliseconds
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return "Today";
      } else if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      } else {
        // Format for older dates
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Recently";
    }
  };

  /**
   * Format time for better display (e.g., 04:20 PM)
   */
  const formatTime = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "";
    }
  };

  /**
   * Fetch user's games using useEffect
   */
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      // Fetch games associated with the logged-in user's email
      fetch(`http://localhost:3000/my-game?email=${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch games");
          }
          return res.json();
        })
        .then((data) => {
          // Process data: ensure createdAt and ratings are present and correctly typed
          const gamesWithDate = data.map((game) => ({
            ...game,
            // Fallback for createdAt if missing
            createdAt: game.createdAt || new Date().toISOString(),
            // Ensure ratings is a float, defaulting to 0
            ratings: parseFloat(game.ratings) || 0,
          }));
          setMyGame(gamesWithDate);
          setFilteredGames(gamesWithDate);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  /**
   * Sort games based on the selected criteria (sortBy)
   */
  useEffect(() => {
    let sorted = [...myGame];
    switch (sortBy) {
      case "rating":
        // Sort descending by rating
        sorted.sort((a, b) => b.ratings - a.ratings);
        break;
      case "name":
        // Sort alphabetically by title
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "recent":
        // Sort descending by creation date (most recent first)
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });
        break;
      default:
        break;
    }
    setFilteredGames(sorted);
  }, [sortBy, myGame]);

  /**
   * Handle game deletion
   */
  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (!proceed) return;

    fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Delete response:", data);
        if (data.deletedCount > 0) {
          // Optimistically update UI
          setMyGame((prevGames) => prevGames.filter((game) => game._id !== id));
          alert("🎮 Game deleted successfully!");
        } else {
          alert("Failed to delete game.");
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Error deleting game.");
      });
  };

  /**
   * Handle navigation to the edit page
   */
  const handleEdit = (id) => {
    navigate(`/new/update-game-details/${id}`);
  };

  /**
   * Calculate summary statistics
   */
  const totalGames = myGame.length;
  const avgRating =
    myGame.length > 0
      ? (
          myGame.reduce((acc, game) => acc + game.ratings, 0) / myGame.length
        ).toFixed(1)
      : 0;
  const topRatedGames = myGame.filter((g) => g.ratings >= 4).length;
  // Get unique categories
  const categories = [...new Set(myGame.map((g) => g.category))].filter(
    Boolean
  );

  /**
   * Get the top 3 most recently added games for the activity feed
   */
  const getRecentActivity = () => {
    const recentGames = [...myGame]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 3);

    return recentGames.map((game) => ({
      title: game.title,
      time: formatDate(game.createdAt),
      rating: game.ratings.toFixed(1),
    }));
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">
            Loading your game collection...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Fetching your gaming universe
          </p>
        </div>
      </div>
    );
  }

  // --- Not Logged In State ---
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4">
        <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 max-w-md text-center border border-purple-600/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-700 to-pink-700 flex items-center justify-center">
            <FaGamepad className="text-3xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Access Your Gaming World
          </h2>
          <p className="text-gray-300 mb-6">
            Login to view and manage your game collection
          </p>
          <Link
            to="/auth/login"
            className="btn btn-lg w-full bg-gradient-to-r from-purple-700 to-pink-700 border-none text-white hover:from-purple-800 hover:to-pink-800"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  // --- Main Content ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/10 to-pink-700/10 opacity-50"></div>
        <div className="container mx-auto px-4 py-10 relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl shadow-lg">
                  <FaGamepad className="text-2xl text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  My Game Library
                </h1>
              </div>
              <p className="text-gray-300">
                Welcome back,{" "}
                <span className="text-purple-300 font-semibold">
                  {user?.displayName || "Gamer"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center p-4 bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700/70 shadow-xl">
                <div className="text-2xl font-bold text-white">
                  {totalGames}
                </div>
                <div className="text-gray-400 text-sm">Total Games</div>
              </div>
              <Link
                to="/new/add-new"
                className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-none text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <FaPlus className="mr-2" />
                Add Game
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-purple-600/50 shadow-2xl shadow-purple-900/20 hover:border-purple-500/70 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-700/40 rounded-lg">
                <FaChartBar className="text-xl text-purple-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {totalGames}
                </div>
                <div className="text-gray-400 text-sm">Total Games</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-yellow-600/50 shadow-2xl shadow-yellow-900/20 hover:border-yellow-500/70 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-700/40 rounded-lg">
                <FaStar className="text-xl text-yellow-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{avgRating}</div>
                <div className="text-gray-400 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-green-600/50 shadow-2xl shadow-green-900/20 hover:border-green-500/70 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-700/40 rounded-lg">
                <FaCrown className="text-xl text-green-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {topRatedGames}
                </div>
                <div className="text-gray-400 text-sm">
                  Top Rated (4+ Stars)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-cyan-600/50 shadow-2xl shadow-cyan-900/20 hover:border-cyan-500/70 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-700/40 rounded-lg">
                <FaLayerGroup className="text-xl text-cyan-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {categories.length}
                </div>
                <div className="text-gray-400 text-sm">Unique Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Section (User, Activity, Actions) */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card - Enhanced Styling */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-700/70 shadow-lg hover:border-purple-500/70 transition-all">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaUser className="text-pink-400" />
              Your Profile
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-700 to-purple-700 flex items-center justify-center border-2 border-pink-500">
                    <span className="text-white font-bold text-lg">
                      {user?.displayName?.charAt(0) ||
                        user?.email?.charAt(0) ||
                        "U"}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-700/70">
                <p className="text-gray-400 text-sm">
                  Member since: {formatDate(user?.metadata?.creationTime)}
                </p>
              </div>
              <Link
                to="/user-info/update-profile"
                className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-lg font-medium text-blue-300 bg-blue-700/20 hover:bg-blue-700/40 transition-colors text-sm"
              >
                <FaEdit className="mr-2" />
                Edit Profile Details
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-700/70 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaCalendar className="text-green-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {getRecentActivity().map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg transition-colors border-b border-gray-800 last:border-b-0"
                >
                  <div>
                    <p className="text-white text-sm font-medium">
                      {activity.title}
                    </p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-white text-sm font-semibold">
                      {activity.rating}
                    </span>
                  </div>
                </div>
              ))}
              {getRecentActivity().length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-700/70 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/new/add-new"
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg font-medium text-white shadow-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <FaPlus className="mr-2" />
                Add New Game
              </Link>
              {/* These are placeholder buttons for future functionality */}
              <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 transition-colors">
                <FaEye className="mr-2" />
                View All Games
              </button>
              <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 transition-colors">
                <FaDownload className="mr-2" />
                Export Collection
              </button>
            </div>
          </div>
        </div>

        {/* Game Collection Header & Sort */}
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between border-b border-gray-700/70 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Game Collection</h2>
            <p className="text-gray-400">Manage your gaming library</p>
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-sm bg-gray-800/90 backdrop-blur-sm border-gray-700 text-white focus:ring-purple-500 focus:border-purple-500 rounded-lg"
            >
              <option value="recent">Sort by: Recent</option>
              <option value="rating">Sort by: Rating</option>
              <option value="name">Sort by: Name</option>
            </select>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length === 0 ? (
          // Empty state view
          <div className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/70 shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-700/20 to-pink-700/20 flex items-center justify-center">
              <FaGamepad className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">No Games Yet</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Start building your game collection by adding your favorite titles
            </p>
            <Link
              to="/new/add-new"
              className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-none text-white shadow-lg"
            >
              <FaPlus className="mr-2" />
              Add First Game
            </Link>
          </div>
        ) : (
          // Games list
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredGames.map((game) => (
              <div
                key={game._id}
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/70 hover:border-purple-600/70 transition-all shadow-xl"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Game Image (coverPhoto) */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-purple-600/50 shadow-md">
                        <img
                          src={game.coverPhoto}
                          alt={game.title}
                          className="w-full h-full object-cover"
                          // Fallback image if coverPhoto fails to load
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/200x200/374151/ffffff?text=Game";
                          }}
                        />
                      </div>
                    </div>

                    {/* Game Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">
                            {game.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {game.developer}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-900/70 px-2 py-1 rounded-full border border-yellow-500/50">
                          <FaStar className="text-yellow-400 text-xs" />
                          <span className="font-bold text-white text-sm">
                            {game.ratings.toFixed(1)}
                          </span>
                          <span className="text-gray-400 text-xs">/5</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-purple-700/50 text-purple-300 rounded-full text-xs font-medium">
                          {game.category}
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                        {game.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(game._id)}
                          className="btn btn-sm bg-blue-700 hover:bg-blue-800 border-none text-white flex items-center gap-1 transition-all"
                        >
                          <FaEdit className="text-xs" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(game._id)}
                          className="btn btn-sm bg-red-700 hover:bg-red-800 border-none text-white flex items-center gap-1 transition-all"
                        >
                          <FaTrash className="text-xs" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with date */}
                <div className="px-5 py-3 bg-gray-900/70 border-t border-gray-700/70">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-gray-500" />
                      <span>Added: {formatDate(game.createdAt)}</span>
                      {formatTime(game.createdAt) && (
                        <span className="text-gray-500">
                          • {formatTime(game.createdAt)}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500">
                      ID: {game._id?.substring(18, 24) || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-4">
              Your Game Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1.5 bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-700/70 text-gray-300 hover:bg-purple-700/50 hover:border-purple-600/70 hover:text-purple-300 transition-all text-sm font-medium"
                >
                  <FaLayerGroup className="inline mr-1 text-purple-400" />{" "}
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-12 pt-6 border-t border-gray-700/70">
          <div className="text-center text-gray-400 text-sm">
            <p>
              Collection generated on: {formatDate(new Date().toISOString())}
            </p>
            <p className="mt-1">
              Showing {filteredGames.length} of {totalGames} games
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGame;
