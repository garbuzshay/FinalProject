// import React, { useEffect, useState } from 'react';
// import { useParams, Outlet, useNavigate } from 'react-router-dom';
// import { useMuseum } from '../contexts/MuseumContext';
// import LogoutButton from '../components/LogoutButton';
// import Header from '../components/Header';
// import MuseumFeedbackForm from '../components/MuseumFeedbackForm';

// const StarIcon = ({ className = "w-6 h-6" }) => (
//   <svg
//     className={`cursor-pointer ${className}`}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//   >
//     <path d="M12 17.27l5.18 3.04-1.64-6.82L21 9.24l-7.19-.61L12 2.5 10.19 8.63 3 9.24l5.46 4.25-1.63 6.82L12 17.27z" />
//   </svg>
// );

// const MuseumPage = () => {
//   const { museumName } = useParams();
//   const navigate = useNavigate();
//   const { museumData, exhibitions } = useMuseum();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredExhibitions, setFilteredExhibitions] = useState([]);
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);

//   useEffect(() => {
//     if (museumData && exhibitions) {
//       const openExhibitionsWithArtworks = exhibitions.filter(
//         (exhibition) =>
//           exhibition.status === 'open' &&
//           exhibition.artworks &&
//           exhibition.artworks.length > 0
//       );
//       setFilteredExhibitions(openExhibitionsWithArtworks);
//     }
//   }, [museumData, exhibitions]);

//   if (!museumData) return <p>Loading...</p>;

