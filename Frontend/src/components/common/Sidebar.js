
// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// import { useLang } from "../../contexts/LangContext";
// import { FaSun, FaMoon } from "react-icons/fa";

// const Sidebar = ({ links, isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const { isDarkMode, toggleDarkMode } = useThemeMode();
//   const { language, changeLanguage } = useLang();
//   const isHebrew = language === "he";

//   const handleLogout = () => {
//     navigate("/logout");
//     toggleSidebar();
//   };

//   const toggleLanguage = () => {
//     changeLanguage(isHebrew ? "en" : "he");
//   };

//   const handleToggleDarkMode = () => {
//     toggleDarkMode();
//     toggleSidebar();
//   };

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
//       <div
//         className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={toggleSidebar}
//       ></div>

//       <div
//         className={`fixed top-0 ${
//           isHebrew ? "right-0" : "left-0"
//         } z-50 h-screen w-64 transition-transform duration-300 ease-in-out transform ${
//           isOpen
//             ? "translate-x-0"
//             : isHebrew
//             ? "translate-x-full"
//             : "-translate-x-full"
//         } ${
//           isDarkMode
//             ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
//             : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-800"
//         }`}
//       >
//         <div className="relative h-full">
//           <button
//             onClick={toggleSidebar}
//             className={`absolute top-4 ${
//               isHebrew ? "right-4" : "left-4"
//             } w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
//               isDarkMode
//                 ? "bg-gray-800 hover:bg-red-500 text-gray-300 hover:text-white"
//                 : "bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white"
//             }`}
//             aria-label="Close sidebar"
//           >
//             <span className="text-lg">✕</span>
//           </button>

//           <div className="p-8 h-full overflow-y-auto flex flex-col justify-between">
//             <div className="mt-8">
//               {links && links.length > 0 && (
//                 <nav>
//                   <ul className={`space-y-2 ${isHebrew ? "text-right" : "text-left"}`}>
//                     {links.map((link, index) => (
//                       <li key={index}>
//                         <Link
//                           to={link.path}
//                           className={`block text-md  px-4 py-3 rounded-lg transition-all duration-200 ${
//                             isDarkMode
//                               ? "hover:bg-gray-700/50 hover:translate-x-2"
//                               : "hover:bg-gray-200/50 hover:translate-x-2"
//                           }`}
//                           onClick={toggleSidebar}
//                         >
//                           {link.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </nav>
//               )}
//             </div>

//             <div className="pt-6 border-t border-gray-700/30">
//               <button
//                 onClick={toggleLanguage}
//                 className={`flex items-center justify-center w-full text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
//                   isDarkMode
//                     ? "hover:bg-gray-700/50 active:bg-gray-600"
//                     : "hover:bg-gray-200/50 active:bg-gray-300"
//                 }`}
//               >
//                 {isHebrew ? "English" : "עברית"}
//               </button>

//               <button
//                 onClick={handleToggleDarkMode}
//                 className={`flex items-center justify-center w-full text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
//                   isDarkMode
//                     ? "hover:bg-gray-700/50 active:bg-gray-600"
//                     : "hover:bg-gray-200/50 active:bg-gray-300"
//                 }`}
//               >
//                 {isDarkMode ? (
//                   <FaSun className="mr-2 text-yellow-400" />
//                 ) : (
//                   <FaMoon className="mr-2 text-gray-600" />
//                 )}
//                 {isDarkMode
//                   ? isHebrew ? "מצב בהיר" : "Light Mode"
//                   : isHebrew ? "מצב כהה" : "Dark Mode"}
//               </button>

//               <button
//                 onClick={handleLogout}
//                 className={`flex items-center justify-center w-full text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
//                   isDarkMode
//                     ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 active:bg-red-500/30"
//                     : "bg-red-500/10 text-red-600 hover:bg-red-500/20 active:bg-red-500/30"
//                 }`}
//               >
//                 {isHebrew ? "התנתק" : "Logout"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Sidebar = ({ links, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const isActivePath = (path) => {
    const currentPath = location.pathname.toLowerCase();
    const linkPath = path.toLowerCase();
    
    // Special handling for root paths that end with "/"
    if (linkPath.endsWith('/') && linkPath !== '/') {
      const cleanLinkPath = linkPath.slice(0, -1);
      return currentPath === cleanLinkPath || currentPath === linkPath;
    }
    
    return currentPath === linkPath || 
           (!linkPath.endsWith('/') && currentPath.startsWith(linkPath + '/'));
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
        } z-50 h-screen w-64 transition-transform duration-300 ease-in-out transform ${
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
                          className={`block text-md px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActivePath(link.path)
                              ? isDarkMode
                                ? "bg-blue-500/20 text-blue-300 translate-x-2"
                                : "bg-blue-500/20 text-blue-700 translate-x-2"
                              : isDarkMode
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

            <div className="pt-6 border-t border-gray-700/30">
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