import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaStar, FaDownload, FaArrowLeft } from "react-icons/fa";

const GameDetails = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();

  const games = data.games || data || [];
  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl mb-4">Game Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6"
        >
          <FaArrowLeft /> Back to Games
        </button>

        <div className="bg-gray-800 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <img
            src={game.coverPhoto}
            alt={game.title}
            className="w-full h-96 object-cover rounded-lg"
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{game.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="bg-purple-600 px-3 py-1 rounded-full">
                {game.category}
              </span>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{game.ratings}/5</span>
              </div>
            </div>

            <p className="text-gray-300 mb-6 text-lg">{game.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Developer:</span>
                <span className="font-semibold">{game.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span>{game.category}</span>
              </div>
            </div>

            <a
              href={game.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg w-full flex items-center justify-center gap-2 transition"
            >
              <FaDownload />
              Download Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
