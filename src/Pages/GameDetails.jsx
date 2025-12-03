import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaStar, FaDownload, FaArrowLeft, FaGamepad } from "react-icons/fa";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const GameDetails = () => {
  const game = useLoaderData();
  const navigate = useNavigate();

  // Debug
  console.log("Game data received:", game);

  useDocumentTitle(
    game && game.title
      ? `${game.title} - ${game.developer} | GameHub`
      : "Game Not Found | GameHub"
  );

  if (!game || !game.title) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-4">
        <div className="text-center bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaGamepad className="text-4xl text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Game Not Found</h2>
          <p className="text-gray-400 mb-6 max-w-md">
            The game you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 group"
        >
          <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition">
            <FaArrowLeft />
          </div>
          <span className="font-medium">Back to Games</span>
        </button>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <img
              src={game.coverPhoto}
              alt={game.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl"
            />

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {game.title}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-purple-600 px-4 py-2 rounded-full font-medium">
                    {game.category}
                  </span>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <FaStar />
                    <span className="font-bold text-white">
                      {game.ratings}/5
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-5">
                <p className="text-gray-300 leading-relaxed">
                  {game.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <div className="text-gray-400 text-sm">Developer</div>
                  <div className="text-white font-semibold">
                    {game.developer}
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <div className="text-gray-400 text-sm">Category</div>
                  <div className="text-white font-semibold">
                    {game.category}
                  </div>
                </div>
              </div>

              <a
                href={game.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-center transition hover:scale-105 flex items-center justify-center gap-3"
              >
                <FaDownload />
                <span>Download Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
