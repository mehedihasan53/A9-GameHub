import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaStar, FaDownload } from "react-icons/fa";

const AllApps = () => {
  const allGames = useLoaderData([]);
  const navigate = useNavigate();

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Games
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover our complete collection of amazing games
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              className="bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 px-3 py-1 rounded-full flex items-center space-x-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-white font-semibold text-sm">
                    {game.ratings}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-2 line-clamp-1">
                  {game.title}
                </h3>

                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {game.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1 text-gray-400 text-xs">
                    <FaDownload className="text-xs" />
                    <span>by {game.developer}</span>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApps;
