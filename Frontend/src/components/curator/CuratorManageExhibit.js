// import React, { useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useMuseumContext } from "../../contexts/MuseumContext";
// import { useLang } from "../../contexts/LangContext"; // Import Language context
// import CuratorCreateArtwork from "./CuratorCreateArtwork";
// import CuratorEditExhibition from "./CuratorEditExhibition";
// import ArtworkCard from "../common/ArtworkCard"; // Adjust the path as needed
// import GoBackButton from "../common/GoBackButton";

// const CuratorManageExhibit = () => {
//   const { id } = useParams(); // Gets the exhibition ID from the URL
//   const { exhibitions, isLoading } = useMuseumContext();
//   const [activeTab, setActiveTab] = useState("viewArtworks");
//   const [error, setError] = useState("");
//   const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
//   const formRef = useRef(null);
//   const { language } = useLang(); // Destructure language from context
//   const isHebrew = language === "he"; // Check if language is Hebrew

//   const translations = {
//     en: {
//       loading: "Loading...",
//       exhibitionNotFound: "Exhibition not found",
//       editExhibition: "Edit Exhibition",
//       viewArtworks: "View Artworks",
//       addNewArtwork: "Add New Artwork",
//       remainingArtworks: "Remaining Artworks",
//       visitMuseum: "Click here to visit the museum",
//       noMoreArtworks: "No more artworks can be added to this exhibition.",
//       close: "Close",
//     },
//     he: {
//       loading: "טוען...",
//       exhibitionNotFound: "תערוכה לא נמצאה",
//       editExhibition: "ערוך תערוכה",
//       viewArtworks: "צפייה ביצירות אמנות",
//       addNewArtwork: "הוסף יצירה חדשה",
//       remainingArtworks: "יצירות אמנות שנותרו",
//       visitMuseum: "לחץ כאן לבקר במוזיאון",
//       noMoreArtworks: "לא ניתן להוסיף יותר יצירות אמנות לתערוכה זו.",
//       close: "סגור",
//     },
//   };

//   const t = translations[language]; // Get the translations based on language

//   if (isLoading) {
//     return <div>{t.loading}</div>;
//   }

//   const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

//   if (!exhibition) {
//     return <div>{t.exhibitionNotFound}</div>;
//   }

//   const remainingArtworks = exhibition.maxArtworks - exhibition.artworks.length;

//   const handleCreateArtwork = () => {
//     if (remainingArtworks <= 0) {
//       setError(t.noMoreArtworks);
//       return;
//     }
//     setError("");
//     setIsCreatingArtwork(true);
//     setTimeout(() => {
//       formRef.current.scrollIntoView({ behavior: "smooth" });
//     }, 100); // Delay to ensure the form is rendered
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "editExhibition":
//         return <CuratorEditExhibition exhibition={exhibition} />;
//       case "viewArtworks":
//         return (
//           <div
//             className="container mx-auto px-4"
//             dir={isHebrew ? "rtl" : "ltr"}
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//               {exhibition.artworks.map((artwork) => (
//                 <ArtworkCard
//                   key={artwork._id}
//                   id={artwork._id}
//                   title={artwork.title}
//                   description={artwork.description}
//                   createdDateByArtist={artwork.createdDateByArtist}
//                   artist={artwork.artist}
//                   imageUrl={
//                     artwork.imageUrl || "https://via.placeholder.com/150"
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         );
//       case "addNewArtwork":
//         return (
//           <div>
//             {!isCreatingArtwork && (
//               <button
//                 onClick={handleCreateArtwork}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded"
//               >
//                 {t.addNewArtwork}
//               </button>
//             )}
//             {isCreatingArtwork && (
//               <div ref={formRef} >
//                 <CuratorCreateArtwork
//                   exhibitionId={id}
//                   onCreate={() => setIsCreatingArtwork(false)} // Reset isCreatingArtwork when form is done
//                 />
//                 <button
//                   onClick={() => setIsCreatingArtwork(false)} // Close the form manually
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-4 px-4 rounded"
//                 >
//                   {t.close}
//                 </button>
//               </div>
//             )}
//             {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container mx-auto py-8 min-h-screen transition-colors duration-300">
//       {/* Title */}
//       <h1 className="text-4xl font-poppins font-bold tracking-wide mb-6 text-center">
//         {exhibition.name}
//       </h1>

//       {/* Tab Navigation */}
//       <div className="flex justify-center space-x-4 mb-6">
//         {["editExhibition", "viewArtworks", "addNewArtwork"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 font-bold ${
//               activeTab === tab
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500"
//             }`}
//           >
//             {t[tab]}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       {renderTabContent()}

