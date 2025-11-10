import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaStar, FaDownload, FaArrowLeft } from "react-icons/fa";

const GameDetails = () => {
  const games = useLoaderData(); // array of all games
  const navigate = useNavigate();

  // get the id from URL
  const gameId = window.location.pathname.split("/game/")[1];
  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="text-center text-white py-12">
        <h2 className="text-3xl mb-4">Game Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-600 px-6 py-2 rounded-lg text-white"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-6"
        >
          <FaArrowLeft />
          <span>Back to Games</span>
        </button>

        <div className="bg-gray-800 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <img
            src={game.coverPhoto}
            alt={game.title}
            className="w-full h-96 object-cover rounded-lg"
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-purple-600 px-3 py-1 rounded-full">
                {game.category}
              </span>
              <div className="flex items-center space-x-1">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{game.ratings}/5</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6">{game.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Developer:</span>
                <span className="font-semibold">{game.developer}</span>
              </div>
            </div>

            <a
              href={game.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg w-full flex items-center justify-center space-x-2"
            >
              <FaDownload />
              <span>Download Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
