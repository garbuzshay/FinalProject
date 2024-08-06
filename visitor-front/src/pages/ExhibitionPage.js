// // src/pages/ExhibitionPage.js
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useMuseum } from '../contexts/MuseumContext';

// const ExhibitionPage = () => {
//   const { exhibitionId } = useParams();
//   const { exhibitions } = useMuseum();

//   const exhibition = exhibitions.find((exhibition) => exhibition._id === exhibitionId);

//   if (!exhibition) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8">
//       <h1 className="text-5xl font-extrabold mb-6 text-gray-900">{exhibition.name}</h1>
//       <h2 className="text-3xl font-bold mb-4 text-gray-800">Artworks</h2>
//       <ul className="space-y-6">
//         {exhibition.artworks.map((artwork) => (
//           <li key={artwork._id} className="bg-white p-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl">
//             <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-auto mb-4 rounded-lg shadow-sm" />
//             <h3 className="text-2xl font-semibold mb-2">{artwork.title}</h3>
//             <p className="mb-2"><strong>Artist:</strong> {artwork.artist}</p>
//             <p className="mb-2"><strong>Description:</strong> {artwork.description}</p>
//             <p className="mb-2"><strong>Created Date:</strong> {new Date(artwork.createdDateByArtist).toLocaleDateString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ExhibitionPage;

// src/pages/ExhibitionPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { useMuseum } from "../contexts/MuseumContext";
import CardArtwork from "../components/CardArtwork";

const ExhibitionPage = () => {
  const { exhibitionId } = useParams();
  const { exhibitions } = useMuseum();

  const exhibition = exhibitions.find(
    (exhibition) => exhibition._id === exhibitionId
  );

  if (!exhibition) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
        {exhibition.name}
      </h1>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Artworks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exhibition.artworks.map((artwork) => (
          <CardArtwork
            key={artwork._id}
            imageUrl={artwork.imageUrl}
            title={artwork.title}
            artist={artwork.artist}
            description={artwork.description}
            createdDate={artwork.createdDateByArtist}
          />
        ))}
      </div>
    </div>
  );
};

export default ExhibitionPage;
