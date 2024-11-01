// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useMuseum } from "../contexts/MuseumContext";
// import GoBackButton from "../components/GoBackButton";
// import LogoutButton from "../components/LogoutButton";
// import ArtworkDetailView from "../components/ArtworkDetailView"; // Import the ArtworkDetailView component

// const ExhibitionPage = () => {
//   const { museumName, exhibitionId } = useParams();
//   const { exhibitions, fetchMuseumDetails, setExhibitions, museum, setMuseum } =
//     useMuseum();
//   const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredArtworks, setFilteredArtworks] = useState([]);
//   const artworksSectionRef = useRef(null);
//   const [loading, setLoading] = useState(true);

//   const exhibition = exhibitions
//     ? exhibitions.find((exhibition) => exhibition._id === exhibitionId)
//     : null;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!museum || !exhibition) {
//         try {
//           setLoading(true);
//           const museumData = await fetchMuseumDetails(museumName);
//           setMuseum(museumData.museum);
//           setExhibitions(museumData.exhibitions);
//         } catch (error) {
//           console.error("Error fetching museum or exhibition data:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [
//     museum,
//     exhibition,
//     fetchMuseumDetails,
//     museumName,
//     setExhibitions,
//     setMuseum,
//   ]);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = exhibition?.artworks?.filter((artwork) =>
//       artwork.title.toLowerCase().includes(query)
//     );

//     setFilteredArtworks(filtered);

//     if (artworksSectionRef.current) {
//       artworksSectionRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Use all artworks for browsing after entering artwork view, regardless of filter
//   const artworksToDisplay = exhibition?.artworks || [];
//   const artworksToRender = searchQuery ? filteredArtworks : artworksToDisplay;

//   const handleArtworkClick = (indexInFiltered) => {
//     // Find the original index in the full artworks array to maintain consistency
//     const artworkId = artworksToRender[indexInFiltered]._id;
//     const indexInAllArtworks = artworksToDisplay.findIndex(
//       (artwork) => artwork._id === artworkId
//     );

//     setSearchQuery(""); // Reset search query to allow full navigation
//     setSelectedArtworkIndex(indexInAllArtworks); // Use full list index for viewing
//   };

//   const handleNextArtwork = () => {
//     setSelectedArtworkIndex(
//       (prevIndex) => (prevIndex + 1) % artworksToDisplay.length
//     );
//   };

//   const handlePreviousArtwork = () => {
//     setSelectedArtworkIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + artworksToDisplay.length) % artworksToDisplay.length
//     );
//   };

//   const closeArtworkDetailView = () => {
//     setSelectedArtworkIndex(null);
//   };

//   if (loading)
//     return (
//       <p className="text-center text-gray-500 my-8">
//         Loading exhibition details...
//       </p>
//     );

//   if (!exhibition)
//     return (
//       <p className="text-center text-gray-500 my-8">Exhibition not found!</p>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="flex justify-between items-center p-4 bg-white shadow-lg">
//         <div>
//           <h1 className="text-3xl font-bold">{museum.name}</h1>
//           <p className="text-lg text-gray-600">
//             {museum.address}, {museum.state}
//           </p>
//         </div>
//         <LogoutButton /> {/* Logout button */}
//       </div>

