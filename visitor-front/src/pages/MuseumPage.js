
// import React, { useEffect, useState } from 'react';
// import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
// import { useMuseumApi } from '../hooks/useMuseumApi';
// import { useMuseum } from '../contexts/MuseumContext';

// const MuseumPage = () => {
//   const { museumName } = useParams();
//   const navigate = useNavigate();
//   const { fetchMuseumDetails } = useMuseumApi();
//   const { museum, exhibitions, setMuseum, setExhibitions } = useMuseum();
//   const [selectedExhibitionId, setSelectedExhibitionId] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const data = await fetchMuseumDetails(museumName);
//       setMuseum(data.museum);
//       setExhibitions(data.exhibitions);
//     };
//     fetchDetails();
//   }, [museumName, setMuseum, setExhibitions]);

//   if (!museum) return <p>Loading...</p>;

//   const handleExhibitionClick = (exhibitionId) => {
//     if (selectedExhibitionId === exhibitionId) {
//       setSelectedExhibitionId(null);
//       navigate(`/${museumName}`);
//     } else {
//       setSelectedExhibitionId(exhibitionId);
//       navigate(`/${museumName}/exhibitions/${exhibitionId}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-4xl font-bold mb-4">{museum.name}</h1>
//       <h2 className="text-2xl font-semibold mb-2">Exhibitions</h2>
//       <ul className="space-y-2">
//         {exhibitions.map((exhibition) => (
//           <li
//             key={exhibition._id}
//             className={`bg-white p-4 rounded-lg shadow cursor-pointer ${selectedExhibitionId === exhibition._id ? 'bg-blue-100' : ''}`}
//             onClick={() => handleExhibitionClick(exhibition._id)}
//           >
//             <span>{exhibition.name}</span>
          
//           </li>
//         ))}
//       </ul>
//       <Outlet />
//     </div>
//   );
// };

// export default MuseumPage;

// src/pages/MuseumPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import { useMuseumApi } from '../hooks/useMuseumApi';
import { useMuseum } from '../contexts/MuseumContext';
import LogoutButton from '../components/LogoutButton'; // Import the LogoutButton component

const MuseumPage = () => {
  const { museumName } = useParams();
  const navigate = useNavigate();
  const { fetchMuseumDetails } = useMuseumApi();
  const { museum, exhibitions, setMuseum, setExhibitions } = useMuseum();
  const [selectedExhibitionId, setSelectedExhibitionId] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchMuseumDetails(museumName);
      setMuseum(data.museum);
      setExhibitions(data.exhibitions);
    };
    fetchDetails();
  }, [museumName, setMuseum, setExhibitions]);

  if (!museum) return <p>Loading...</p>;

  const handleExhibitionClick = (exhibitionId) => {
    if (selectedExhibitionId === exhibitionId) {
      setSelectedExhibitionId(null);
      navigate(`/${museumName}`);
    } else {
      setSelectedExhibitionId(exhibitionId);
      navigate(`/${museumName}/exhibitions/${exhibitionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">{museum.name}</h1>
        <LogoutButton /> {/* Add the LogoutButton here */}
      </div>
      <h2 className="text-2xl font-semibold mb-2">Exhibitions</h2>
      <ul className="space-y-2">
        {exhibitions.map((exhibition) => (
          <li
            key={exhibition._id}
            className={`bg-white p-4 rounded-lg shadow cursor-pointer w-full ${selectedExhibitionId === exhibition._id ? 'bg-blue-100' : ''}`}
            onClick={() => handleExhibitionClick(exhibition._id)}
          >
            <span className="block w-full">{exhibition.name}</span>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default MuseumPage;
