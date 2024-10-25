// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// import { useLang } from "../../contexts/LangContext";

// const Sidebar = ({ links }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { isDarkMode } = useThemeMode();
//   const { language } = useLang();
//   const isHebrew = language === "he";

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('keydown', handleEscape);
//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, []);

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={toggleSidebar}
//       ></div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 ${
//           isHebrew ? "right-0" : "left-0"
//         } z-50 h-full w-64 transition-transform duration-300 ease-in-out transform ${
//           isOpen
//             ? "translate-x-0"
//             : isHebrew
//             ? "translate-x-full"
//             : "-translate-x-full"
//         } ${
//           isDarkMode
//             ? "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300"
//             : "bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800"
//         }`}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           {/* Close Button */}
//           <button
//             onClick={toggleSidebar}
//             className={`absolute top-4 ${
//               isHebrew ? "left-4" : "right-4"
//             } text-2xl hover:text-red-400 transition-colors duration-300`}
//             aria-label="Close sidebar"
//           >
//             ✕
//           </button>

//           {/* Sidebar Links */}
//           {links && links.length > 0 && (
//             <>
//               <h2
//                 className={`text-2xl font-poppins font-bold mb-8 sm:text-xl border-b border-gray-600 pb-4 ${
//                   isHebrew ? "text-right" : "text-left"
//                 }`}
//               >
//                 <Link to={links[0].path}>{links[0].name}</Link>
//               </h2>
//               <nav>
//                 <ul
//                   className={`space-y-6 ${
//                     isHebrew ? "text-right" : "text-left"
//                   }`}
//                 >
//                   {links.slice(1).map((link, index) => (
//                     <li key={index}>
//                       <Link
//                         to={link.path}
//                         className={`block text-lg font-medium font-poppins px-4 py-2 rounded-lg transition-colors duration-300 ${
//                           isDarkMode
//                             ? "hover:bg-gray-700 hover:text-gray-300"
//                             : "hover:bg-gray-300 hover:text-gray-800"
//                         }`}
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Toggle Button */}
//       {!isOpen && (
//   <button
//     onClick={toggleSidebar}
//     className={`fixed z-50 top-1/2 transform -translate-y-1/2 ${
//       isHebrew ? "right-0" : "left-0"
//     } bg-gray-800 text-white p-2 ${
//       isHebrew ? "rounded-l-md" : "rounded-r-md"
//     } shadow-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
//     aria-label="Toggle sidebar"
//   >
//     <svg
//       className="w-6 h-6"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M4 6h16M4 12h16M4 18h16"
//       />
//     </svg>
//   </button>
// )}
//     </>
//   );
// };

// export default Sidebar;

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// import { useLang } from "../../contexts/LangContext";

// const Sidebar = ({ links, isOpen, toggleSidebar }) => {
//   const { isDarkMode } = useThemeMode();
//   const { language } = useLang();
//   const isHebrew = language === "he";

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         toggleSidebar();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [toggleSidebar]);

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={toggleSidebar}
//       ></div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 ${
//           isHebrew ? "right-0" : "left-0"
//         } z-50 h-full w-64 transition-transform duration-300 ease-in-out transform ${
//           isOpen
//             ? "translate-x-0"
//             : isHebrew
//             ? "translate-x-full"
//             : "-translate-x-full"
//         } ${
//           isDarkMode
//             ? "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300"
//             : "bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800"
//         }`}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           {/* Close Button */}
//           <button
//             onClick={toggleSidebar}
//             className={`absolute top-4 ${
//               isHebrew ? "left-4" : "right-4"
//             } text-2xl hover:text-red-400 transition-colors duration-300`}
//             aria-label="Close sidebar"
//           >
//             ✕
//           </button>

//           {/* Sidebar Links */}
//           {links && links.length > 0 && (
//             <nav>
//               <ul
//                 className={`space-y-6 ${
//                   isHebrew ? "text-right" : "text-left"
//                 }`}
//               >
//                 {links.map((link, index) => (
//                   <li key={index}>
//                     <Link
//                       to={link.path}
//                       className={`block text-lg font-medium font-poppins px-4 py-2 rounded-lg transition-colors duration-300 ${
//                         isDarkMode
//                           ? "hover:bg-gray-700 hover:text-gray-300"
//                           : "hover:bg-gray-300 hover:text-gray-800"
//                       }`}
//                       onClick={toggleSidebar}
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Sidebar = ({ links, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const { language, changeLanguage } = useLang();
  const isHebrew = language === "he";

  const handleLogout = () => {
    navigate("/logout");
    toggleSidebar();
  };

  const toggleLanguage = () => {
    changeLanguage(isHebrew ? "en" : "he");
  };

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    toggleSidebar();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        toggleSidebar();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [toggleSidebar]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed top-0 ${
          isHebrew ? "right-0" : "left-0"
        } z-50 h-screen w-72 transition-transform duration-300 ease-in-out transform ${
          isOpen
            ? "translate-x-0"
            : isHebrew
            ? "translate-x-full"
            : "-translate-x-full"
        } ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
            : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-800"
        }`}
      >
        <div className="relative h-full">
          <button
            onClick={toggleSidebar}
            className={`absolute top-4 ${
              isHebrew ? "right-4" : "left-4"
            } w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-red-500 text-gray-300 hover:text-white"
                : "bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white"
            }`}
            aria-label="Close sidebar"
          >
            <span className="text-lg">✕</span>
          </button>

          <div className="p-8 h-full overflow-y-auto flex flex-col justify-between">
            <div className="mt-8">
              {links && links.length > 0 && (
                <nav>
                  <ul className={`space-y-2 ${isHebrew ? "text-right" : "text-left"}`}>
                    {links.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className={`block text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                            isDarkMode
                              ? "hover:bg-gray-700/50 hover:translate-x-2"
                              : "hover:bg-gray-200/50 hover:translate-x-2"
                          }`}
                          onClick={toggleSidebar}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            <div className="pt-6 space-y-3 border-t border-gray-700/30">
              <button
                onClick={toggleLanguage}
                className={`flex items-center justify-center w-full text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-700/50 active:bg-gray-600"
                    : "hover:bg-gray-200/50 active:bg-gray-300"
                }`}
              >
                {isHebrew ? "English" : "עברית"}
              </button>

              <button
                onClick={handleToggleDarkMode}
                className={`flex items-center justify-center w-full text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-700/50 active:bg-gray-600"
                    : "hover:bg-gray-200/50 active:bg-gray-300"
                }`}
              >
                {isDarkMode ? (
                  <FaSun className="mr-2 text-yellow-400" />
                ) : (
                  <FaMoon className="mr-2 text-gray-600" />
                )}
                {isDarkMode
                  ? isHebrew ? "מצב בהיר" : "Light Mode"
                  : isHebrew ? "מצב כהה" : "Dark Mode"}
              </button>

              <button
                onClick={handleLogout}
                className={`flex items-center justify-center w-full text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 active:bg-red-500/30"
                    : "bg-red-500/10 text-red-600 hover:bg-red-500/20 active:bg-red-500/30"
                }`}
              >
                {isHebrew ? "התנתק" : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;