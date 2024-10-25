// import React from "react";
// import Header from "../common/Header";
// import { useLang } from "../../contexts/LangContext"; // Import useLang from LangContext

// const CuratorHeader = () => {
//   const { language } = useLang(); // Get the current language from LangContext

//   // Translations for the button text
//   const translations = {
//     en: {
//       logout: "Logout",
//     },
//     he: {
//       logout: "התנתק",
//     },
//   };

//   // Get the appropriate translation based on the current language
//   const t = translations[language];

//   return (
//     <div>
//       <Header
//         buttonText={t.logout} // Use the translated text for "Logout"
//         buttonPath="/logout"
//       />
//     </div>
//   );
// };

// export default CuratorHeader;


import React from 'react';
import Header from '../common/Header';
import { useLang } from '../../contexts/LangContext';
import sideBarData from "../../data/sideBarData"; // Import sideBarData for links

const CuratorHeader = () => {
    const { language } = useLang();
    
    // Load links for the Curator role based on the current language
    const links = sideBarData.Curator[language] || [];

    return (
        <div>
            <Header links={links} />
        </div>
    );
};

export default CuratorHeader;
