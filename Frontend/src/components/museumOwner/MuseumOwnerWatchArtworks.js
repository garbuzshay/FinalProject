import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMuseumContext } from "../../contexts/MuseumContext";
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Theme Context
import { useLang } from "../../contexts/LangContext"; // Import LangContext for translations
import ArtworkCard from "../common/ArtworkCard";
import MuseumOwnerCreateArtwork from "./MuseumOwnerCreateArtwork";
import GoBackButton from "../common/GoBackButton";

const MuseumOwnerWatchArtworks = () => {
  const { id } = useParams();
  const { exhibitions, isLoading, error } = useMuseumContext();
  const [isCreatingArtwork, setIsCreatingArtwork] = useState(false);
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
  const { language } = useLang(); // Get the current language from LangContext
  const isHebrew = language === "he"; // Check if the language is Hebrew
  // Translation object
  const translations = {
    en: {
      loading: "Loading...",
      error: "Error",
      notFound: "Exhibition not found",
      artworksTitle: "Artworks",
      clickToEdit: "In order to edit artwork, please click on the image",
      closeButton: "Close",
    },
    he: {
      loading: "טוען...",
      error: "שגיאה",
      notFound: "התערוכה לא נמצאה",
      artworksTitle: "יצירות אמנות",
      clickToEdit: "כדי לערוך יצירת אמנות, לחץ על התמונה",
      closeButton: "סגור",
    },
  };

  const t = translations[language]; // Get the current translation based on the selected language

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <p className="text-2xl font-semibold">{t.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-red-500" : "bg-white text-red-500"
        }`}
      >
        <p className="text-2xl font-semibold">
          {t.error}: {error}
        </p>
      </div>
    );
  }

  const exhibition = exhibitions.find((exhibition) => exhibition._id === id);

  if (!exhibition) {
    return (
      <div>
        <p className="text-2xl font-semibold">{t.notFound}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p
          className={`text-md ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {t.clickToEdit}
        </p>
      </div>
      <div
        className={`grid px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 ${
          isHebrew ? "text-right" : "text-left"
        }`}
        dir={isHebrew ? "rtl" : "ltr"}
      >
        {exhibition.artworks.map((artwork) => (
          <ArtworkCard
            key={artwork._id}
            id={artwork._id}
            title={artwork.title}
            description={artwork.description}
            createdDateByArtist={artwork.createdDateByArtist}
            artist={artwork.artist}
            imageUrl={artwork.imageUrl || "https://via.placeholder.com/150"}
            isDarkMode={isDarkMode} // Pass isDarkMode as a prop if needed
          />
        ))}
      </div>
      {isCreatingArtwork && (
        <div
          className={`mt-4 p-4 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } transition-colors duration-300`}
        >
          <MuseumOwnerCreateArtwork exhibitionId={exhibition._id} />
          <button
            onClick={() => setIsCreatingArtwork(false)}
            className={`mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isDarkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-700"
            } transition-colors duration-300`}
          >
            {t.closeButton}
          </button>
        </div>
      )}
      <div className="mt-6">
        <GoBackButton
          customPath={"/owner/exhibitions"}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default MuseumOwnerWatchArtworks;
