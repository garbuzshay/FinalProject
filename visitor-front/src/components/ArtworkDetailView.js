// src/components/ArtworkDetailView.js

import React from "react";

const ArtworkDetailView = ({
  artwork,
  onClose,
  onNext,
  onPrevious,
  goBackToMuseum,
}) => {
  return (
    <div
      className="p-6  h-full bg-white rounded-lg shadow-lg 
"
    >
      <button
        onClick={onClose}
        className="text-blue-500 self-start mb-4 font-semibold hover:text-blue-600 transition top-4 left-4 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Artworks
      </button>

      <div className="flex-1 flex flex-col justify-center items-center relative">
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 bg-opacity-80 rounded-full shadow-lg active:bg-gray-700 active:scale-90 active:text-white transition duration-200 ease-in-out z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="relative w-82 h-96 flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="object-cover max-h-full max-w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
          <div className="absolute bottom-4 left-4 text-white z-20">
            <h2 className="text-2xl font-bold">{artwork.title}</h2>
            <p className="text-gray-300 italic">{artwork.artist}</p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 bg-opacity-80 rounded-full shadow-lg active:bg-gray-700 active:scale-90 active:text-white transition duration-200 ease-in-out z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="mt-6 p-4">
        <p className="font-bold text-lg">Description</p>
        <p className="text-gray-700">{artwork.description}</p>
      </div>

      <button
        onClick={goBackToMuseum}
        className="text-blue-500 self-start mb-4 font-semibold hover:text-blue-600 transition top-4 left-4 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Museum
      </button>
    </div>
  );
};

export default ArtworkDetailView;
