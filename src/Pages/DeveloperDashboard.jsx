import React from "react";
import { useLoaderData } from "react-router-dom";
import { FaStar, FaCode } from "react-icons/fa";

const DeveloperDashboard = () => {
  const devData = useLoaderData();
  const games = Array.isArray(devData) ? devData : [];
  const developerName = games[0]?.developer || "Unknown Developer";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            {developerName}
          </h1>
          <p className="text-gray-400 text-lg">Game Development Studio</p>
        </div>

        <div className="space-y-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="group bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 
              hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.01]
              backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={game.coverPhoto}
                    alt={game.title}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-600 
                    group-hover:border-purple-400 transition-colors duration-300"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-purple-400 flex items-center gap-2 text-sm mt-1">
                      <FaCode className="text-xs" />
                      {game.developer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                    <FaStar className="text-sm" />
                    <span className="text-white font-medium text-sm">
                      {game.ratings}
                    </span>
                  </div>
                  <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {game.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
