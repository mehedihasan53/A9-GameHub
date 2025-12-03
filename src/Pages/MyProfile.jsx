import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaCalendar,
  FaGamepad,
  FaTrophy,
  FaChartLine,
  FaCrown,
  FaShieldAlt,
  FaHistory,
  FaUsers,
  FaHeart,
  FaClock,
  FaMedal,
  FaFire,
  FaCog,
  FaQuestionCircle,
  FaLock,
  FaGlobe,
  FaPalette,
  FaBell,
  FaStar,
} from "react-icons/fa";
import { useAuth } from "../Provider/AuthProvider";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const MyProfile = () => {
  useDocumentTitle("My Profile - GameHub");
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [localTheme, setLocalTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );

  // Stats from localStorage বা default
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem("userStats");
    return savedStats
      ? JSON.parse(savedStats)
      : {
          totalGames: 24,
          hoursPlayed: 156,
          achievements: 8,
          friends: 42,
          rank: "Gold III",
          winRate: "68%",
          level: 27,
          xp: 2450,
          streak: 7,
          topScore: 15600,
          avgSession: "42m",
          favoriteGame: "Neon Racer",
        };
  });

  // Mock game history data
  const [gameHistory] = useState([
    {
      id: 1,
      name: "Cyber Strike",
      score: 12500,
      date: "2024-01-15",
      time: "45m",
    },
    {
      id: 2,
      name: "Shadow Realm",
      score: 9800,
      date: "2024-01-14",
      time: "32m",
    },
    {
      id: 3,
      name: "Neon Racer",
      score: 15600,
      date: "2024-01-13",
      time: "1h 12m",
    },
    {
      id: 4,
      name: "Dragon Quest",
      score: 8900,
      date: "2024-01-12",
      time: "28m",
    },
  ]);

  // Mock achievements
  const [achievements] = useState([
    {
      id: 1,
      name: "First Blood",
      icon: "🏆",
      description: "First game played",
      unlocked: true,
    },
    {
      id: 2,
      name: "Veteran",
      icon: "🛡️",
      description: "50 hours played",
      unlocked: true,
    },
    {
      id: 3,
      name: "Speed Demon",
      icon: "⚡",
      description: "Complete level in 30s",
      unlocked: true,
    },
    {
      id: 4,
      name: "Social Butterfly",
      icon: "🦋",
      description: "Add 10 friends",
      unlocked: true,
    },
    {
      id: 5,
      name: "Unstoppable",
      icon: "🔥",
      description: "10 wins in a row",
      unlocked: false,
    },
    {
      id: 6,
      name: "Collector",
      icon: "💎",
      description: "Unlock all items",
      unlocked: false,
    },
  ]);

  // Theme change handler
  const handleThemeChange = (theme) => {
    setLocalTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  // Notification toggle
  const handleNotificationToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem("notifications", newValue.toString());
  };

  // Language change handler
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Date calculations
  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  const lastActive = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Just now";

  // XP Progress calculation
  const xpProgress = (stats.xp % 1000) / 10;

  // Available themes
  const themes = [
    { id: "dark", name: "Dark", color: "bg-gray-800" },
    { id: "blue", name: "Blue", color: "bg-blue-900" },
    { id: "purple", name: "Purple", color: "bg-purple-900" },
    { id: "green", name: "Green", color: "bg-green-900" },
  ];

  // Available languages
  const languages = [
    { id: "english", name: "English" },
    { id: "spanish", name: "Spanish" },
    { id: "french", name: "French" },
    { id: "german", name: "German" },
  ];

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localTheme);
  }, [localTheme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            My Gaming Profile
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome back, {user?.displayName || "Gamer"}! 🎮
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-gray-700/50 hover:border-pink-500/30 transition-all duration-500">
              <div className="relative mb-6">
                <div className="w-40 h-40 mx-auto rounded-full border-4 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1">
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-900"
                    onError={(e) =>
                      (e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png")
                    }
                  />
                </div>
                <div className="absolute -bottom-2 right-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <FaCrown size={10} />
                  {stats.rank}
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-1 truncate">
                  {user?.displayName || "Anonymous Player"}
                </h2>
                <p className="text-gray-300 text-sm mb-3 flex items-center justify-center gap-2">
                  <FaEnvelope className="text-gray-400" />
                  {user?.email}
                </p>

                {/* Level Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Level {stats.level}</span>
                    <span>{xpProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${xpProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stats.xp} / {(stats.level + 1) * 1000} XP
                  </div>
                </div>
              </div>

              <Link to="/user-info/update-profile">
                <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg">
                  <FaEdit />
                  Edit Profile
                </button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaChartLine className="text-cyan-400" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Games Played",
                    value: stats.totalGames,
                    icon: FaGamepad,
                  },
                  {
                    label: "Hours Played",
                    value: `${stats.hoursPlayed}h`,
                    icon: FaClock,
                  },
                  {
                    label: "Win Rate",
                    value: stats.winRate,
                    icon: FaTrophy,
                    color: "text-green-400",
                  },
                  { label: "Friends", value: stats.friends, icon: FaUsers },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <stat.icon className="text-gray-400" size={14} />
                      <span className="text-gray-400">{stat.label}</span>
                    </div>
                    <span className={`font-bold ${stat.color || "text-white"}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 bg-gray-800/60 backdrop-blur-lg rounded-2xl p-2 border border-gray-700/50">
              {[
                { id: "overview", label: "Overview", icon: FaUser },
                { id: "games", label: "Games", icon: FaGamepad },
                { id: "achievements", label: "Achievements", icon: FaTrophy },
                { id: "friends", label: "Friends", icon: FaUsers },
                { id: "settings", label: "Settings", icon: FaCog },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content based on active tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Account Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FaShieldAlt className="text-green-400" />
                      Account Security
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Email Verified</span>
                        <span
                          className={`flex items-center gap-2 ${
                            user?.emailVerified
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {user?.emailVerified ? <FaCheck /> : <FaTimes />}
                          {user?.emailVerified ? "Verified" : "Not Verified"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">2FA Enabled</span>
                        <span className="text-gray-400">Not Set</span>
                      </div>
                      <button className="w-full py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all flex items-center justify-center gap-2">
                        <FaLock />
                        Enhance Security
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FaCalendar className="text-purple-400" />
                      Account Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Member Since</span>
                        <span className="text-white">{memberSince}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Last Login</span>
                        <span className="text-white">{lastActive}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Account Type</span>
                        <span className="flex items-center gap-1 text-cyan-400">
                          <FaStar />
                          Premium
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaHistory className="text-orange-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {gameHistory.slice(0, 3).map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
                            <FaGamepad className="text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">
                              {game.name}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {game.date} • {game.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">
                            {game.score.toLocaleString()}
                          </div>
                          <div className="text-green-400 text-sm">
                            +{Math.floor(game.score / 100)} XP
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Games Tab */}
            {activeTab === "games" && (
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaGamepad className="text-green-400" />
                  Game History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-gray-400 text-left border-b border-gray-700/50">
                        <th className="pb-3 px-4">Game</th>
                        <th className="pb-3 px-4">Score</th>
                        <th className="pb-3 px-4">Duration</th>
                        <th className="pb-3 px-4">Date</th>
                        <th className="pb-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameHistory.map((game) => (
                        <tr
                          key={game.id}
                          className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                                <FaGamepad className="text-purple-400" />
                              </div>
                              <span className="text-white font-medium">
                                {game.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-white font-bold">
                              {game.score.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-300">{game.time}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-400">{game.date}</div>
                          </td>
                          <td className="py-3 px-4">
                            <button className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-white text-sm rounded-lg transition-all">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaTrophy className="text-yellow-400" />
                  Achievements ({achievements.filter((a) => a.unlocked).length}/
                  {achievements.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 hover:border-yellow-500/50"
                          : "bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50 opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`text-2xl ${
                            achievement.unlocked ? "" : "grayscale"
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-bold">
                            {achievement.name}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            {achievement.description}
                          </p>
                          <div className="mt-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                achievement.unlocked
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-600/50 text-gray-400"
                              }`}
                            >
                              {achievement.unlocked ? "Unlocked ✓" : "Locked"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaCog className="text-gray-400" />
                  Settings
                </h3>
                <div className="space-y-6">
                  {/* Theme Settings */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <FaPalette className="text-pink-400" />
                      Theme
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeChange(theme.id)}
                          className={`p-4 rounded-xl transition-all ${
                            theme.color
                          } ${
                            localTheme === theme.id
                              ? "ring-2 ring-pink-500 transform scale-105"
                              : "opacity-70 hover:opacity-100"
                          }`}
                        >
                          <span className="text-white text-sm font-medium">
                            {theme.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FaBell className="text-purple-400" />
                      <div>
                        <span className="text-white block">Notifications</span>
                        <span className="text-gray-400 text-sm">
                          Receive game updates and alerts
                        </span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications}
                        onChange={handleNotificationToggle}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  {/* Language Settings */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <FaGlobe className="text-cyan-400" />
                      Language
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {languages.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => handleLanguageChange(lang.id)}
                          className={`p-3 rounded-xl transition-all ${
                            language === lang.id
                              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
                              : "bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700"
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Support */}
                  <button className="w-full py-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 text-red-400 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all flex items-center justify-center gap-2">
                    <FaQuestionCircle />
                    Need Help? Contact Support
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-2xl p-4 border border-pink-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <FaFire className="text-pink-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Streak</p>
                <p className="text-white text-xl font-bold">
                  {stats.streak} days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl p-4 border border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <FaMedal className="text-cyan-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Top Score</p>
                <p className="text-white text-xl font-bold">
                  {stats.topScore.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-4 border border-green-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FaClock className="text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Avg. Session</p>
                <p className="text-white text-xl font-bold">
                  {stats.avgSession}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-2xl p-4 border border-yellow-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <FaHeart className="text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Favorite Game</p>
                <p className="text-white text-xl font-bold">
                  {stats.favoriteGame}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
