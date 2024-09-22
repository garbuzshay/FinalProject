// // Frontend/src/components/common/LanguageSwitcher.js
// import React from 'react';
// import { useLang } from '../../contexts/LangContext';

// const LanguageSwitcher = () => {
//     const { language, changeLanguage } = useLang();

//     return (
//         <div className="flex items-center space-x-2">
//             <button
//                 onClick={() => changeLanguage('en')}
//                 className={`${
//                     language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
//                 } px-4 py-2 rounded sm:px-3 sm:py-1 hover:bg-blue-600 dark:hover:bg-gray-600 transition duration-200`}
//             >
//                 English
//             </button>
//             <button
//                 onClick={() => changeLanguage('he')}
//                 className={`${
//                     language === 'he' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
//                 } px-4 py-2 rounded sm:px-3 sm:py-1 hover:bg-blue-600 dark:hover:bg-gray-600 transition duration-200`}
//             >
//                 Hebrew
//             </button>
//         </div>
//     );
// };

// export default LanguageSwitcher;


import React from 'react';
import { useLang } from '../../contexts/LangContext';

const LanguageSwitcher = () => {
    const { language, changeLanguage } = useLang();

    const handleLanguageChange = (event) => {
        changeLanguage(event.target.value);
    };

    return (
        <div className="flex items-center px-2">
            {/* <label htmlFor="language-select" className="mr-2 text-gray-800 dark:text-gray-200">
                Language:
            </label> */}
            <select
                id="language-select"
                value={language}
                onChange={handleLanguageChange}
                className="bg-gray-200 text-gray-800 mx-2 py-2 sm:py-1 rounded dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
            >
                <option value="en">English</option>
                <option value="he">עברית</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
