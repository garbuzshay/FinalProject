import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useUserContext } from "../../contexts/UserContext";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { useMuseumContext } from "../../contexts/MuseumContext";

// AdminHeader component
const AdminHeader = ({ buttonText, buttonPath }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const { language } = useLang();
  const isHebrew = language === "he";

  useEffect(() => {
    setTitle(isHebrew ? "מנהל המערכת" : "System Admin");
  }, [language, isHebrew]);

  const handleButtonClick = () => {
    navigate(buttonPath);
  };

  return (
    <header
      className={`p-4 flex w-full ${
        isHebrew ? "flex-row-reverse" : "flex-row"
      } justify-between items-center rounded-b-2xl shadow-xl 
      bg-gradient-to-r ${
        isDarkMode ? "from-gray-800 to-gray-900" : "from-gray-100 to-gray-200"
      } 
      transition-colors duration-300`}
    >
      {/* Title */}
      <h1
        className={`font-poppins text-md text-gray-800 dark:text-gray-200 ${
          isHebrew ? "ml-auto" : "mr-auto"
        }`}
        dir={isHebrew ? "rtl" : "ltr"}
      >
        {title}
      </h1>

      {/* Container for Theme Toggle, Language Switcher, and Logout */}
      <div
        className={`flex items-center ${
          isHebrew ? "space-x-reverse space-x-4" : "space-x-4"
        }`}
      >
        {isHebrew ? (
          <>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full sm:px-3 sm:py-1 hover:bg-red-600 transition duration-200"
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>
            <LanguageSwitcher />
            <button
              className="flex items-center bg-gray-200 text-gray-800 px-3 py-2 rounded-full sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </>
        ) : (
          <>
            <button
              className="flex items-center bg-gray-200 text-gray-800 px-3 py-2 rounded-full sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <LanguageSwitcher />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full sm:px-3 sm:py-1 hover:bg-red-600 transition duration-200"
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

// EmployeeHeader component for MuseumOwner and Curator
const EmployeeHeader = ({ buttonText, buttonPath }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { user } = useUserContext();
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const { language } = useLang();
  const { museum } = useMuseumContext();
  const isHebrew = language === "he";
// ${user.name}, ברוך הבא ל-CMS
// museum ? museum.name : "your museum"
//          : `${user.name},
  useEffect(() => {
    const getTitle = () => {
      if (!user || !user.role) return "";
      switch (user.role.roleName) {
        case "MuseumOwner":
          return isHebrew
            ? `${user.name}, ברוך הבא ל-CMS`
            : `
             ${
                museum ? museum.name : "your museum"
              } 
             `;
        case "Curator":
          return  `${user.name}`;
        // return isHebrew
        //   ? `שלום ${user.name}, ברוך הבא לאזור האוצרים`
        //   : `Hello ${user.name}, Welcome to the Curator's area CMS`;
        default:
          return "";
      }
    };

    setTitle(getTitle());
  }, [user, museum, language, isHebrew]);

  const handleButtonClick = () => {
    navigate(buttonPath);
  };

  return (
    <header
      className={`p-4 flex ${
        isHebrew ? "flex-row-reverse" : "flex-1 flex-row"
      } justify-between items-center shadow-xl 
      bg-gradient-to-r ${
        isDarkMode ? "from-gray-800 to-gray-900" : "from-gray-100 to-gray-200"
      } 
      transition-colors duration-300`}
      
      
    >
      <h1
        className={`font-poppins text-xl sm:text-lg text-gray-800 dark:text-gray-200 ${
          isHebrew ? "ml-auto" : "mr-auto"
        }`}
        dir={isHebrew ? "rtl" : "ltr"}
      >
        {title}
      </h1>

      <div
        className={`flex items-center ${
          isHebrew ? "space-x-reverse space-x-2" : "space-x-2"
        }`}
      >
        {isHebrew ? (
          <>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full sm:px-3 sm:py-1 hover:bg-red-600 transition duration-200"
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>
            <LanguageSwitcher />
            <button
              className="flex items-center mx-2 bg-gray-200 text-gray-800 px-3 py-2 rounded-full sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </>
        ) : (
          <>
            <button
              className="flex items-center bg-gray-200 text-gray-800 px-3 py-2 rounded-full sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <LanguageSwitcher />
            <button
              className="bg-black text-white px-4 py-2 rounded-full sm:px-3 sm:py-1 hover:bg-grey-600 transition duration-200"
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

// Main Header component that conditionally renders either AdminHeader or EmployeeHeader
const Header = ({ buttonText, buttonPath }) => {
  const { user } = useUserContext();

  if (user && user.role.roleName === "Admin") {
    return <AdminHeader buttonText={buttonText} buttonPath={buttonPath} />;
  } else {
    return <EmployeeHeader buttonText={buttonText} buttonPath={buttonPath} />;
  }
};

export default Header;