//       {/* Go Back Button */}
//       <div className="mt-4 text-center">
//         <GoBackButton />
//       </div>
//     </div>
//   );
// };

// export default CuratorManageExhibit;

import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import { useLang } from "../../contexts/LangContext";
import CuratorCreateArtwork from "./CuratorCreateArtwork";
import CuratorEditExhibition from "./CuratorEditExhibition";
import ArtworkCard from "../common/ArtworkCard";
import GoBackButton from "../common/GoBackButton";

const CuratorManageExhibit = () => {
  const { id } = useParams();
  const { exhibitions, isLoading } = useMuseumContext();
  const [activeTab, setActiveTab] = useState("viewArtworks");
  const [error, setError] = useState("");
  const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
  const formRef = useRef(null);
  const { language } = useLang();
  const isHebrew = language === "he";

  const translations = {
    en: {
      loading: "Loading...",
      exhibitionNotFound: "Exhibition not found",
      editExhibition: "Edit Exhibition",
      viewArtworks: "View Artworks",
      addNewArtwork: "Add New Artwork",
      remainingArtworks: "Remaining Artworks",
      visitMuseum: "Visit the museum",
      noMoreArtworks: "No more artworks can be added to this exhibition.",
      close: "Close",
    },
    he: {
      loading: "טוען...",
      exhibitionNotFound: "תערוכה לא נמצאה",
      editExhibition: "ערוך תערוכה",
      viewArtworks: "צפייה ביצירות אמנות",
      addNewArtwork: "הוסף יצירה חדשה",
      remainingArtworks: "יצירות אמנות שנותרו",
      visitMuseum: "בקר במוזיאון",
      noMoreArtworks: "לא ניתן להוסיף יותר יצירות אמנות לתערוכה זו.",
      close: "סגור",
    },
  };

  const t = translations[language];

  if (isLoading) {
    return <div>{t.loading}</div>;
  }

  const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

  if (!exhibition) {
    return <div>{t.exhibitionNotFound}</div>;
  }

  const remainingArtworks = exhibition.maxArtworks - exhibition.artworks.length;

  const handleCreateArtwork = () => {
    if (remainingArtworks <= 0) {
      setError(t.noMoreArtworks);
      return;
    }
    setError("");
    setIsCreatingArtwork(true);
    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "editExhibition":
        return <CuratorEditExhibition exhibition={exhibition} />;
      case "viewArtworks":
        return (
          <div
            className="container mx-auto px-4"
            dir={isHebrew ? "rtl" : "ltr"}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {exhibition.artworks.map((artwork) => (
                <ArtworkCard
                  key={artwork._id}
                  id={artwork._id}
                  title={artwork.title}
                  description={artwork.description}
                  createdDateByArtist={artwork.createdDateByArtist}
                  artist={artwork.artist}
                  imageUrl={
                    artwork.imageUrl || "https://via.placeholder.com/150"
                  }
                />
              ))}
            </div>
          </div>
        );
      case "addNewArtwork":
        return (
          <div>
            {!isCreatingArtwork && (
              <button
                onClick={handleCreateArtwork}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {t.addNewArtwork}
              </button>
            )}
            {isCreatingArtwork && (
              <div ref={formRef}>
                <CuratorCreateArtwork
                  exhibitionId={id}
                  onCreate={() => setIsCreatingArtwork(false)}
                />
                <button
                  onClick={() => setIsCreatingArtwork(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-4 px-4 rounded"
                >
                  {t.close}
                </button>
              </div>
            )}
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  // Construct the museum link URL using the exhibition's museum name
  // Construct the museum link URL using the exhibition's museum name and password
  const museumUrl = `https://mensch-visitors.vercel.app/?museumName=${encodeURIComponent(
    exhibition.museum.name
  )}&password=${encodeURIComponent(exhibition.museum.password)}`;

  return (
    <div className="container mx-auto py-8 min-h-screen transition-colors duration-300">
      {/* Title and Museum Link */}
      <div className="mb-4">
        <h1 className="text-4xl font-poppins font-bold tracking-wide text-center">
          {exhibition.name}{" "}
        </h1>
        <a
          href={museumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700 ml-4"
        >
          {t.visitMuseum}
        </a>
      </div>
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        {["editExhibition", "viewArtworks", "addNewArtwork"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-bold ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {t[tab]}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Go Back Button */}
      <div className="mt-4 text-center">
        <GoBackButton />
      </div>
    </div>
  );
};

export default CuratorManageExhibit;