//       <div
//         className="relative bg-cover bg-center h-72 sm:h-96 flex items-end justify-center"
//         style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
//           <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
//             {exhibition.name}
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {selectedArtworkIndex === null ? (
//           <>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-800">
//               Artworks
//             </h2>

//             <div className="mb-6 flex justify-center">
//               <div className="relative w-full max-w-lg">
//                 <input
//                   type="text"
//                   placeholder="Search Artworks"
//                   value={searchQuery}
//                   onChange={handleSearch}
//                   className="w-full p-4 pr-12 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
//                 />
//                 <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div
//               ref={artworksSectionRef}
//               className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
//             >
//               {artworksToRender.length > 0 ? (
//                 artworksToRender.map((artwork, index) => (
//                   <div
//                     key={artwork._id}
//                     onClick={() => handleArtworkClick(index)}
//                     className="cursor-pointer flex justify-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition duration-200 ease-in-out"
//                   >
//                     <div>
//                       <img
//                         src={artwork.imageUrl}
//                         alt={artwork.title}
//                         className="w-full h-48 rounded-md object-cover"
//                       />
//                       <p className="mt-4 text-center font-semibold text-gray-800 line-clamp-2">
//                         {artwork.title}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500 col-span-full">
//                   No artworks found matching your search.
//                 </p>
//               )}
//             </div>
//           </>
//         ) : (
//           <ArtworkDetailView
//             artwork={artworksToDisplay[selectedArtworkIndex]}
//             onClose={closeArtworkDetailView}
//             onNext={handleNextArtwork}
//             onPrevious={handlePreviousArtwork}
//           />
//         )}
//       </div>

//       <div className="fixed bottom-0">
//         <GoBackButton text="Back to museum" />
//       </div>
//     </div>
//   );
// };

// export default ExhibitionPage;

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useMuseum } from "../contexts/MuseumContext";
// import GoBackButton from "../components/GoBackButton";
// import LogoutButton from "../components/LogoutButton";
// import ArtworkDetailView from "../components/ArtworkDetailView"; // Import the ArtworkDetailView component

// const ExhibitionPage = () => {
//   const { museumName, exhibitionId } = useParams();
//   const { exhibitions, fetchMuseumDetails, setExhibitions, museum, setMuseum } =
//     useMuseum();
//   const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredArtworks, setFilteredArtworks] = useState([]);
//   const artworksSectionRef = useRef(null);
//   const [loading, setLoading] = useState(true);

//   const exhibition = exhibitions
//     ? exhibitions.find((exhibition) => exhibition._id === exhibitionId)
//     : null;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!museum || !exhibition) {
//         try {
//           setLoading(true);
//           const museumData = await fetchMuseumDetails(museumName);
//           setMuseum(museumData.museum);
//           setExhibitions(museumData.exhibitions);
//         } catch (error) {
//           console.error("Error fetching museum or exhibition data:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [
//     museum,
//     exhibition,
//     fetchMuseumDetails,
//     museumName,
//     setExhibitions,
//     setMuseum,
//   ]);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = exhibition?.artworks?.filter((artwork) =>
//       artwork.title.toLowerCase().includes(query)
//     );

//     setFilteredArtworks(filtered);

//     if (artworksSectionRef.current) {
//       artworksSectionRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Use all artworks for browsing after entering artwork view, regardless of filter
//   const artworksToDisplay = exhibition?.artworks || [];
//   const artworksToRender = searchQuery ? filteredArtworks : artworksToDisplay;

//   const handleArtworkClick = (indexInFiltered) => {
//     // Find the original index in the full artworks array to maintain consistency
//     const artworkId = artworksToRender[indexInFiltered]._id;
//     const indexInAllArtworks = artworksToDisplay.findIndex(
//       (artwork) => artwork._id === artworkId
//     );

//     setSearchQuery(""); // Reset search query to allow full navigation
//     setSelectedArtworkIndex(indexInAllArtworks); // Use full list index for viewing
//   };

//   const handleNextArtwork = () => {
//     setSelectedArtworkIndex(
//       (prevIndex) => (prevIndex + 1) % artworksToDisplay.length
//     );
//   };

//   const handlePreviousArtwork = () => {
//     setSelectedArtworkIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + artworksToDisplay.length) % artworksToDisplay.length
//     );
//   };

//   const closeArtworkDetailView = () => {
//     setSelectedArtworkIndex(null);
//   };

//   if (loading)
//     return (
//       <p className="text-center text-gray-500 my-8">
//         Loading exhibition details...
//       </p>
//     );

//   if (!exhibition)
//     return (
//       <p className="text-center text-gray-500 my-8">Exhibition not found!</p>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="flex justify-between items-center p-4 bg-white shadow-lg">
//         <div>
//           <h1 className="text-3xl font-bold">{museum.name}</h1>
//           <p className="text-lg text-gray-600">
//             {museum.address}, {museum.state}
//           </p>
//         </div>
//         <LogoutButton /> {/* Logout button */}
//       </div>

//       <div
//         className="relative bg-cover bg-center h-72 sm:h-96 flex items-end justify-center"
//         style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
//           <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
//             {exhibition.name}
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {selectedArtworkIndex === null ? (
//           <>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-800">
//               Artworks
//             </h2>

//             <div className="mb-6 flex justify-center">
//               <div className="relative w-full max-w-lg">
//                 <input
//                   type="text"
//                   placeholder="Search Artworks"
//                   value={searchQuery}
//                   onChange={handleSearch}
//                   className="w-full p-4 pr-12 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
//                 />
//                 <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div
//               ref={artworksSectionRef}
//               className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
//             >
//               {artworksToRender.length > 0 ? (
//                 artworksToRender.map((artwork, index) => (
//                   <div
//                     key={artwork._id}
//                     onClick={() => handleArtworkClick(index)}
//                     className="cursor-pointer flex justify-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition duration-200 ease-in-out"
//                   >
//                     <div>
//                       <img
//                         src={artwork.imageUrl}
//                         alt={artwork.title}
//                         className="w-full h-48 rounded-md object-cover"
//                       />
//                       <p className="mt-4 text-center font-semibold text-gray-800 line-clamp-2">
//                         {artwork.title}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500 col-span-full">
//                   No artworks found matching your search.
//                 </p>
//               )}
//             </div>
//           </>
//         ) : (
//           <ArtworkDetailView
//             artwork={artworksToDisplay[selectedArtworkIndex]}
//             onClose={closeArtworkDetailView}
//             onNext={handleNextArtwork}
//             onPrevious={handlePreviousArtwork}
//           />
//         )}
//       </div>

//       <div className="fixed bottom-0">
//         <GoBackButton text="Back to museum" />
//       </div>
//     </div>
//   );
// };

// export default ExhibitionPage;


// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\components\ExhibitionPage.js

import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMuseum } from "../contexts/MuseumContext";
import GoBackButton from "../components/GoBackButton";
import LogoutButton from "../components/LogoutButton";
import ArtworkDetailView from "../components/ArtworkDetailView"; 

const ExhibitionPage = () => {
  const {  exhibitionId } = useParams();
  const { museumData, exhibitions, loading } = useMuseum();
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loadingArtworks, setLoadingArtworks] = useState(true); // Artwork-specific loading state
  const artworksSectionRef = useRef(null);
  const navigate = useNavigate();

  const exhibition = exhibitions?.find((exhibition) => exhibition._id === exhibitionId);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = exhibition?.artworks?.filter((artwork) =>
      artwork.title.toLowerCase().includes(query)
    );
    setFilteredArtworks(filtered);
    if (artworksSectionRef.current) {
      artworksSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const artworksToDisplay = exhibition?.artworks || [];
  const artworksToRender = searchQuery ? filteredArtworks : artworksToDisplay;

  const handleArtworkClick = (indexInFiltered) => {
    const artworkId = artworksToRender[indexInFiltered]._id;
    const indexInAllArtworks = artworksToDisplay.findIndex(
      (artwork) => artwork._id === artworkId
    );
    setSearchQuery("");
    setSelectedArtworkIndex(indexInAllArtworks);
  };

  const handleNextArtwork = () => {
    setSelectedArtworkIndex(
      (prevIndex) => (prevIndex + 1) % artworksToDisplay.length
    );
  };

  const handlePreviousArtwork = () => {
    setSelectedArtworkIndex(
      (prevIndex) =>
        (prevIndex - 1 + artworksToDisplay.length) % artworksToDisplay.length
    );
  };

  const closeArtworkDetailView = () => {
    setSelectedArtworkIndex(null);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 my-8">
        Loading exhibition details...
      </p>
    );
  }

  if (!exhibition) {
    return (
      <p className="text-center text-gray-500 my-8">Exhibition not found!</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">{museumData?.name}</h1>
          <p className="text-lg text-gray-600">
            {museumData?.address}, {museumData?.state}
          </p>
        </div>

        {/* Exhibition Banner */}
        <div
          className="relative bg-cover bg-center h-72 sm:h-96 flex items-end justify-center"
          style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
              {exhibition.name}
            </h1>
          </div>
        </div>
      </div>
      {/* Artworks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedArtworkIndex === null ? (
          <>
            <div className="my-4 flex justify-center">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Search Artworks"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full p-4 pr-12 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
                  🔍
                </button>
              </div>
            </div>

            {/* Artworks grid or spinner */}
            {loadingArtworks ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            ) : (
              <div
                ref={artworksSectionRef}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
              >
                {artworksToRender.length > 0 ? (
                  artworksToRender.map((artwork, index) => (
                    <div
                      key={artwork._id}
                      onClick={() => handleArtworkClick(index)}
                      className="cursor-pointer flex justify-center bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition duration-200 ease-in-out"
                    >
                      <div>
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="w-full h-48 rounded-md object-cover"
                        />
                        <p className="mt-4 text-center font-semibold text-gray-800 line-clamp-2">
                          {artwork.title}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    No artworks found matching your search.
                  </p>
                )}
              </div>
            )}
            <div className="mt-4 flex justify-center">
              <GoBackButton text="Back to museum" />
            </div>
          </>
        ) : (
          <div className="py-4 flex justify-center ">
            <ArtworkDetailView
              artwork={artworksToDisplay[selectedArtworkIndex]}
              onClose={closeArtworkDetailView}
              onNext={handleNextArtwork}
              onPrevious={handlePreviousArtwork}
              goBackToMuseum={() => navigate(`/${museumData.name}/exhibitions`)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitionPage;
