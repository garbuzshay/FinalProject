// import React, { useEffect, useState } from 'react';
// import { useParams, Outlet, useNavigate } from 'react-router-dom';
// import { useMuseumApi } from '../hooks/useMuseumApi';
// import { useMuseum } from '../contexts/MuseumContext';
// import LogoutButton from '../components/LogoutButton';

// import React, { useEffect, useState } from 'react';
// import { useParams, Outlet, useNavigate } from 'react-router-dom';
// import { useMuseumApi } from '../hooks/useMuseumApi';
// import { useMuseum } from '../contexts/MuseumContext';
// import LogoutButton from '../components/LogoutButton';

// const MuseumPage = () => {
//   const { museumName } = useParams();
//   const navigate = useNavigate();
//   const { fetchMuseumDetails } = useMuseumApi();
//   const { museum, exhibitions, setMuseum, setExhibitions } = useMuseum();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredExhibitions, setFilteredExhibitions] = useState([]);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const data = await fetchMuseumDetails(museumName);
//       setMuseum(data.museum);
  
//       // Filter exhibitions to include only open exhibitions with at least one artwork
//       const openExhibitionsWithArtworks = data.exhibitions.filter(
//         (exhibition) =>
//           exhibition.status === 'open' &&
//           exhibition.artworks &&
//           exhibition.artworks.length > 0
//       );

//       setExhibitions(openExhibitionsWithArtworks);
//       setFilteredExhibitions(openExhibitionsWithArtworks); // Initial set
//     };
//     fetchDetails();
//   }, [museumName,fetchMuseumDetails, setMuseum, setExhibitions]);
  

//   if (!museum) return <p>Loading...</p>;

//   const handleExhibitionClick = (exhibitionId) => {
//     navigate(`/${museumName}/exhibitions/${exhibitionId}`);
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     setFilteredExhibitions(
//       exhibitions.filter(exhibition =>
//         exhibition.name.toLowerCase().includes(query)
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header with Museum name and address */}
//       <div className="flex justify-between items-center p-4 bg-white shadow-lg">
//         <div>
//           <h1 className="text-3xl font-bold">{museum.name}</h1>
//           <p className="text-lg text-gray-600">{museum.address}, {museum.state}</p>
//         </div>
//         <LogoutButton /> {/* Logout button */}
//       </div>

//       {/* Museum Image with Search bar at the bottom */}
//       <div
//         className="relative bg-cover bg-center h-72 flex items-end justify-center"
//         style={{ backgroundImage: `url(${museum.imageUrl})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative z-10 w-11/12 max-w-xl mb-4">
//           <h2 className="text-white font-cool text-3xl mb-1">Which Exhibit Are You Looking For?</h2>
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

//       {/* Popular Exhibitions */}
//       <div className="p-4">
//         <h3 className="text-2xl font-semibold mb-6">Popular Exhibitions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredExhibitions.slice(0, 3).map((exhibition) => (
//             <div key={exhibition._id} className="cursor-pointer" onClick={() => handleExhibitionClick(exhibition._id)}>
//               <div
//                 className="relative bg-cover bg-center h-40 rounded-lg shadow-md"
//                 style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
//               >
//                 <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
//               </div>
//               {/* Exhibition Name Below */}
//               <span className="block text-center mt-2 text-lg font-semibold text-gray-800">{exhibition.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Outlet />
//     </div>
//   );
// };

// export default MuseumPage;
import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { useMuseum } from '../contexts/MuseumContext';
import LogoutButton from '../components/LogoutButton';

const MuseumPage = () => {
  const { museumName } = useParams();
  const navigate = useNavigate();
  const { museumData, exhibitions } = useMuseum();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);

  
  // useEffect(() => {
  //   if (museumName) {
  //     fetchFullMuseumData(museumName); // Pass museumName to the fetch function
  //   }
  // }, [museumName, fetchFullMuseumData]);


  useEffect(() => {
    if (museumData && exhibitions) {
      // Initial filter to show only open exhibitions with artworks
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

    // Filter from already-filtered exhibitions
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">{museumData.name}</h1>
          <p className="text-lg text-gray-600">
            {museumData.address}, {museumData.state}
          </p>
        </div>
        <LogoutButton />
      </div>

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
        <h3 className="text-2xl font-semibold mb-6">Popular Exhibitions</h3>
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
    </div>
  );
};

export default MuseumPage;
