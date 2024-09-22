// import React from "react";
// import ExhibitCard from "../common/ExhibitCard"; // Adjust the path as needed
// import { useMuseumContext } from "../../contexts/MuseumContext"; // Adjust the path as needed

// const CuratorExhibitionsList = () => {
//   // const { exhibitions, loading } = useExhibitions();
//   const { exhibitions, loading } = useMuseumContext(); // Adjust the hook as needed
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-2">Manage your exhibitions</h1>
//       <p className="text-md mb-6">
//         To view or edit an exhibition, simply click on the tab and start
//         exploring.
//       </p>
//       <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mr-6 gap-4">
//         {exhibitions.map((exhibition) => (
//           <ExhibitCard
//             key={exhibition._id}
//             id={exhibition._id}
//             name={exhibition.name}
//             description={exhibition.description}
//             location={exhibition.museum.name} // Assuming museum is an object with a name field
//             imageUrl={exhibition.imageUrl || "https://via.placeholder.com/150"}
//             artworks={exhibition.artworks
//               .map((artwork) => artwork.title)
//               .join(", ")} // Assuming artworks is an array of objects with a title field
//             curators={exhibition.curators
//               .map((curator) => curator.name)
//               .join(", ")}
//             status={exhibition.status}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CuratorExhibitionsList;
import React from "react";
import ExhibitCard from "../common/ExhibitCard"; // Adjust the path as needed
import { useMuseumContext } from "../../contexts/MuseumContext"; // Adjust the path as needed
import { useLang } from "../../contexts/LangContext"; // Import Language Context
import { useThemeMode } from "../../contexts/DarkModeContext"; // Import Theme Context

const CuratorExhibitionsList = () => {
  const { exhibitions, loading } = useMuseumContext(); // Adjust the hook as needed
  const { language } = useLang(); // Get the current language from context
  const { isDarkMode } = useThemeMode(); // Get dark mode status

  const isHebrew = language === "he"; // Check if the language is Hebrew

  const translations = {
    en: {
      manageExhibitions: "Manage your exhibitions",
      viewEditExhibition: "To view or edit an exhibition, simply click on the tab and start exploring.",
      loading: "Loading...",
    },
    he: {
      manageExhibitions: "נהל את התערוכות שלך",
      viewEditExhibition: "כדי להציג או לערוך תערוכה, פשוט לחץ על הלשונית והתחל לחקור.",
      loading: "טוען...",
    },
  };

  const t = translations[language]; // Get translation based on language

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-semibold">{t.loading}</h1>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto p-4 ${
        isHebrew ? "text-right" : "text-left"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-2 text-center ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {t.manageExhibitions}
      </h1>
      <p
        className={`text-md mb-6 text-center ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {t.viewEditExhibition}
      </p>
      <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mr-6 gap-4">
        {exhibitions.map((exhibition) => (
          <ExhibitCard
            key={exhibition._id}
            id={exhibition._id}
            name={exhibition.name}
            description={exhibition.description}
            location={exhibition.museum.name} // Assuming museum is an object with a name field
            imageUrl={exhibition.imageUrl || "https://via.placeholder.com/150"}
            artworks={exhibition.artworks
              .map((artwork) => artwork.title)
              .join(", ")} // Assuming artworks is an array of objects with a title field
            curators={exhibition.curators
              .map((curator) => curator.name)
              .join(", ")}
            status={exhibition.status}
          />
        ))}
      </div>
    </div>
  );
};

export default CuratorExhibitionsList;
