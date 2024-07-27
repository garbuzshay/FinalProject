// Frontend/src/components/curator/CuratorArtsList.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useExhibitions } from '../../contexts/ExhibitionsContext'; // Adjust the path as needed
import CuratorCreateArtwork from './CuratorCreateArtwork';
import ArtworkCard from './ArtworkCard'; // Adjust the path as needed

const CuratorArtsList = () => {
  const { id } = useParams();
  const { exhibitions, isLoading } = useExhibitions();

  if (isLoading) {
    return <div>Loading...</div>;
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
      <div className="mt-6">
        <CuratorCreateArtwork exhibitionId={id} />
      </div>
    </div>
  );
};

export default CuratorArtsList;
