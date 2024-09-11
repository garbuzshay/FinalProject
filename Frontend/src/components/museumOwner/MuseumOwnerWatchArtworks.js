// Frontend\src\components\museumOwner\MuseumOwnerWatchArtworks.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import ArtworkCard from "../curator/ArtworkCard";
import MuseumOwnerCreateArtwork from "./MuseumOwnerCreateArtwork";
import GoBackButton from "../common/GoBackButton";

const MuseumOwnerWatchArtworks = () => {
  const { id } = useParams();
  const { exhibitions, isLoading, error } = useMuseumContext();
  const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

  if (!exhibition) {
    return <div>Exhibition not found</div>;
  }

  // const handleCreateArtwork = () => {
  //   setIsCreatingArtwork(true);
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{exhibition.name} Artworks</h1>

      <div className="flex flex-wrap -m-4">
        {exhibition.artworks.map((artwork) => (
          <ArtworkCard
            key={artwork._id}
            id={artwork._id}
            title={artwork.title}
            description={artwork.description}
            createdDateByArtist={artwork.createdDateByArtist}
            artist={artwork.artist}
            imageUrl={artwork.imageUrl || "https://via.placeholder.com/150"}
          />
        ))}
      </div>
      {/* {!isCreatingArtwork && (
        <button
          onClick={handleCreateArtwork}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
        >
          Add New Artwork
        </button>
      )} */}
      {isCreatingArtwork && (
        <div className="mt-4">
          <MuseumOwnerCreateArtwork exhibitionId={exhibition._id} />
          <button
            onClick={() => setIsCreatingArtwork(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Close
          </button>
        </div>
      )}
      <div className="mt-6">
        <GoBackButton customPath={"/owner/exhibitions"} />
      </div>
    </div>
  );
};

export default MuseumOwnerWatchArtworks;
