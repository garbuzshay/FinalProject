// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useThemeMode } from "../../contexts/DarkModeContext";

// const ArtworkCard = ({
//   id,
//   title,
//   description,
//   createdDateByArtist,
//   artist,
//   imageUrl,
//   clickable = true, // Add a clickable prop with a default value of true
// }) => {
//   const navigate = useNavigate();
//   const { isDarkMode } = useThemeMode();

//   const handleCardClick = () => {
//     if (clickable) {
//       navigate(`${id}`);
//     }
//   };

//   return (
//     <div
//       className={`max-w-sm w-full rounded overflow-hidden shadow-lg  ${
//         clickable ? "cursor-pointer transform transition duration-500 hover:scale-105" : ""
//       } ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-900"}`}
//       onClick={handleCardClick} // This will only work if clickable is true
//     >
//       <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
//         <img
//           className="w-full h-full object-cover "
//           src={imageUrl}
//           alt={`${title}`}
//         />
//       </div>
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{title}</div>
//         <p className={`text-base mb-2 ${isDarkMode ? "text-white-200" : "text-gray-700"}`}>
//           {description}
//         </p>
//         <p className={`text-base mb-2 ${isDarkMode ? "text-white-200" : "text-gray-700"}`}>
//           <strong>Created Date:</strong>{" "}
//           {new Date(createdDateByArtist).toLocaleDateString()}
//         </p>
//         <p className={`text-base ${isDarkMode ? "text-white-200" : "text-gray-700"}`}>
//           <strong>Artist:</strong> {artist}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ArtworkCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext"; // Import Language Context

const ArtworkCard = ({
  id,
  title,
  description,
  createdDateByArtist,
  artist,
  imageUrl,
  clickable = true, // Add a clickable prop with a default value of true
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeMode();
  const { language } = useLang(); // Get current language from context
  const isHebrew = language === "he"; // Check if language is Hebrew

  const handleCardClick = () => {
    if (clickable) {
      navigate(`${id}`);
    }
  };

  return (
    <div
      className={`max-w-sm w-full rounded overflow-hidden shadow-lg ${
        clickable
          ? "cursor-pointer transform transition duration-500 hover:scale-105"
          : ""
      } ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-900"
      }`}
      onClick={handleCardClick} // This will only work if clickable is true
      dir={isHebrew ? "rtl" : "ltr"} // Apply RTL direction if Hebrew
    >
      <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={`${title}`}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}
        <p
          className={`text-base ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <strong>{isHebrew ? "אמן:" : "Artist:"}</strong> {artist}
        </p>
        <p
          className={`text-sm mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <strong>{isHebrew ? "תאריך יצירה:" : "Created Date:"}</strong>{" "}
          {new Date(createdDateByArtist).toLocaleDateString()}
        </p>
        </div>
        <p
          className={`text-base mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3, // Limits to 3 lines
          }}
        >
          {description}
        </p>


      </div>
    </div>
  );
};

export default ArtworkCard;
