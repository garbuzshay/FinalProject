// src/components/LandingPage.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMuseum } from '../contexts/MuseumContext';

const LandingPage = () => {
  const { museumName } = useParams();
  const { museum } = useMuseum(); 
  const navigate = useNavigate();

  const handleShowExhibitions = () => {
    // Navigate to the MuseumPage (exhibitions list)
    navigate(`/${museumName}/exhibitions`);
  };

  if (!museum) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${museum.imageUrl})`, // Use museum's image as the background
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main content - Positioned at the bottom-left */}
      <div className="absolute bottom-12 left-8 text-white z-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to {museum.name}
        </h1>
        <p className="text-lg mb-8 leading-relaxed">
          Enjoy an immersive and engaging experience as you explore the museum!
        </p>
        <button
          onClick={handleShowExhibitions}
          className="bg-black bg-opacity-70 text-white text-lg px-12 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition"
          style={{ minWidth: '200px' }} // Set minimum width for the button
        >
          Show Exhibitions
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
