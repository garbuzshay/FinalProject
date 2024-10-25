// import React, { useEffect, useState } from 'react';
// import Header from '../common/Header';
// import { useLang } from '../../contexts/LangContext'; // Import Language context

// const MuseumOwnerHeader = () => {
//     const { language } = useLang(); // Get current language from context
//     const isHebrew = language === 'he'; // Check if the language is Hebrew
//     const [title, setTitle] = useState('');

//     // Dynamically update the title based on the language
//     useEffect(() => {
//         setTitle(isHebrew ? 'ברוך הבא לאזור הבעלים' : 'Welcome to the Owner Area');
//     }, [language, isHebrew]); 

//     return (
//         <div>
//             {/* Pass the title and language-based button text to the Header component */}
//             <Header 
//                 title={title} 
//                 buttonText={isHebrew ? 'התנתק' : 'LOGOUT'} 
//                 buttonPath="/logout"
//             />
//         </div>
//     );
// };

// export default MuseumOwnerHeader;

import React from 'react';
import Header from '../common/Header';
import { useLang } from '../../contexts/LangContext';
import sideBarData from "../../data/sideBarData";

const MuseumOwnerHeader = () => {
    const { language } = useLang();

    // Load links for the Museum Owner role based on the current language
    const links = sideBarData.MuseumOwner[language] || [];

    return (
        <div>
            <Header links={links} />
        </div>
    );
};

export default MuseumOwnerHeader;
