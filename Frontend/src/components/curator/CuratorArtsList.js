// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useExhibitions } from '../../contexts/ExhibitionsContext'; // Adjust the path as needed
// import CuratorCreateArtwork from './CuratorCreateArtwork';
// import ArtworkCard from './ArtworkCard'; // Adjust the path as needed

// const CuratorArtsList = () => {
//   const { id } = useParams();
//   const { exhibitions, isLoading } = useExhibitions();
//   const [error, setError] = useState('');

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

//   if (!exhibition) {
//     return <div>Exhibition not found</div>;
//   }

//   const remainingArtworks = exhibition.maxArtworks - exhibition.artworks.length;

//   const handleCreateArtwork = () => {
//     if (remainingArtworks <= 0) {
//       setError('No more artworks can be added to this exhibition.');
//       return;
//     }
//     setError('');
//     // Your code to handle artwork creation
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">{exhibition.name} Artworks</h1>
//       <p className="text-xl mb-4">Remaining Artworks: {remainingArtworks}</p>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <div className="flex flex-wrap -m-4">
//         {exhibition.artworks.map((artwork) => (
//           <ArtworkCard
//             key={artwork._id}
//             id={artwork._id}
//             title={artwork.title}
//             description={artwork.description}
//             createdDateByArtist={artwork.createdDateByArtist}
//             artist={artwork.artist}
//             imageUrl={artwork.imageUrl || 'https://via.placeholder.com/150'}
//           />
//         ))}
//       </div>
//       <div className="mt-6">
//         <CuratorCreateArtwork exhibitionId={id} onCreate={handleCreateArtwork} />
//       </div>
//     </div>
//   );
// };

// export default CuratorArtsList;

import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useExhibitions } from '../../contexts/ExhibitionsContext'; // Adjust the path as needed
import {useMuseumContext} from '../../contexts/MuseumContext';

import CuratorCreateArtwork from './CuratorCreateArtwork';
import ArtworkCard from './ArtworkCard'; // Adjust the path as needed

const CuratorArtsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { exhibitions, isLoading } = useMuseumContext();
  const [error, setError] = useState('');
  const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
  const formRef = useRef(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

  if (!exhibition) {
    return <div>Exhibition not found</div>;
  }

  const remainingArtworks = exhibition.maxArtworks - exhibition.artworks.length;

  const handleCreateArtwork = () => {
    if (remainingArtworks <= 0) {
      setError('No more artworks can be added to this exhibition.');
      return;
    }
    setError('');
    setIsCreatingArtwork(true);
    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Delay to ensure the form is rendered
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{exhibition.name} Artworks</h1>
      <p className="text-xl mb-4">Remaining Artworks: {remainingArtworks}</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
      {remainingArtworks > 0 && <div className="mt-6">
        {!isCreatingArtwork && (
          <button
            onClick={handleCreateArtwork}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Click here to add a new artwork
          </button>
        )}
        {isCreatingArtwork && (
          <div ref={formRef} className="mt-4">
            <CuratorCreateArtwork exhibitionId={id} onCreate={() => setIsCreatingArtwork(false)} />
            <button
              onClick={() => setIsCreatingArtwork(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Close
            </button>
          </div>
        )}
      </div>}
      <div className="mt-6">
        <button
          onClick={handleGoBack}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CuratorArtsList;
