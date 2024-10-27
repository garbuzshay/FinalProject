// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import { useThemeMode } from '../../contexts/DarkModeContext';
// import { useLang } from '../../contexts/LangContext'; // Import useLang from LangContext

// const MuseumCard = ({ museumId, name, description, imageUrl, location, exhibitions, artworks }) => {
//     const { isDarkMode } = useThemeMode();
//     const { language } = useLang(); // Get the current language from LangContext
//     const isHebrew = language === 'he'; // Check if the language is Hebrew
//     const navigate = useNavigate(); // Initialize useNavigate

//     // Handle card click to navigate to the museum edit page
//     const handleCardClick = () => {
//         navigate(`/admin/museums/edit-museum/${museumId}`);
//     };

//     // Translations for the labels
//     const translations = {
//         en: {
//             location: "Location",
//             exhibitions: "Exhibitions",
//             artworks: "Artworks"
//         },
//         he: {
//             location: "מיקום",
//             exhibitions: "תערוכות",
//             artworks: "יצירות אמנות"
//         }
//     };

//     // Get the appropriate translations based on the current language
//     const t = translations[language];

//     return (
//         <div
//             className={`max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer ${
//                 isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'
//             }`}
//             onClick={handleCardClick} // Attach onClick event to handle navigation
//             dir={isHebrew ? 'rtl' : 'ltr'} // Set text direction based on language
//         >
//             <div className="w-full h-48 overflow-hidden">
//                 <img
//                     className="object-fit w-full h-full"
//                     src={imageUrl}
//                     alt={`${name}`}
//                 />
//             </div>
//             <div className="px-6 py-4">
//                 <div className={`font-bold text-xl mb-2 ${isHebrew ? 'text-right' : ''}`}>{name}</div>
//                 <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} ${isHebrew ? 'text-right' : ''}`}>
//                     {description}
//                 </p>
//                 <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} ${isHebrew ? 'text-right' : ''}`}>
//                     <strong>{t.location}:</strong> {location}
//                 </p>
//                 <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} ${isHebrew ? 'text-right' : ''}`}>
//                     <strong>{t.exhibitions}:</strong> {exhibitions}
//                 </p>
//                 <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} ${isHebrew ? 'text-right' : ''}`}>
//                     <strong>{t.artworks}:</strong> {artworks}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default MuseumCard;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/DarkModeContext';
import { useLang } from '../../contexts/LangContext';

const MuseumCard = ({ museumId, name, description, imageUrl, location, exhibitions, artworks }) => {
    const { isDarkMode } = useThemeMode();
    const { language } = useLang();
    const isHebrew = language === 'he';
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/admin/museums/edit-museum/${museumId}`);
    };

    const translations = {
        en: {
            location: "Location",
            exhibitions: "Exhibitions",
            artworks: "Artworks"
        },
        he: {
            location: "מיקום",
            exhibitions: "תערוכות",
            artworks: "יצירות אמנות"
        }
    };

    const t = translations[language];

    return (
        <div
            className={`w-full sm:w-80  lg:w-96 max-w-full rounded overflow-hidden shadow-lg m-4 cursor-pointer transition-transform duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'
            }`}
            onClick={handleCardClick}
            dir={isHebrew ? 'rtl' : 'ltr'}
        >
            <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <img
                    className="w-full h-full"
                    src={imageUrl}
                    alt={`${name}`}
                />
            </div>
            <div className="px-4 py-4">
                <div className={`font-bold text-xl mb-2 ${isHebrew ? 'text-right' : ''}`}>{name}</div>
                <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} ${isHebrew ? 'text-right' : ''}`}>
                    {description}
                </p>
                <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} ${isHebrew ? 'text-right' : ''}`}>
                    <strong>{t.location}:</strong> {location}
                </p>
                <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} ${isHebrew ? 'text-right' : ''}`}>
                    <strong>{t.exhibitions}:</strong> {exhibitions}
                </p>
                <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} ${isHebrew ? 'text-right' : ''}`}>
                    <strong>{t.artworks}:</strong> {artworks}
                </p>
            </div>
        </div>
    );
};

export default MuseumCard;
