// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// import { useLang } from "../../contexts/LangContext";

// const Sidebar = ({ links }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [touchStartX, setTouchStartX] = useState(0);
//   const [dragDistance, setDragDistance] = useState(0);
//   const { isDarkMode } = useThemeMode();
//   const { language } = useLang();
//   const isHebrew = language === "he";

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//     setDragDistance(0);
//   };

//   const handleTouchStart = (e) => {
//     setTouchStartX(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     const touchCurrentX = e.touches[0].clientX;
//     const dragDelta = isHebrew
//       ? touchStartX - touchCurrentX
//       : touchCurrentX - touchStartX;

//     if (dragDelta < 0) {
//       setDragDistance(dragDelta);
//     }
//   };

//   const handleTouchEnd = () => {
//     if (dragDistance < -100) {
//       setIsOpen(false);
//     }
//     setDragDistance(0);
//   };

//   return (
//     <>
//       {isOpen ? (
//         <div
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           className={`p-6 shadow-2xl transition-all duration-300 ease-in-out
//           ${isOpen ? "w-64 md:w-64 sm:w-48" : "w-0"}
//           ${isOpen ? "fixed md:relative" : "fixed"}
//           z-50 transform md:translate-x-0 flex flex-col overflow-y-auto
//           ${isOpen ? "translate-x-0" : `${
//             isHebrew ? "translate-x-full" : "-translate-x-full"
//           } md:translate-x-0`}
//           min-h-screen h-full sm:h-auto // Ensuring full height for all screens
//           ${isDarkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-gray-100 to-gray-200"}
//           ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
//           style={{
//             transform: `translateX(${dragDistance}px)`,
//             transition: dragDistance ? "none" : "transform 0.3s ease",
//             [isHebrew ? "right" : "left"]: 0,
//           }}
//         >
//           {/* Close Button */}
//           <button
//             onClick={toggleSidebar}
//             className={`text-black absolute top-4 ${isHebrew ? "left-4" : "right-4"} hover:text-red-400 transition-colors duration-300 sm:block`}
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
//                 <ul className={`space-y-6 ${isHebrew ? "text-right" : "text-left"}`}>
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
//       ) : (
//         <button
//           onClick={toggleSidebar}
//           className={`absolute z-50 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-r-xl shadow-lg hover:bg-gray-700 transition-colors duration-300`}
//         >
//           ☰
//         </button>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext";

const Sidebar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useThemeMode();
  const { language } = useLang();
  const isHebrew = language === "he";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${
          isHebrew ? "right-0" : "left-0"
        } z-50 h-full w-64 transition-transform duration-300 ease-in-out transform ${
          isOpen
            ? "translate-x-0"
            : isHebrew
            ? "translate-x-full"
            : "-translate-x-full"
        } ${
          isDarkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300"
            : "bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className={`absolute top-4 ${
              isHebrew ? "left-4" : "right-4"
            } text-2xl hover:text-red-400 transition-colors duration-300`}
            aria-label="Close sidebar"
          >
            ✕
          </button>

          {/* Sidebar Links */}
          {links && links.length > 0 && (
            <>
              <h2
                className={`text-2xl font-poppins font-bold mb-8 sm:text-xl border-b border-gray-600 pb-4 ${
                  isHebrew ? "text-right" : "text-left"
                }`}
              >
                <Link to={links[0].path}>{links[0].name}</Link>
              </h2>
              <nav>
                <ul
                  className={`space-y-6 ${
                    isHebrew ? "text-right" : "text-left"
                  }`}
                >
                  {links.slice(1).map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className={`block text-lg font-medium font-poppins px-4 py-2 rounded-lg transition-colors duration-300 ${
                          isDarkMode
                            ? "hover:bg-gray-700 hover:text-gray-300"
                            : "hover:bg-gray-300 hover:text-gray-800"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      {!isOpen && (
  <button
    onClick={toggleSidebar}
    className={`fixed z-50 top-1/2 transform -translate-y-1/2 ${
      isHebrew ? "right-0" : "left-0"
    } bg-gray-800 text-white p-2 ${
      isHebrew ? "rounded-l-md" : "rounded-r-md"
    } shadow-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
    aria-label="Toggle sidebar"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
)}
    </>
  );
};

export default Sidebar;