import React from 'react';
import ExhibitCard from '../exhibitions/ExhibitCard'; // Adjust the path as needed
// import {useExhibitions} from '../../contexts/ExhibitionsContext'; // Adjust the path as needed
import {useMuseumContext} from '../../contexts/MuseumContext'; // Adjust the path as needed

const CuratorExhibitionsList = () => {
  // const { exhibitions, loading } = useExhibitions();
  const { exhibitions, loading } = useMuseumContext(); // Adjust the hook as needed
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Exhibitions</h1>
      <div className="flex flex-wrap -m-4">
        {exhibitions.map((exhibition) => (
          <ExhibitCard
            key={exhibition._id}
            id={exhibition._id}
            name={exhibition.name}
            description={exhibition.description}
            location={exhibition.museum.name} // Assuming museum is an object with a name field
            imageUrl={exhibition.imageUrl || 'https://via.placeholder.com/150'}
            artworks={exhibition.artworks.map((artwork) => artwork.title).join(', ')} // Assuming artworks is an array of objects with a title field
            curators={exhibition.curators.map((curator) => curator.name).join(', ')}
            status={exhibition.status}
          />
        ))}
      </div>
    </div>
  );
};

export default CuratorExhibitionsList;
