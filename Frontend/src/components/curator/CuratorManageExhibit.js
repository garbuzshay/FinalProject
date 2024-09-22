// import React, { useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useMuseumContext } from "../../contexts/MuseumContext";

// import CuratorCreateArtwork from "./CuratorCreateArtwork";
// import ArtworkCard from "../common/ArtworkCard"; // Adjust the path as needed
// import GoBackButton from "../common/GoBackButton";

// const CuratorManageExhibit = () => {
//   const { id } = useParams(); // Gets the exhibition ID from the URL
//   const navigate = useNavigate();
//   const { exhibitions, isLoading } = useMuseumContext();
//   const [error, setError] = useState("");
//   const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
//   const formRef = useRef(null);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

//   if (!exhibition) {
//     return <div>Exhibition not found</div>;
//   }

//   const remainingArtworks = exhibition.maxArtworks - exhibition.artworks.length;
//   const exhibitArtworks = exhibition.maxArtworks;

//   const handleCreateArtwork = () => {
//     if (remainingArtworks <= 0) {
//       setError("No more artworks can be added to this exhibition.");
//       return;
//     }
//     setError("");
//     setIsCreatingArtwork(true);
//     setTimeout(() => {
//       formRef.current.scrollIntoView({ behavior: "smooth" });
//     }, 100); // Delay to ensure the form is rendered
//   };

//   const handleExhibitionDetails = () => {
//     navigate(`/curator/exhibitions/edit/${id}`); // Navigate to CuratorEditExhibition
//   };

//   const museumUrl = `https://mensch-visitors.vercel.app/${exhibition?.museum.name}`;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">{exhibition.name}</h1>
//       <a
//         href={museumUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-500 underline"
//       >
//         Click here to visit the museum
//       </a>
//       <p className="text-xl mb-4">
//         Remaining Artworks: {remainingArtworks}/{exhibitArtworks}
//       </p>

//       {/* Exhibition Details Button */}
//       <div className="mt-6">
//         <button
//           onClick={handleExhibitionDetails}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mb-4 px-4 rounded"
//         >
//           {exhibition.name}  - View & Edit 
//         </button>
//       </div>

//       {remainingArtworks > 0 && (
//         <div className="mt-6">
//           {!isCreatingArtwork && (
//             <button
//               onClick={handleCreateArtwork}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-4 rounded"
//             >
//               Click here to add a new artwork
//             </button>
//           )}
//           {isCreatingArtwork && (
//             <div ref={formRef} className="mt-4">
//               <CuratorCreateArtwork
//                 exhibitionId={id}
//                 onCreate={() => setIsCreatingArtwork(false)} // Reset isCreatingArtwork when form is done
//               />
//               <button
//                 onClick={() => setIsCreatingArtwork(false)} // Close the form manually
//                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
//               >
//                 Close
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-5">
//         {exhibition.artworks.map((artwork) => (
//           <ArtworkCard
//             key={artwork._id}
//             id={artwork._id}
//             title={artwork.title}
//             description={artwork.description}
//             createdDateByArtist={artwork.createdDateByArtist}
//             artist={artwork.artist}
//             imageUrl={artwork.imageUrl || "https://via.placeholder.com/150"}
//           />
//         ))}
//       </div>

//       <div className="mt-4">
//         <GoBackButton />
//       </div>
//     </div>
//   );
// };

// export default CuratorManageExhibit;


import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import { useLang } from "../../contexts/LangContext"; // Import Language context
import CuratorCreateArtwork from "./CuratorCreateArtwork";
import ArtworkCard from "../common/ArtworkCard"; // Adjust the path as needed
import GoBackButton from "../common/GoBackButton";

