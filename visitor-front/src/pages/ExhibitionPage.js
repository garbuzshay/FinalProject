import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMuseum } from "../contexts/MuseumContext";
import CardArtwork from "../components/CardArtwork";
import GoBackButton from "../components/GoBackButton";
import LogoutButton from "../components/LogoutButton";

const ExhibitionPage = () => {
  const { exhibitionId } = useParams();
  const { exhibitions, museum } = useMuseum();
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [filteredArtworks, setFilteredArtworks] = useState([]); // New state for filtered artworks
  const artworksSectionRef = useRef(null); // Ref for artworks section

  const exhibition = exhibitions.find(
    (exhibition) => exhibition._id === exhibitionId
  );

  if (!exhibition) return <p>Loading...</p>;

  // Filter artworks based on search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = exhibition.artworks.filter((artwork) =>
      artwork.title.toLowerCase().includes(query)
    );

    setFilteredArtworks(filtered);

    // Scroll to artworks section
    if (artworksSectionRef.current) {
      artworksSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If no search has been performed, show all artworks
  const artworksToDisplay = searchQuery ? filteredArtworks : exhibition.artworks;

  const handleArtworkClick = (artworkId) => {
    setSelectedArtworkId((prevId) => (prevId === artworkId ? null : artworkId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="flex justify-between items-center p-4 bg-white shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">{museum.name}</h1>
          <p className="text-lg text-gray-600">
            {museum.address}, {museum.state}
          </p>
        </div>
        <LogoutButton /> {/* Logout button */}
      </div>

      <div
        className="relative overflow-hidden bg-cover bg-center h-64 sm:h-80 md:h-96 w-full rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
            {exhibition.name}
          </h1>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-800">
          Artworks
        </h2>

        {/* Modern and Responsive Search bar for artworks */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search Artworks"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-4 pr-12 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
              🔍
            </button>
          </div>
        </div>

        {/* Display artworks */}
        <div ref={artworksSectionRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworksToDisplay.length > 0 ? (
            artworksToDisplay.map((artwork) => (
              <CardArtwork
                key={artwork._id}
                imageUrl={artwork.imageUrl}
                title={artwork.title}
                artist={artwork.artist}
                description={artwork.description}
                createdDate={artwork.createdDateByArtist}
                isOpen={selectedArtworkId === artwork._id}
                onClick={() => handleArtworkClick(artwork._id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No artworks found matching your search.
            </p>
          )}
        </div>

        {/* Center the GoBackButton */}
        <div className="text-center mt-6">
          <GoBackButton />
        </div>
      </div>
    </div>
  );
};

export default ExhibitionPage;
