import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaStar, FaDownload, FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Fixed import

const PopularGame = () => {
  const data = useLoaderData() || [];
  const navigate = useNavigate();

  const popularGames = Array.isArray(data)
    ? [...data].sort((a, b) => (b.ratings || 0) - (a.ratings || 0)).slice(0, 3)
    : [];

  if (popularGames.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Popular Games</h2>
          <p className="text-gray-400">No games available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <FaGamepad className="text-2xl text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Popular Games
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Check out our top-rated games loved by players worldwide
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularGames.map((game, index) => (
            <div
              key={game.id || game._id}
              className="group bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden 
                       hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02]
                       backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
              </div>

              {/* Game Cover */}
              <div className="relative overflow-hidden">
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-full font-bold flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span>{game.ratings}</span>
                </div>
              </div>

              {/* Game Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-purple-400 text-sm mt-1 flex items-center gap-2">
                      <FaDownload className="text-xs" />
                      {game.developer}
                    </p>
                  </div>
                  <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {game.category}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                  {game.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-yellow-400 flex items-center gap-1">
                      <FaStar className="text-xs" /> {game.ratings}
                    </span>
                  </div>

                  <Link
                    to={`/game/${game.id || game._id}`}
                    onClick={(e) => e.stopPropagation()} // Prevent card click
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 
                             hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 
                             hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white 
                     px-6 py-3 rounded-xl border border-gray-700 font-medium transition-all 
                     duration-300 hover:scale-105"
          >
            View All Games
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularGame;
