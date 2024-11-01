
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useMuseumApi } from '../hooks/useMuseumApi';
// import { useMuseum } from '../contexts/MuseumContext';

// const LandingPage = () => {
//   const { museumName } = useParams(); // Get museum name from URL params
//   const { museum, setMuseum, setExhibitions } = useMuseum(); // Use context to get/set museum data
//   const { fetchMuseumDetails } = useMuseumApi(); // API to fetch museum details
//   const [loading, setLoading] = useState(true); // Loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch museum data if it is not already available or if the museum name has changed
//     if (!museum || museum.name !== museumName) {
//       const fetchData = async () => {
//         try {
//           const data = await fetchMuseumDetails(museumName); // Fetch museum details
//           setMuseum(data.museum); // Set museum in context
//           setExhibitions(data.exhibitions); // Set exhibitions in context
//           setLoading(false); // Stop loading once data is fetched
//         } catch (error) {
//           console.error('Error fetching museum details:', error);
//           setLoading(false); // Stop loading even if an error occurs
//         }
//       };

//       fetchData();
//     } else {
//       setLoading(false); // Data already available, skip loading
//     }
//   }, [museumName, museum, fetchMuseumDetails, setMuseum, setExhibitions]);

//   const handleShowExhibitions = () => {
//     // Navigate to the MuseumPage (exhibitions list)
//     navigate(`/${museumName}/exhibitions`);
//   };

//   if (loading) {
//     return <p>Loading...</p>; // Show loading message while fetching data
//   }

//   return (
//     <div
//       className="relative min-h-screen bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${museum.imageUrl})`, // Use museum's image as the background
//       }}
//     >
//       {/* Dark overlay for text readability */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Main content - Positioned at the bottom-left */}
//       <div className="absolute bottom-12 left-8 text-white z-10">
//         <h1 className="text-4xl font-extrabold mb-4">
//           Welcome to {museum.name}
//         </h1>
//         <p className="text-lg mb-8 leading-relaxed">
//           Enjoy an immersive and engaging experience as you explore the museum!
//         </p>
//         <button
//           onClick={handleShowExhibitions}
//           className="bg-black bg-opacity-70 text-white text-lg px-12 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition"
//           style={{ minWidth: '200px' }} // Set minimum width for the button
//         >
//           Show Exhibitions
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\components\LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMuseum } from '../contexts/MuseumContext';

const LandingPage = () => {
  const { museumData, loading } = useMuseum();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (museumName) {
  //     fetchFullMuseumData(museumName); // Pass museumName to the fetch function
  //   }
  // }, [museumName, fetchFullMuseumData]);

  // Show loading spinner if museum data is not yet available
  if (loading || !museumData) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${museumData.imageUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute bottom-12 left-8 text-white z-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to {museumData.name}
        </h1>
        <p className="text-lg mb-8 leading-relaxed">
          Enjoy an immersive and engaging experience as you explore the museum!
        </p>
        <button
          onClick={() => navigate(`/${museumData.name}/exhibitions`)}
          className="bg-black bg-opacity-70 text-white text-lg px-12 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition"
          style={{ minWidth: '200px' }}
        >
          Show Exhibitions
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