//   const handleExhibitionClick = (exhibitionId) => {
//     navigate(`/${museumName}/exhibitions/${exhibitionId}`);
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     setFilteredExhibitions(
//       exhibitions
//         .filter(
//           (exhibition) =>
//             exhibition.status === 'open' &&
//             exhibition.artworks &&
//             exhibition.artworks.length > 0
//         )
//         .filter((exhibition) =>
//           exhibition.name.toLowerCase().includes(query)
//         )
//     );
//   };

//   const handleOpenFeedbackForm = () => {
//     setShowFeedbackForm(true);
//   };

//   const handleCloseFeedbackForm = () => {
//     setShowFeedbackForm(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header museumData={museumData} LogoutButton={LogoutButton} />

//       <div
//         className="relative bg-cover bg-center h-72 flex items-end justify-center"
//         style={{ backgroundImage: `url(${museumData.imageUrl})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative z-10 w-11/12 max-w-xl mb-4">
//           <h2 className="text-white font-cool text-3xl mb-1">
//             Which Exhibit Are You Looking For?
//           </h2>
//           <div className="flex items-center bg-white rounded-full p-2 shadow-lg">
//             <input
//               type="text"
//               placeholder="Search Exhibit"
//               value={searchQuery}
//               onChange={handleSearch}
//               className="flex-grow p-2 rounded-l-full focus:outline-none"
//             />
//             <button className="p-2 bg-blue-500 text-white rounded-full">
//               🔍
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-semibold">Popular Exhibitions</h3>
//           <button
//             onClick={handleOpenFeedbackForm}
//             className="flex items-center text-blue-600 hover:text-blue-700 transition"
//           >
//             <StarIcon className="w-4 h-4 mr-1" />
//             Add Review
//           </button>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredExhibitions.slice(0, 3).map((exhibition) => (
//             <div
//               key={exhibition._id}
//               className="cursor-pointer"
//               onClick={() => handleExhibitionClick(exhibition._id)}
//             >
//               <div
//                 className="relative bg-cover bg-center h-40 rounded-lg shadow-md"
//                 style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
//               >
//                 <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
//               </div>
//               <span className="block text-center mt-2 text-lg font-semibold text-gray-800">
//                 {exhibition.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Outlet />

//       {/* Feedback Form Modal */}
//       {showFeedbackForm && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           onClick={handleCloseFeedbackForm} // Close modal on background click
//         >
//           <div
//             className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4"
//             onClick={(e) => e.stopPropagation()} // Prevent background click from closing the modal
//           >
//             {/* Left-Aligned Close Button */}
//             <button
//               onClick={handleCloseFeedbackForm}
//               className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
//               aria-label="Close feedback form"
//             >
//               <span className="text-2xl font-semibold">&times;</span>
//             </button>

//             <MuseumFeedbackForm onSubmit={handleCloseFeedbackForm} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MuseumPage;


import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { useMuseum } from '../contexts/MuseumContext';
import LogoutButton from '../components/LogoutButton';
import Header from '../components/Header';
import MuseumFeedbackForm from '../components/MuseumFeedbackForm';

const StarIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={`cursor-pointer ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27l5.18 3.04-1.64-6.82L21 9.24l-7.19-.61L12 2.5 10.19 8.63 3 9.24l5.46 4.25-1.63 6.82L12 17.27z" />
  </svg>
);

const MuseumPage = () => {
  const { museumName } = useParams();
  const navigate = useNavigate();
  const { museumData, exhibitions } = useMuseum();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(
    localStorage.getItem(`submittedFeedback-${museumName}`) === 'true'
  );

  useEffect(() => {
    if (museumData && exhibitions) {
      const openExhibitionsWithArtworks = exhibitions.filter(
        (exhibition) =>
          exhibition.status === 'open' &&
          exhibition.artworks &&
          exhibition.artworks.length > 0
      );
      setFilteredExhibitions(openExhibitionsWithArtworks);
    }
  }, [museumData, exhibitions]);

  if (!museumData) return <p>Loading...</p>;

  const handleExhibitionClick = (exhibitionId) => {
    navigate(`/${museumName}/exhibitions/${exhibitionId}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredExhibitions(
      exhibitions
        .filter(
          (exhibition) =>
            exhibition.status === 'open' &&
            exhibition.artworks &&
            exhibition.artworks.length > 0
        )
        .filter((exhibition) =>
          exhibition.name.toLowerCase().includes(query)
        )
    );
  };

  const handleOpenFeedbackForm = () => {
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmitted = () => {
    setHasSubmittedFeedback(true);
    localStorage.setItem(`submittedFeedback-${museumName}`, 'true'); // Use localStorage here
    setShowFeedbackForm(false);
  };

  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header museumData={museumData} LogoutButton={LogoutButton} />

      <div
        className="relative bg-cover bg-center h-72 flex items-end justify-center"
        style={{ backgroundImage: `url(${museumData.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-11/12 max-w-xl mb-4">
          <h2 className="text-white font-cool text-3xl mb-1">
            Which Exhibit Are You Looking For?
          </h2>
          <div className="flex items-center bg-white rounded-full p-2 shadow-lg">
            <input
              type="text"
              placeholder="Search Exhibit"
              value={searchQuery}
              onChange={handleSearch}
              className="flex-grow p-2 rounded-l-full focus:outline-none"
            />
            <button className="p-2 bg-blue-500 text-white rounded-full">
              🔍
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Popular Exhibitions</h3>
          
          {!hasSubmittedFeedback && (
            <button
              onClick={handleOpenFeedbackForm}
              className="flex items-center text-blue-600 hover:text-blue-700 transition"
            >
              <StarIcon className="w-4 h-4 mr-1" />
              Add Review
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredExhibitions.slice(0, 3).map((exhibition) => (
            <div
              key={exhibition._id}
              className="cursor-pointer"
              onClick={() => handleExhibitionClick(exhibition._id)}
            >
              <div
                className="relative bg-cover bg-center h-40 rounded-lg shadow-md"
                style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              </div>
              <span className="block text-center mt-2 text-lg font-semibold text-gray-800">
                {exhibition.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Outlet />

      {showFeedbackForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseFeedbackForm}
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseFeedbackForm}
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
              aria-label="Close feedback form"
            >
              <span className="text-2xl font-semibold">&times;</span>
            </button>

            <MuseumFeedbackForm onSubmit={handleFeedbackSubmitted} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MuseumPage;
