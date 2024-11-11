// import React, { useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useMuseum } from "../contexts/MuseumContext";
// import GoBackButton from "../components/GoBackButton";
// import LogoutButton from "../components/LogoutButton";
// import ArtworkDetailView from "../components/ArtworkDetailView";
// import Header from "../components/Header";
// import ArtworkCard from "../components/ArtworkCard"; // Import the new ArtworkCard component

// const ExhibitionPage = () => {
//   const { exhibitionId } = useParams();
//   const { museumData, exhibitions, loading } = useMuseum();
//   const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredArtworks, setFilteredArtworks] = useState([]);
//   const artworksSectionRef = useRef(null);

//   const exhibition = exhibitions?.find(
//     (exhibition) => exhibition._id === exhibitionId
//   );

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

//   const artworksToDisplay = exhibition?.artworks || [];
//   const artworksToRender = searchQuery ? filteredArtworks : artworksToDisplay;

//   const handleArtworkClick = (indexInFiltered) => {
//     const artworkId = artworksToRender[indexInFiltered]._id;
//     const indexInAllArtworks = artworksToDisplay.findIndex(
//       (artwork) => artwork._id === artworkId
//     );
//     setSearchQuery("");
//     setSelectedArtworkIndex(indexInAllArtworks);
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

//   if (loading) {
//     return (
//       <p className="text-center text-gray-500 my-8">
//         Loading exhibition details...
//       </p>
//     );
//   }

//   if (!exhibition) {
//     return (
//       <p className="text-center text-gray-500 my-8">Exhibition not found!</p>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header museumData={museumData} LogoutButton={LogoutButton} />
//       <div
//         className="relative bg-cover bg-center h-72 sm:h-96 flex items-end justify-center"
//         style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
//           <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
//             {exhibition.name}
//           </h1>
//           <h2>{exhibition.description}</h2>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
//         {selectedArtworkIndex === null ? (
//           <>

//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold  mb-4 text-gray-800">
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
//                   🔍
//                 </button>
//               </div>
//             </div>

//             <div
//               ref={artworksSectionRef}
//               className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
//             >
//               {artworksToRender.length > 0 ? (
//                 artworksToRender.map((artwork, index) => (
//                   <ArtworkCard
//                     key={artwork._id}
//                     artwork={artwork}
//                     onClick={() => handleArtworkClick(index)}
//                   />
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500 col-span-full">
//                   No artworks found matching your search.
//                 </p>
//               )}
//             </div>
//             <div className="flex justify-center">
//               <GoBackButton text="Back to museum" />
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
//     </div>
//   );
// };

// export default ExhibitionPage;

import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMuseum } from "../contexts/MuseumContext";
import GoBackButton from "../components/GoBackButton";
import LogoutButton from "../components/LogoutButton";
import ArtworkDetailView from "../components/ArtworkDetailView";
import Header from "../components/Header";
import ArtworkCard from "../components/ArtworkCard";
import useTextToSpeech from "../hooks/useTextToSpeech";
import AudioPlayerControls from "../components/AudioPlayerControls";

const ExhibitionPage = () => {
  const { exhibitionId } = useParams();
  const { museumData, exhibitions, loading } = useMuseum();
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [showAudioControls, setShowAudioControls] = useState(false); // Controls visibility of AudioPlayerControls
  const artworksSectionRef = useRef(null);

  const exhibition = exhibitions?.find(
    (exhibition) => exhibition._id === exhibitionId
  );

  const { play, pause, stop, isPlaying, isPaused } = useTextToSpeech(
    exhibition?.description || ""
  );

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

  const handleListenClick = () => {
    setShowAudioControls(true); // Show controls
    play();
  };

  const handleStop = () => {
    stop();
    setShowAudioControls(false); // Hide controls and show "Listen to Description" button
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
      <Header museumData={museumData} LogoutButton={LogoutButton} />
      <div
        className="relative bg-cover bg-center h-72 sm:h-96 flex items-end justify-center"
        style={{ backgroundImage: `url(${exhibition.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
            {exhibition.name}
          </h1>
          <h2 className="max-w-2xl text-md">{exhibition.description}</h2>

          <div className="mt-4" style={{ height: "48px" }}>
            {" "}
            {/* Fixed height for consistency */}
            {!showAudioControls ? (
              <button
                onClick={handleListenClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                Listen to Description
              </button>
            ) : (
              <AudioPlayerControls
                isPlaying={isPlaying}
                isPaused={isPaused}
                play={play}
                pause={pause}
                stop={handleStop} // Use handleStop to hide controls
              />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {selectedArtworkIndex === null ? (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800">
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
                  🔍
                </button>
              </div>
            </div>

            <div
              ref={artworksSectionRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              {artworksToRender.length > 0 ? (
                artworksToRender.map((artwork, index) => (
                  <ArtworkCard
                    key={artwork._id}
                    artwork={artwork}
                    onClick={() => handleArtworkClick(index)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No artworks found matching your search.
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <GoBackButton text="Back to museum" />
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
    </div>
  );
};

export default ExhibitionPage;
