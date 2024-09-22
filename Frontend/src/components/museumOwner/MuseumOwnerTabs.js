// // Frontend\src\components\museumOwner\MuseumOwnerTabs.js
// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";

// const MuseumOwnerTabs = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex border-b mb-4">
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
//           Edit Exhibition
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
//           View Artworks
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
//           Add New Artwork
//         </NavLink>
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// export default MuseumOwnerTabs;
// Frontend\src\components\museumOwner\MuseumOwnerTabs.js
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLang } from "../../contexts/LangContext"; // Import Language Context

const MuseumOwnerTabs = () => {
  const { language } = useLang(); // Get the current language from LangContext
  const isHebrew = language === "he"; // Check if the language is Hebrew

  // Translations for the tab labels
  const translations = {
    en: {
      editExhibition: "Edit Exhibition",
      viewArtworks: "View Artworks",
      addNewArtwork: "Add New Artwork",
    },
    he: {
      editExhibition: "ערוך תערוכה",
      viewArtworks: "צפה ביצירות אמנות",
      addNewArtwork: "הוסף יצירת אמנות חדשה",
    },
  };

  // Get the correct translation based on the current language
  const t = translations[language];

  return (
    <div className="container mx-auto p-4">
      {/* Apply 'flex-row-reverse' class if the language is Hebrew */}
      <div className={`flex border-b mb-4 ${isHebrew ? "flex-row-reverse" : ""}`}>
        <NavLink
          to="edit"
          className={({ isActive }) =>
            `px-4 py-2 ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`
          }
        >
          {t.editExhibition} {/* Display translated "Edit Exhibition" */}
        </NavLink>
        <NavLink
          to="artworks"
          className={({ isActive }) =>
            `px-4 py-2 ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`
          }
        >
          {t.viewArtworks} {/* Display translated "View Artworks" */}
        </NavLink>
        <NavLink
          to="add-artwork"
          className={({ isActive }) =>
            `px-4 py-2 ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`
          }
        >
          {t.addNewArtwork} {/* Display translated "Add New Artwork" */}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MuseumOwnerTabs;
