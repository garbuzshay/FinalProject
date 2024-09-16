// import React, { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useMuseum } from "../contexts/MuseumContext";
// import CardArtwork from "../components/CardArtwork";
// import GoBackButton from "../components/GoBackButton";
// import LogoutButton from "../components/LogoutButton";

// const ExhibitionPage = () => {
//   const { exhibitionId } = useParams();
//   const { exhibitions, museum } = useMuseum();
//   const [selectedArtworkId, setSelectedArtworkId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(""); // New state for search query
//   const [filteredArtworks, setFilteredArtworks] = useState([]); // New state for filtered artworks
//   const artworksSectionRef = useRef(null); // Ref for artworks section

//   const exhibition = exhibitions.find(
//     (exhibition) => exhibition._id === exhibitionId
//   );

//   if (!exhibition) return <p>Loading...</p>;

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
//         className="relative overflow-hidden bg-cover bg-center h-64 sm:h-80 md:h-96 w-full rounded-lg shadow-lg"
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
//               />
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-full">
//               No artworks found matching your search.
//             </p>
//           )}
//         </div>

//         {/* Center the GoBackButton */}
//         <div className="text-center mt-6">
//           <GoBackButton />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExhibitionPage;


import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMuseum } from "../contexts/MuseumContext";
import CardArtwork from "../components/CardArtwork";
import GoBackButton from "../components/GoBackButton";
import LogoutButton from "../components/LogoutButton";

const ExhibitionPage = () => {
  const { museumName, exhibitionId } = useParams(); // Get museumName and exhibitionId from URL
  const { exhibitions, fetchMuseumDetails, setExhibitions, museum, setMuseum } = useMuseum(); // Fetch museum and exhibitions
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [filteredArtworks, setFilteredArtworks] = useState([]); // New state for filtered artworks
  const artworksSectionRef = useRef(null); // Ref for artworks section
  const [loading, setLoading] = useState(true); // Loading state

  const exhibition = exhibitions.find(
    (exhibition) => exhibition._id === exhibitionId
  );

  // Fetch museum details if not available or when the page is refreshed
  useEffect(() => {
    const fetchData = async () => {
      if (!museum || !exhibition) {
        try {
          setLoading(true);
          const museumData = await fetchMuseumDetails(museumName); // Fetch the museum and exhibitions based on museumName
          setMuseum(museumData.museum); // Set the museum data in context
          setExhibitions(museumData.exhibitions); // Set the exhibitions in context
        } catch (error) {
          console.error("Error fetching museum or exhibition data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // If the exhibition data is already available
      }
    };

    fetchData();
  }, [museum, exhibition, fetchMuseumDetails, museumName, setExhibitions, setMuseum]);

  if (loading) return <p>Loading exhibition details...</p>; // Display loading while fetching data

  if (!exhibition) return <p>Exhibition not found!</p>; // If no exhibition is found

  // Filter artworks based on search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = exhibition.artworks.filter((artwork) =>
      artwork.title.toLowerCase().includes(query)
    );

    setFilteredArtworks(filtered);

    // Scroll to artworks section
    if (artworksSectionRef.current) {
      artworksSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If no search has been performed, show all artworks
  const artworksToDisplay = searchQuery ? filteredArtworks : exhibition.artworks;

  const handleArtworkClick = (artworkId) => {
    setSelectedArtworkId((prevId) => (prevId === artworkId ? null : artworkId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="flex justify-between items-center p-4 bg-white shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">{museum.name}</h1>
          <p className="text-lg text-gray-600">
            {museum.address}, {museum.state}
          </p>
        </div>
        <LogoutButton /> {/* Logout button */}
      </div>

      <div
        className="relative bg-cover bg-center h-72 flex items-end justify-center"
        style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
            {exhibition.name}
          </h1>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-800">
          Artworks
        </h2>

        {/* Modern and Responsive Search bar for artworks */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search Artworks"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-4 pr-12 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
              🔍
            </button>
          </div>
        </div>

        {/* Display artworks */}
        <div ref={artworksSectionRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworksToDisplay.length > 0 ? (
            artworksToDisplay.map((artwork) => (
              <CardArtwork
                key={artwork._id}
                imageUrl={artwork.imageUrl}
                title={artwork.title}
                artist={artwork.artist}
                description={artwork.description}
                createdDate={artwork.createdDateByArtist}
                isOpen={selectedArtworkId === artwork._id}
                onClick={() => handleArtworkClick(artwork._id)}
                artworkId={artwork._id} // Pass artworkId to the CardArtwork component
                exhibitionId={exhibitionId} // Pass exhibitionId to the CardArtwork component
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No artworks found matching your search.
            </p>
          )}
        </div>
      </div>

      {/* GoBackButton is fixed on the left side */}
      <div className="fixed bottom-4 left-4">
        <GoBackButton />
      </div>
    </div>
  );
};

export default ExhibitionPage;
