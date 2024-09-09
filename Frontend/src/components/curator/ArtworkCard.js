// Frontend/src/components/curator/ArtworkCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ArtworkCard = ({
  id,
  title,
  description,
  createdDateByArtist,
  artist,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`${id}`);
  };

  return (
    <div
      className="max-w-sm w-full rounded overflow-hidden shadow-lg m-4 cursor-pointer transform transition duration-500 hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          className="w-full h-full object-center"
          src={imageUrl}
          alt={`${title}`}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-2">{description}</p>
        <p className="text-gray-700 text-base mb-2">
          <strong>Created Date:</strong>{" "}
          {new Date(createdDateByArtist).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Artist:</strong> {artist}
        </p>
      </div>
    </div>
  );
};

export default ArtworkCard;
