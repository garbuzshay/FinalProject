import React from 'react';
import ExhibitCard from '../exhibitions/ExhibitCard'; // Adjust the path as needed
import {useMuseumContext} from '../../contexts/MuseumContext'; // Adjust the path as needed

const CuratorExhibitionsList = () => {
  // const { exhibitions, loading } = useExhibitions();
  const { exhibitions, loading } = useMuseumContext(); // Adjust the hook as needed
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Manage your exhibitions</h1>
      <p className="text-md mb-6">To view or edit an exhibition, simply click on the tab and start exploring.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mr-6 gap-4">
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
