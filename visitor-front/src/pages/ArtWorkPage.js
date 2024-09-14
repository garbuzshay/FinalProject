import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMuseum } from "../contexts/MuseumContext";
import GoBackButton from "../components/GoBackButton";

const ArtWorkPage = () => {
  const { exhibitionId, artworkId } = useParams();
  const { exhibitions } = useMuseum();
  const navigate = useNavigate();
  const [artworkIndex, setArtworkIndex] = useState(null);
  const [artwork, setArtwork] = useState(null);

  // Find the exhibition and artwork
  useEffect(() => {
    const exhibition = exhibitions.find((exhibition) => exhibition._id === exhibitionId);
    if (exhibition) {
      const index = exhibition.artworks.findIndex((artwork) => artwork._id === artworkId);
      setArtworkIndex(index);
      setArtwork(exhibition.artworks[index]);
    }
  }, [exhibitionId, artworkId, exhibitions]);

  const handleNextArtwork = () => {
    const exhibition = exhibitions.find((exhibition) => exhibition._id === exhibitionId);
    if (exhibition && artworkIndex < exhibition.artworks.length - 1) {
      const nextArtwork = exhibition.artworks[artworkIndex + 1];
      navigate(`/exhibitions/${exhibitionId}/artworks/${nextArtwork._id}`);
    }
  };

  const handlePrevArtwork = () => {
    const exhibition = exhibitions.find((exhibition) => exhibition._id === exhibitionId);
    if (exhibition && artworkIndex > 0) {
      const prevArtwork = exhibition.artworks[artworkIndex - 1];
      navigate(`/exhibitions/${exhibitionId}/artworks/${prevArtwork._id}`);
    }
  };

  if (!artwork) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
      <img src={artwork.imageUrl} alt={artwork.title} className="mb-4 w-full max-w-lg rounded-lg shadow-lg" />
      <p className="mb-2"><strong>Artist:</strong> {artwork.artist}</p>
      <p className="mb-2"><strong>Description:</strong> {artwork.description}</p>
      <p className="mb-2"><strong>Created Date:</strong> {new Date(artwork.createdDateByArtist).toLocaleDateString()}</p>

      <div className="mt-4">
        <button
          onClick={handlePrevArtwork}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          disabled={artworkIndex === 0}
        >
          Previous Artwork
        </button>
        <button
          onClick={handleNextArtwork}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={artworkIndex === exhibitions.find((exh) => exh._id === exhibitionId).artworks.length - 1}
        >
          Next Artwork
        </button>
      </div>

      {/* Go Back button */}
      <div className="mt-8">
        <GoBackButton customPath={`/exhibitions/${exhibitionId}`} text="← Back to Exhibition" />
      </div>
    </div>
  );
};

export default ArtWorkPage;
