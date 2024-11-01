import React, { useState } from "react";
import ExhibitCard from "../common/ExhibitCard";
import { useMuseumContext } from "../../contexts/MuseumContext";
import { useLang } from "../../contexts/LangContext";
import { useThemeMode } from "../../contexts/DarkModeContext";

const CuratorExhibitionsList = () => {
  const { exhibitions, loading } = useMuseumContext();
  const { language } = useLang();
  const { isDarkMode } = useThemeMode();
  const [searchTerm, setSearchTerm] = useState("");

  const isHebrew = language === "he";
  const translations = {
    en: {
      manageExhibitions: "Manage your exhibitions",
      viewEditExhibition: "To view or edit an exhibition, simply click on the tab and start exploring.",
      loading: "Loading...",
      searchPlaceholder: "Search by museum, exhibition, or artwork name...",
      noResults: "No exhibitions found",
    },
    he: {
      manageExhibitions: "נהל את התערוכות שלך",
      viewEditExhibition: "כדי להציג או לערוך תערוכה, פשוט לחץ על הלשונית והתחל לחקור.",
      loading: "טוען...",
      searchPlaceholder: "חפש לפי מוזיאון, תערוכה או שם יצירה...",
      noResults: "לא נמצאו תערוכות",
    },
  };

  const t = translations[language];

  const filteredExhibitions = exhibitions.filter((exhibition) =>
    exhibition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exhibition.museum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exhibition.artworks.some((artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
      }`}>
        <h1 className="text-2xl font-semibold">{t.loading}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Fixed header section */}
      <div className={`sticky   pb-4 
      }`}>
        <div className="container mx-auto pt-8 px-4">
          <h1 className={`text-4xl font-poppins font-bold tracking-wide mb-2 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            {t.manageExhibitions}
          </h1>
          <p className={`text-md text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`} dir={isHebrew ? "rtl" : "ltr"}>
            {t.viewEditExhibition}
          </p>
          
          {/* Search Bar */}
          <div className="flex justify-center my-4" dir={isHebrew ? "rtl" : "ltr"}>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full max-w-lg p-3 rounded-lg shadow-md focus:outline-none ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Content section with minimum height */}
      <div className="container mx-auto px-4" dir={isHebrew ? "rtl" : "ltr"}>  
        <div className="min-h-[50vh]">
          {filteredExhibitions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredExhibitions.map((exhibition) => (
                <ExhibitCard
                  key={exhibition._id}
                  id={exhibition._id}
                  name={exhibition.name}
                  description={exhibition.description}
                  location={exhibition.museum.name}
                  imageUrl={exhibition.imageUrl || "https://via.placeholder.com/150"}
                  artworks={exhibition.artworks
                    .map((artwork) => artwork.title)
                    .join(", ")}
                  curators={exhibition.curators
                    .map((curator) => curator.name)
                    .join(", ")}
                  status={exhibition.status}
                />
              ))}
            </div>
          ) : (
            <div className={`flex justify-center items-center h-[50vh] ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              <p className="text-xl">{t.noResults}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CuratorExhibitionsList;