// Frontend\src\components\museumOwner\MuseumOwnerWatchArtworks.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMuseumContext} from '../../contexts/MuseumContext';
import ArtworkCard from '../curator/ArtworkCard';

const MuseumOwnerWatchArtworks = () => {
  const { id } = useParams();
  const { exhibitions, isLoading, error } = useMuseumContext();

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
            imageUrl={artwork.imageUrl || 'https://via.placeholder.com/150'}
          />
        ))}
      </div>
    </div>
  );
};

export default MuseumOwnerWatchArtworks;
