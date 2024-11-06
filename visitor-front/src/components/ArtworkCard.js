// src/components/ArtworkCard.js
import React, { useState } from 'react';

const ArtworkCard = ({ artwork, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false); // Track if image is loaded

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex justify-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition duration-200 ease-in-out"
    >
      <div>
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
        )}

        {/* Artwork Image */}
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className={`w-full h-48 rounded-md  transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)} // Set loaded to true on load
          loading="lazy"
        />
        
        <p className="mt-4 text-center font-semibold text-gray-800 line-clamp-2">
          {artwork.title}
        </p>
      </div>
    </div>
  );
};

export default ArtworkCard;
