// import React, { useState } from "react";
// import { useUserContext } from "../../contexts/UserContext";
// import { useLang } from "../../contexts/LangContext";
// import { useThemeMode } from "../../contexts/DarkModeContext";
// import Sidebar from "../common/Sidebar";

// const Header = ({ links }) => {
//   const { user } = useUserContext();
//   const { language } = useLang();
//   const { isDarkMode } = useThemeMode();
//   const isHebrew = language === "he";
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const getTitle = () => {
//     if (!user || !user.role) return "";
//     switch (user.role.roleName) {
//       case "Admin":
//         return isHebrew ? "מנהל המערכת" : "System Admin";
//       case "MuseumOwner":
//         return isHebrew ? `${user.name}, מנהל המוזיאון` : `${user.name}, Museum owner`;
//       case "Curator":
//         return isHebrew ? `${user.name}, אוצר התערוכות` : `${user.name}, Curator `;
//       default:
//         return isHebrew ? `${user.name}, עובד` : `Employee: ${user.name}`;
//     }
//   };         
//   return (
//     <>
//       <header
//         className={`p-4 flex w-full ${
//           isHebrew ? "flex-row-reverse" : "flex-row"
//         } justify-between items-center shadow-xl 
//         bg-gradient-to-r ${
//           isDarkMode ? "from-gray-800 to-gray-900" : "from-gray-100 to-gray-200"
//         } transition-colors duration-300`}
//       >
//         <h1
//           className={`font-poppins text-md ${
//             isDarkMode ? "text-gray-200" : "text-gray-800"
//           } ${isHebrew ? "ml-auto" : "mr-auto"}`}
//           dir={isHebrew ? "rtl" : "ltr"}
//         >
//           {getTitle()}
//         </h1>

//         <button
//           onClick={toggleSidebar}
//           className={`p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//             isDarkMode ? "text-gray-200" : "text-gray-800"
//           }`}
//           aria-label="Toggle sidebar"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </header>

//       {/* Sidebar Component */}
//       <Sidebar
//         links={links}
//         isOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//       />
//     </>
//   );
// };

// export default Header;


import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useLang } from "../../contexts/LangContext";
import { useThemeMode } from "../../contexts/DarkModeContext";
import Sidebar from "../common/Sidebar";

const Header = ({ links }) => {
  const { user } = useUserContext();
  const { language } = useLang();
  const { isDarkMode } = useThemeMode();
  const isHebrew = language === "he";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const getTitle = () => {
    if (!user || !user.role) return "";
    switch (user.role.roleName) {
      case "Admin":
        return isHebrew ? "מנהל המערכת" : "System Admin";
      case "MuseumOwner":
        return isHebrew ? `${user.name}, מנהל המוזיאון` : `${user.name}, Museum owner`;
      case "Curator":
        return isHebrew ? `${user.name}, אוצר התערוכות` : `${user.name}, Curator `;
      default:
        return isHebrew ? `${user.name}, עובד` : `Employee: ${user.name}`;
    }
  };

  return (
    <>
      <header
        className={`p-4 flex w-full items-center shadow-xl 
          bg-gradient-to-r ${isDarkMode ? "from-gray-800 to-gray-900" : "from-gray-100 to-gray-200"} 
          transition-colors duration-300 ${isHebrew ? "flex-row-reverse" : "flex-row"}`}
      >
        <button
          onClick={toggleSidebar}
          className={`p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          } ${isHebrew ? "ml-auto" : "mr-auto"}`} // Adjust spacing based on language
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

        <h1
          className={`font-poppins text-md ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          } ${isHebrew ? "mr-auto" : "ml-auto"}`} // Adjust spacing based on language
          dir={isHebrew ? "rtl" : "ltr"}
        >
          {getTitle()}
        </h1>
      </header>

      {/* Sidebar Component */}
      <Sidebar
        links={links}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

export default Header;
