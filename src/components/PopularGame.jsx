import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaStar, FaDownload } from "react-icons/fa";

const PopularGame = () => {
  const data = useLoaderData() || [];
  const popularGames = data.sort((a, b) => b.ratings - a.ratings).slice(0, 3);
  const navigate = useNavigate();

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  if (popularGames.length === 0) return null;

  return (
    <section className="py-4 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Popular Games
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 px-3 py-1 rounded-full flex items-center space-x-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-white font-semibold">
                    {game.ratings}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {game.title}
                  </h3>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    {game.category}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {game.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <FaDownload className="text-xs" />
                    <span>by {game.developer}</span>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularGame;
