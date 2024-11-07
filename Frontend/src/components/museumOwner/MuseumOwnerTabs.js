// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { useLang } from "../../contexts/LangContext"; // Import Language Context

// const MuseumOwnerTabs = () => {
//   const { language } = useLang(); // Get the current language from LangContext
//   const isHebrew = language === "he"; // Check if the language is Hebrew

//   // Translations for the tab labels
//   const translations = {
//     en: {
//       editExhibition: "Edit Exhibition",
//       viewArtworks: "View Artworks",
//       addNewArtwork: "Add New Artwork",
//     },
//     he: {
//       editExhibition: "ערוך תערוכה",
//       viewArtworks: "צפה ביצירות אמנות",
//       addNewArtwork: "הוסף יצירת אמנות חדשה",
//     },
//   };

//   // Get the correct translation based on the current language
//   const t = translations[language];

//   return (
//     <div className="container mx-auto p-4">
//       <h1> </h1>
//       {/* Apply 'flex-row-reverse' class if the language is Hebrew */}
//       <div className={`flex border-b mb-4 ${isHebrew ? "flex-row-reverse" : ""}`}>
//         <NavLink
//           to="edit"
//           className={({ isActive }) =>
//             `px-4 py-2 ${
//               isActive
//                 ? "border-b-2 border-blue-500 text-blue-500"
//                 : "text-gray-500"
//             }`
//           }
//         >
//           {t.editExhibition} {/* Display translated "Edit Exhibition" */}
//         </NavLink>
//         <NavLink
//           to="artworks"
//           className={({ isActive }) =>
//             `px-4 py-2 ${
//               isActive
//                 ? "border-b-2 border-blue-500 text-blue-500"
//                 : "text-gray-500"
//             }`
//           }
//         >
//           {t.viewArtworks} {/* Display translated "View Artworks" */}
//         </NavLink>
//         <NavLink
//           to="add-artwork"
//           className={({ isActive }) =>
//             `px-4 py-2 ${
//               isActive
//                 ? "border-b-2 border-blue-500 text-blue-500"
//                 : "text-gray-500"
//             }`
//           }
//         >
//           {t.addNewArtwork} {/* Display translated "Add New Artwork" */}
//         </NavLink>
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// export default MuseumOwnerTabs;

import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext"; // Import MuseumContext
import { useLang } from "../../contexts/LangContext"; // Import Language Context
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import DarkMode Context

const MuseumOwnerTabs = () => {
  const { language } = useLang();
  const { exhibitions } = useMuseumContext();
  const { isDarkMode } = useThemeMode(); // Get dark mode status from context
  const { id } = useParams(); // Get the exhibition ID from the URL params

  const isHebrew = language === "he";
  const translations = {
    en: {
      editExhibition: "Edit Exhibition",
      viewArtworks: "View Artworks",
      addNewArtwork: "Add New Artwork",
      notFound: "Exhibition Not Found",
    },
    he: {
      editExhibition: "ערוך תערוכה",
      viewArtworks: "צפה ביצירות אמנות",
      addNewArtwork: "הוסף יצירת אמנות חדשה",
      notFound: "התערוכה לא נמצאה",
    },
  };

  const t = translations[language];
  
  // Find the current exhibition by ID
  const exhibition = exhibitions.find((exhibit) => exhibit._id === id);

  return (
    <div className={`container mx-auto p-4 ${isDarkMode ? "bg-gray-900 text-white" : " text-gray-900"}`}>
      {/* Display exhibition name as the title */}
      <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        {exhibition ? exhibition.name : t.notFound}
      </h1>

      <div
        className={`flex justify-center px-4 mb-4 space-x-2 ${
          isHebrew ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <NavLink
          to="edit"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? (isDarkMode ? "border-b-2 border-blue-400 text-blue-400" : "border-b-2 border-blue-500 text-blue-500") : (isDarkMode ? "text-gray-300" : "text-gray-500")}`
          }
        >
          {t.editExhibition}
        </NavLink>
        <NavLink
          to="artworks"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? (isDarkMode ? "border-b-2 border-blue-400 text-blue-400" : "border-b-2 border-blue-500 text-blue-500") : (isDarkMode ? "text-gray-300" : "text-gray-500")}`
          }
        >
          {t.viewArtworks}
        </NavLink>
        <NavLink
          to="add-artwork"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? (isDarkMode ? "border-b-2 border-blue-400 text-blue-400" : "border-b-2 border-blue-500 text-blue-500") : (isDarkMode ? "text-gray-300" : "text-gray-500")}`
          }
        >
          {t.addNewArtwork}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MuseumOwnerTabs;