const CuratorManageExhibit = () => {
  const { id } = useParams(); // Gets the exhibition ID from the URL
  const navigate = useNavigate();
  const { exhibitions, isLoading } = useMuseumContext();
  const [error, setError] = useState("");
  const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
  const formRef = useRef(null);
  const { language } = useLang(); // Destructure language from context
  const isHebrew = language === "he"; // Check if language is Hebrew

  const translations = {
    en: {
      loading: "Loading...",
      exhibitionNotFound: "Exhibition not found",
      remainingArtworks: "Remaining Artworks",
      viewEditExhibition: "View & Edit",
      addNewArtwork: "Click here to add a new artwork",
      visitMuseum: "Click here to visit the museum",
      noMoreArtworks: "No more artworks can be added to this exhibition.",
      close: "Close",
    },
    he: {
      loading: "טוען...",
      exhibitionNotFound: "תערוכה לא נמצאה",
      remainingArtworks: "יצירות אמנות שנותרו",
      viewEditExhibition: "צפה וערוך",
      addNewArtwork: "לחץ כאן כדי להוסיף יצירה חדשה",
      visitMuseum: "לחץ כאן לבקר במוזיאון",
      noMoreArtworks: "לא ניתן להוסיף יותר יצירות אמנות לתערוכה זו.",
      close: "סגור",
    },
  };

  const t = translations[language]; // Get the translations based on language

  if (isLoading) {
    return <div>{t.loading}</div>;
  }

  const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

  if (!exhibition) {
    return <div>{t.exhibitionNotFound}</div>;
  }

  const remainingArtworks = exhibition.maxArtworks - exhibition.artworks.length;
  const exhibitArtworks = exhibition.maxArtworks;

  const handleCreateArtwork = () => {
    if (remainingArtworks <= 0) {
      setError(t.noMoreArtworks);
      return;
    }
    setError("");
    setIsCreatingArtwork(true);
    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay to ensure the form is rendered
  };

  const handleExhibitionDetails = () => {
    navigate(`/curator/exhibitions/edit/${id}`); // Navigate to CuratorEditExhibition
  };

  const museumUrl = `https://mensch-visitors.vercel.app/${exhibition?.museum.name}`;

  return (
    <div
      className={`container mx-auto p-4 ${
        isHebrew ? "text-right" : "text-left"
      }`}
    >
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">{exhibition.name}</h1>

      {/* Visit Museum Link */}
      <div className="text-center mb-4">
        <a
          href={museumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {t.visitMuseum}
        </a>
      </div>

      {/* Remaining Artworks Info */}
      <p className="text-xl mb-4 text-center">
        {t.remainingArtworks}: {remainingArtworks}/{exhibitArtworks}
      </p>

      {/* Exhibition Details Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleExhibitionDetails}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mb-4 px-4 rounded"
        >
          {exhibition.name} - {t.viewEditExhibition}
        </button>
      </div>

      {/* Add New Artwork Button */}
      {remainingArtworks > 0 && (
        <div className="mt-6 text-center">
          {!isCreatingArtwork && (
            <button
              onClick={handleCreateArtwork}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-4 rounded"
            >
              {t.addNewArtwork}
            </button>
          )}
          {isCreatingArtwork && (
            <div ref={formRef} className="mt-4">
              <CuratorCreateArtwork
                exhibitionId={id}
                onCreate={() => setIsCreatingArtwork(false)} // Reset isCreatingArtwork when form is done
              />
              <button
                onClick={() => setIsCreatingArtwork(false)} // Close the form manually
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                {t.close}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-5">
        {exhibition.artworks.map((artwork) => (
          <ArtworkCard
            key={artwork._id}
            id={artwork._id}
            title={artwork.title}
            description={artwork.description}
            createdDateByArtist={artwork.createdDateByArtist}
            artist={artwork.artist}
            imageUrl={artwork.imageUrl || "https://via.placeholder.com/150"}
          />
        ))}
      </div>

      {/* Go Back Button */}
      <div className="mt-4 text-center">
        <GoBackButton />
      </div>
    </div>
  );
};

export default CuratorManageExhibit;
