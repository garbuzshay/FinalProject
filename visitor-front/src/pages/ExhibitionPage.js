// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useMuseum } from "../contexts/MuseumContext";
// import CardArtwork from "../components/CardArtwork";
// import GoBackButton from "../components/GoBackButton";
// import LogoutButton from "../components/LogoutButton";

// const ExhibitionPage = () => {
//   const { museumName, exhibitionId } = useParams(); // Get museumName and exhibitionId from URL
//   const { exhibitions, fetchMuseumDetails, setExhibitions, museum, setMuseum } = useMuseum(); // Fetch museum and exhibitions
//   const [selectedArtworkId, setSelectedArtworkId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(""); // New state for search query
//   const [filteredArtworks, setFilteredArtworks] = useState([]); // New state for filtered artworks
//   const artworksSectionRef = useRef(null); // Ref for artworks section
//   const [loading, setLoading] = useState(true); // Loading state

//   const exhibition = exhibitions.find(
//     (exhibition) => exhibition._id === exhibitionId
//   );

//   // Fetch museum details if not available or when the page is refreshed
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!museum || !exhibition) {
//         try {
//           setLoading(true);
//           const museumData = await fetchMuseumDetails(museumName); // Fetch the museum and exhibitions based on museumName
//           setMuseum(museumData.museum); // Set the museum data in context
//           setExhibitions(museumData.exhibitions); // Set the exhibitions in context
//         } catch (error) {
//           console.error("Error fetching museum or exhibition data:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false); // If the exhibition data is already available
//       }
//     };

//     fetchData();
//   }, [museum, exhibition, fetchMuseumDetails, museumName, setExhibitions, setMuseum]);

//   if (loading) return <p>Loading exhibition details...</p>; // Display loading while fetching data

//   if (!exhibition) return <p>Exhibition not found!</p>; // If no exhibition is found

//   // Filter artworks based on search query
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = exhibition.artworks.filter((artwork) =>
//       artwork.title.toLowerCase().includes(query)
//     );

//     setFilteredArtworks(filtered);

//     // Scroll to artworks section
//     if (artworksSectionRef.current) {
//       artworksSectionRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // If no search has been performed, show all artworks
//   const artworksToDisplay = searchQuery ? filteredArtworks : exhibition.artworks;

//   const handleArtworkClick = (artworkId) => {
//     setSelectedArtworkId((prevId) => (prevId === artworkId ? null : artworkId));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
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
//         className="relative bg-cover bg-center h-72 flex items-end justify-center"
//         style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
//           <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
//             {exhibition.name}
//           </h1>
//         </div>
//       </div>

//       <div className="p-8">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-800">
//           Artworks
//         </h2>

//         {/* Modern and Responsive Search bar for artworks */}
//         <div className="mb-6 flex justify-center">
//           <div className="relative w-full max-w-lg">
//             <input
//               type="text"
//               placeholder="Search Artworks"
//               value={searchQuery}
//               onChange={handleSearch}
//               className="w-full p-4 pr-12 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
//             />
//             <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
//               🔍
//             </button>
//           </div>
//         </div>

//         {/* Display artworks */}
//         <div ref={artworksSectionRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {artworksToDisplay.length > 0 ? (
//             artworksToDisplay.map((artwork) => (
//               <CardArtwork
//                 key={artwork._id}
//                 imageUrl={artwork.imageUrl}
//                 title={artwork.title}
//                 artist={artwork.artist}
//                 description={artwork.description}
//                 createdDate={artwork.createdDateByArtist}
//                 isOpen={selectedArtworkId === artwork._id}
//                 onClick={() => handleArtworkClick(artwork._id)}
//                 artworkId={artwork._id} // Pass artworkId to the CardArtwork component
//                 exhibitionId={exhibitionId} // Pass exhibitionId to the CardArtwork component
//               />
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-full">
//               No artworks found matching your search.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* GoBackButton is fixed on the left side */}
//       <div className="fixed bottom-4 left-4">
//         <GoBackButton />
//       </div>
//     </div>
//   );
// };

// export default ExhibitionPage;

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMuseum } from "../contexts/MuseumContext";
import GoBackButton from "../components/GoBackButton";
import LogoutButton from "../components/LogoutButton";

const ArtworkDetailView = ({ artwork, onClose, onNext, onPrevious }) => {
  return (
    <div className="p-6 flex flex-col h-full bg-white rounded-lg shadow-lg relative">
      <button
        onClick={onClose}
        className="text-blue-500 self-start mb-4 font-semibold hover:text-blue-600 transition  top-4 left-4 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Artworks
      </button>

      <div className="flex-1 flex flex-col justify-center items-center relative">
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="relative w-82 h-96 flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="object-cover max-h-full max-w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
          <div className="absolute bottom-4 left-4 text-white z-20">
            <h2 className="text-2xl font-bold">{artwork.title}</h2>
            <p className="text-gray-300 italic">{artwork.artist}</p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="mt-6 p-4">
        <p className="font-bold text-lg">Description</p>
        <p className="text-gray-700">{artwork.description}</p>
      </div>
    </div>
  );
};

const ExhibitionPage = () => {
  const { museumName, exhibitionId } = useParams();
  const { exhibitions, fetchMuseumDetails, setExhibitions, museum, setMuseum } =
    useMuseum();
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const artworksSectionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const exhibition = exhibitions
    ? exhibitions.find((exhibition) => exhibition._id === exhibitionId)
    : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!museum || !exhibition) {
        try {
          setLoading(true);
          const museumData = await fetchMuseumDetails(museumName);
          setMuseum(museumData.museum);
          setExhibitions(museumData.exhibitions);
        } catch (error) {
          console.error("Error fetching museum or exhibition data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    museum,
    exhibition,
    fetchMuseumDetails,
    museumName,
    setExhibitions,
    setMuseum,
  ]);

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

  const artworksToDisplay = searchQuery
    ? filteredArtworks
    : exhibition?.artworks || [];

  const handleArtworkClick = (index) => {
    setSearchQuery(""); // Reset search query to allow full navigation
    setSelectedArtworkIndex(index);
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

  if (loading)
    return (
      <p className="text-center text-gray-500 my-8">
        Loading exhibition details...
      </p>
    );

  if (!exhibition)
    return (
      <p className="text-center text-gray-500 my-8">Exhibition not found!</p>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{museum.name}</h1>
            <p className="text-gray-600 text-base">
              {museum.address}, {museum.state}
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>

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

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {selectedArtworkIndex === null ? (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-800">
              Artworks
            </h2>

            <div className="mb-6 flex justify-center">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Search Artworks"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full p-4 pr-12 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={artworksSectionRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {artworksToDisplay.length > 0 ? (
                artworksToDisplay.map((artwork, index) => (
                  <div
                    key={artwork._id}
                    onClick={() => handleArtworkClick(index)}
                    className="cursor-pointer bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition duration-200 ease-in-out"
                  >
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="object-cover w-full h-48 rounded-md"
                    />
                    <p className="mt-4 text-center font-semibold text-gray-800 line-clamp-2">
                      {artwork.title}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No artworks found matching your search.
                </p>
              )}
            </div>
          </>
        ) : (
          <ArtworkDetailView
            artwork={artworksToDisplay[selectedArtworkIndex]}
            onClose={closeArtworkDetailView}
            onNext={handleNextArtwork}
            onPrevious={handlePreviousArtwork}
          />
        )}
      </div>

      <div className="fixed bottom-0">
        <GoBackButton text="Back to museum" />
      </div>
    </div>
  );
};

export default ExhibitionPage;
