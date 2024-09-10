// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUserContext } from '../../contexts/UserContext';

// const Header = ({ buttonText, buttonPath }) => {
//     const navigate = useNavigate();
//     const [title, setTitle] = useState('');
//     const { user } = useUserContext();

//     useEffect(() => {
//         const getTitle = () => {
//             if (!user || !user.role) return;

//             switch (user.role.roleName) {
//                 case 'Admin':
//                     return 'Admin Dashboard';
//                 case 'MuseumOwner':
//                     return `Hello ${user.name}, Welcome to ${user.museum? user.museum.name : "your museum "} CMS`;
//                 case 'Curator':
//                     // return `Hello ${user.name}, Welcome to the Curator's area in ${user.museum.name} CMS`;
//                     return `Hello ${user.name}, Welcome to the Curator's area CMS`;
//                 default:
//                     return '';
//             }
//         };

//         setTitle(getTitle());
//     }, [user]);

//     const handleButtonClick = () => {
//         navigate(buttonPath);
//     };

//     return (
//         <header className="shadow p-4 flex justify-between items-center">
//             <h1 className="text-xl font-semibold sm:text-lg">{title}</h1>
//             <div className="sm:mt-2">
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded sm:px-3 sm:py-1"
//                     onClick={handleButtonClick}
//                 >
//                     {buttonText}
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUserContext } from '../../contexts/UserContext';
// import { FaSun, FaMoon } from 'react-icons/fa';

// const Header = ({ buttonText, buttonPath }) => {
//     const navigate = useNavigate();
//     const [title, setTitle] = useState('');
//     const { user } = useUserContext();
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     useEffect(() => {
//         const getTitle = () => {
//             if (!user || !user.role) return;

//             switch (user.role.roleName) {
//                 case 'Admin':
//                     return 'Admin Dashboard';
//                 case 'MuseumOwner':
//                     return `Hello ${user.name}, Welcome to ${user.museum ? user.museum.name : "your museum"} CMS`;
//                 case 'Curator':
//                     return `Hello ${user.name}, Welcome to the Curator's area CMS`;
//                 default:
//                     return '';
//             }
//         };

//         setTitle(getTitle());
//     }, [user]);

//     const handleButtonClick = () => {
//         navigate(buttonPath);
//     };

//     const toggleDarkMode = () => {
//         setIsDarkMode(!isDarkMode);
//         document.documentElement.classList.toggle('dark');
//     };

//     return (
//         <header className="shadow p-4 flex justify-between items-center bg-white dark:bg-gray-800 transition-colors duration-300">
//             <h1 className="text-xl font-semibold sm:text-lg text-gray-800 dark:text-gray-200">{title}</h1>
//             <div className="flex items-center space-x-4 sm:mt-2">
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded sm:px-3 sm:py-1 hover:bg-blue-600 transition duration-200"
//                     onClick={handleButtonClick}
//                 >
//                     {buttonText}
//                 </button>
//                 <button
//                     className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
//                     onClick={toggleDarkMode}
//                 >
//                     {isDarkMode ? (
//                         <>
//                             <FaSun  />

//                         </>
//                     ) : (
//                         <>
//                             <FaMoon  />

//                         </>
//                     )}
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDarkMode } from '../../contexts/DarkModeContext';
import {useMuseumContext} from '../../contexts/MuseumContext';

const Header = ({ buttonText, buttonPath }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const { user } = useUserContext();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const {museum} = useMuseumContext();
    console.log(museum)

    useEffect(() => {
        const getTitle = () => {
            if (!user || !user.role) return;

            switch (user.role.roleName) {
                case 'Admin':
                    return 'Admin Dashboard';
                case 'MuseumOwner':
                    return `Hello ${user.name}, Welcome to ${museum ? museum.name  : "your museum"} CMS`;
                case 'Curator':
                    return `Hello ${user.name}, Welcome to the Curator's area CMS`;
                default:
                    return '';
            }
        };

        setTitle(getTitle());
    }, [user]);

    const handleButtonClick = () => {
        navigate(buttonPath);
    };

    return (
        <header className="shadow p-4 flex justify-between items-center bg-white dark:bg-gray-800 transition-colors duration-300">
            <h1 className="text-xl font-semibold sm:text-lg text-gray-800 dark:text-gray-200">{title}</h1>
            <div className="flex items-center space-x-4 sm:mt-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded sm:px-3 sm:py-1 hover:bg-blue-600 transition duration-200"
                    onClick={handleButtonClick}
                >
                    {buttonText}
                </button>
                <button
                    className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
                    onClick={toggleDarkMode}
                >
                    {isDarkMode ? (
                        <>
                            <FaSun />
                        </>
                    ) : (
                        <>
                            <FaMoon />
                        </>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
