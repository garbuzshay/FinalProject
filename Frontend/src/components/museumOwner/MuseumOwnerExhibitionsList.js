// Frontend/src/components/museumOwner/MuseumOwnerExhibitionsList.js

import React from 'react';
import ExhibitCard from '../exhibitions/ExhibitCard'; // Adjust the path as needed

import { useMuseumContext } from '../../contexts/MuseumContext';
const MuseumOwnerExhibitionsList = () => {
  
  const { museum, loading } = useMuseumContext();
  const exhibitions = museum?.exhibitions;
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Exhibitions</h1>
      <div className="flex flex-wrap -m-4">
        {exhibitions?.map((exhibition) => (
          <ExhibitCard
            key={exhibition._id}
            id={exhibition._id}
            name={exhibition.name}
            description={exhibition.description}
            imageUrl={exhibition.imageUrl || 'https://via.placeholder.com/150'} // Placeholder image URL; replace with actual image URL if available
            artworks={exhibition.artworks?.length} // Assuming artworks is an array of objects with a title field
            curators={exhibition.curators.map((curator) => curator.name).join(', ')} // Corrected the typo from curatros to curators
          />
        ))}
      </div>
    </div>
  );
};

export default MuseumOwnerExhibitionsList;
