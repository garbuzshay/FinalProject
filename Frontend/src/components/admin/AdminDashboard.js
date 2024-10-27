// import React, { useEffect, useState } from 'react';
// import MuseumCard from '../common/MuseumCard';
// import ExhibitCard from '../common/ExhibitCard';
// import { useAdminContext } from '../../contexts/AdminContext';
// import { useThemeMode } from '../../contexts/DarkModeContext';
// import { useLang } from '../../contexts/LangContext'; // Import Language context

// const getRandomExhibitions = (exhibitions, count) => {
//   const shuffled = [...exhibitions].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// };

// const AdminDashboard = () => {
//   const { isDarkMode } = useThemeMode();
//   const { museumsData, exhibitionsData } = useAdminContext();
//   const { museums, isLoading: isLoadingMuseums, error: errorMuseums } = museumsData;
//   const { exhibitions, isLoading: isLoadingExhibitions, error: errorExhibitions } = exhibitionsData;
//   const { language } = useLang(); // Get current language from LangContext
//   const isHebrew = language === 'he'; // Check if the language is Hebrew

//   const [randomExhibitions, setRandomExhibitions] = useState([]);

//   useEffect(() => {
//     if (exhibitions && exhibitions.length > 0) {
//       setRandomExhibitions(getRandomExhibitions(exhibitions, 4));
//     }
//   }, [exhibitions]);

//   const openMuseums = museums.filter(museum => museum.status !== 'closed');

//   if (isLoadingMuseums || isLoadingExhibitions) return <div>Loading...</div>;
//   if (errorMuseums) return <div style={{ color: 'red' }}>{errorMuseums}</div>;
//   if (errorExhibitions) return <div style={{ color: 'red' }}>{errorExhibitions}</div>;

//   return (
//     <div className="p-4">
//       {/* Adjusting text based on the selected language */}
//       <p className={`mt-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
//         {isHebrew ? 'המוזיאונים המבוקרים ביותר' : 'The most visited museums'}
//       </p>
//       <div className="flex flex-wrap justify-center">
//         {openMuseums.map((museum) => (
//           <MuseumCard
//             key={museum._id}
//             museumId={museum._id} // Pass the museum's ID to MuseumCard
//             name={museum.name}
//             description={museum.description}
//             imageUrl={museum.imageUrl}
//             location={`${museum.address}, ${museum.city}, ${museum.state}`}
//             exhibitions={museum.exhibitions.length}
//              artworks={exhibit.artworks.length}
//           />
//         ))}
//       </div>

//       <p className={`mt-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
//         {isHebrew ? 'התערוכות המבוקרות ביותר' : 'The most visited exhibitions'}
//       </p>
//       <div className="flex flex-wrap justify-center">
//         {randomExhibitions.map((exhibit) => (
//           <ExhibitCard
//             key={exhibit._id}
//             id={exhibit._id}
//             name={exhibit.name}
//             description={exhibit.description}
//             imageUrl={exhibit.imageUrl}
//             location={exhibit.museum ? exhibit.museum.name : 'Unknown'}
//             artworks={exhibit.artworks.length}
//             curators={exhibit.curators.length}
//             status={exhibit.status}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import MuseumCard from '../common/MuseumCard';
import ExhibitCard from '../common/ExhibitCard';
import { useAdminContext } from '../../contexts/AdminContext';
import { useThemeMode } from '../../contexts/DarkModeContext';
import { useLang } from '../../contexts/LangContext'; // Import Language context

const getRandomExhibitions = (exhibitions, count) => {
  const shuffled = [...exhibitions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const AdminDashboard = () => {
  const { isDarkMode } = useThemeMode();
  const { museumsData, exhibitionsData } = useAdminContext();
  const { museums, isLoading: isLoadingMuseums, error: errorMuseums } = museumsData;
  const { exhibitions, isLoading: isLoadingExhibitions, error: errorExhibitions } = exhibitionsData;
  const { language } = useLang(); // Get current language from LangContext
  const isHebrew = language === 'he'; // Check if the language is Hebrew

  const [randomExhibitions, setRandomExhibitions] = useState([]);

  useEffect(() => {
    if (exhibitions && exhibitions.length > 0) {
      setRandomExhibitions(getRandomExhibitions(exhibitions, 4));
    }
  }, [exhibitions]);

  const openMuseums = museums.filter(museum => museum.status !== 'closed');

  const getTotalArtworks = (museum) => {
    // Sum the artworks across all exhibitions in this museum
    return museum.exhibitions.reduce((total, exhibition) => {
      return total + (exhibition.artworks ? exhibition.artworks.length : 0);
    }, 0);
  };

  if (isLoadingMuseums || isLoadingExhibitions) return <div>Loading...</div>;
  if (errorMuseums) return <div style={{ color: 'red' }}>{errorMuseums}</div>;
  if (errorExhibitions) return <div style={{ color: 'red' }}>{errorExhibitions}</div>;

  return (
    <div className="p-4" >
      {/* Adjusting text based on the selected language */}
      <p className={`mt-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
        {isHebrew ? 'המוזיאונים המבוקרים ביותר' : 'The most visited museums'}
      </p>
      <div className="flex flex-wrap justify-center">
        {openMuseums.map((museum) => (
          <MuseumCard
            key={museum._id}
            museumId={museum._id} // Pass the museum's ID to MuseumCard
            name={museum.name}
            description={museum.description}
            imageUrl={museum.imageUrl}
            location={`${museum.address}, ${museum.city}, ${museum.state}`}
            exhibitions={museum.exhibitions.length}
            artworks={getTotalArtworks(museum)} // Calculate the total number of artworks for this museum
          />
        ))}
      </div>

      <p className={`mt-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
        {isHebrew ? 'התערוכות המבוקרות ביותר' : 'The most visited exhibitions'}
      </p>
      <div className="flex flex-wrap justify-center">
        {randomExhibitions.map((exhibit) => (
          <ExhibitCard
            key={exhibit._id}
            id={exhibit._id}
            name={exhibit.name}
            description={exhibit.description}
            imageUrl={exhibit.imageUrl}
            location={exhibit.museum ? exhibit.museum.name : 'Unknown'}
            artworks={exhibit.artworks.length} // Directly pass artworks length for each exhibit
            curators={exhibit.curators.length}
            status={exhibit.status}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
