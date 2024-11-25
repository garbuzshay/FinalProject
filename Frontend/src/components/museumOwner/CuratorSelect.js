// import React, { useState } from 'react';
// import { useMuseumContext } from '../../contexts/MuseumContext';
// import { useThemeMode } from '../../contexts/DarkModeContext'; // Import Theme Context

// const CuratorSelect = ({ onCuratorsSelect }) => {
//   const { museum, loading } = useMuseumContext();
//   const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
//   const exhibitions = museum?.exhibitions;
//   const [selectedCurators, setSelectedCurators] = useState([]);

//   if (loading) {
//     return (
//       <div className={`text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//         Loading...
//       </div>
//     );
//   }

//   const curatorsMap = new Map();

//   exhibitions?.forEach((exhibition) => {
//     exhibition.curators.forEach((curator) => {
//       if (!curatorsMap.has(curator._id)) {
//         curatorsMap.set(curator._id, {
//           ...curator,
//           exhibitions: [],
//         });
//       }
//       curatorsMap.get(curator._id).exhibitions.push(exhibition.name);
//     });
//   });

//   const curators = Array.from(curatorsMap.values());

//   const handleSelect = (curatorId) => {
//     setSelectedCurators((prevSelected) => {
//       if (prevSelected.includes(curatorId)) {
//         return prevSelected.filter((id) => id !== curatorId);
//       } else {
//         return [...prevSelected, curatorId];
//       }
//     });
//   };

//   const handleSubmit = () => {
//     const selectedCuratorsData = curators.filter((curator) =>
//       selectedCurators.includes(curator._id)
//     );
//     onCuratorsSelect(selectedCuratorsData);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//         Select Curators
//       </h1>
//       <div className="mb-4">
//         {curators.map((curator) => (
//           <div key={curator._id} className="flex items-center mb-2">
//             <input
//               type="checkbox"
//               id={curator._id}
//               checked={selectedCurators.includes(curator._id)}
//               onChange={() => handleSelect(curator._id)}
//               className="mr-2"
//             />
//             <label
//               htmlFor={curator._id}
//               className={`cursor-pointer ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
//             >
//               {`${curator.name} ${curator.lastName}`}
//             </label>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handleSubmit}
//         className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//           isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
//         } transition-colors duration-300`}
//       >
//         Click to Add Selected Curators or Close tab
//       </button>
//     </div>
//   );
// };

// export default CuratorSelect;


import React, { useState } from 'react';
import { useMuseumContext } from '../../contexts/MuseumContext';
import { useThemeMode } from '../../contexts/DarkModeContext'; // Import Theme Context
import { useLang } from '../../contexts/LangContext'; // Import LangContext

const CuratorSelect = ({ onCuratorsSelect }) => {
  const { museum, loading } = useMuseumContext();
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode
  const { language } = useLang(); // Destructure language from LangContext
  const exhibitions = museum?.exhibitions;
  const [selectedCurators, setSelectedCurators] = useState([]);

  const isHebrew = language === "he"; // Check if the current language is Hebrew

  const translations = {
    en: {
      selectCurators: "Select Curators",
      clickToAdd: "Click to Add Selected Curators or Close tab",
      loading: "Loading...",
    },
    he: {
      selectCurators: "בחר אוצרים",
      clickToAdd: "לחץ להוספת האוצרים הנבחרים או סגור את הלשונית",
      loading: "טוען...",
    },
  };

  const t = translations[language]; // Set the appropriate translation based on language

  if (loading) {
    return (
      <div className={`text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        {t.loading}
      </div>
    );
  }

  const curatorsMap = new Map();

  exhibitions?.forEach((exhibition) => {
    exhibition.curators.forEach((curator) => {
      if (!curatorsMap.has(curator._id)) {
        curatorsMap.set(curator._id, {
          ...curator,
          exhibitions: [],
        });
      }
      curatorsMap.get(curator._id).exhibitions.push(exhibition.name);
    });
  });

  const curators = Array.from(curatorsMap.values());

  const handleSelect = (curatorId) => {
    setSelectedCurators((prevSelected) => {
      if (prevSelected.includes(curatorId)) {
        return prevSelected.filter((id) => id !== curatorId);
      } else {
        return [...prevSelected, curatorId];
      }
    });
  };

  const handleSubmit = () => {
    const selectedCuratorsData = curators.filter((curator) =>
      selectedCurators.includes(curator._id)
    );
    onCuratorsSelect(selectedCuratorsData);
  };

  return (
    <div className={`container mx-auto p-4 ${isHebrew ? "rtl" : "ltr"}`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"} ${isHebrew ? "text-right" : ""}`}>
        {t.selectCurators}
      </h1>
      <div className="mb-4">
        {curators.map((curator) => (
          <div key={curator._id} className={`flex items-center mb-2 ${isHebrew ? "text-right" : ""}`}>
            <input
              type="checkbox"
              id={curator._id}
              checked={selectedCurators.includes(curator._id)}
              onChange={() => handleSelect(curator._id)}
              className="mx-2"
            />
            <label
              htmlFor={curator._id}
              className={`cursor-pointer ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {`${curator.name} ${curator.lastName}`}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          isDarkMode ? "bg-blue-600 hover:bg-blue-800" : ""
        } transition-colors duration-300`}
      >
        {t.clickToAdd}
      </button>
    </div>
  );
};

export default CuratorSelect;
