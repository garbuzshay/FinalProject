import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useUserContext } from "../../contexts/UserContext";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useLang } from "../../contexts/LangContext"; // Import Language context
import LanguageSwitcher from "../common/LanguageSwitcher"; // Import the LanguageSwitcher
import { useMuseumContext } from "../../contexts/MuseumContext";

// AdminHeader component
const AdminHeader = ({ buttonText, buttonPath }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const { language } = useLang(); // Get current language
  const isHebrew = language === "he"; // Check if the current language is Hebrew

  useEffect(() => {
    // Dynamically set the title based on the language
    setTitle(isHebrew ? "לוח מחוונים ניהולי" : "Admin Dashboard");
  }, [language, isHebrew]);

  const handleButtonClick = () => {
    navigate(buttonPath);
  };

  return (
    <header
      className={`shadow p-4 flex ${isHebrew ? "flex-row-reverse" : "flex-row"} justify-between items-center bg-gray-200 dark:bg-gray-800 transition-colors duration-300`}
    >
      {/* Title */}
      <h1 className={`font-poppins text-xl sm:text-lg text-gray-800 dark:text-gray-200 ${isHebrew ? "ml-auto" : "mr-auto"}`}>
        {title}
      </h1>

      {/* Container for Theme Toggle, Language Switcher, and Logout */}
      <div className={`flex items-center ${isHebrew ? "space-x-reverse space-x-4" : "space-x-4"}`}>
        {/* Hebrew Order: Logout -> Language Switcher -> Theme Button */}
        {isHebrew ? (
          <>
            {/* Logout Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded sm:px-3 sm:py-1 hover:bg-blue-600 transition duration-200 w-auto"
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <button
              className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </>
        ) : (
          <>
            {/* Theme Toggle */}
            <button
              className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Logout Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded sm:px-3 sm:py-1 hover:bg-blue-600 transition duration-200 w-auto"
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
  const { language } = useLang(); // Get current language
  const { museum } = useMuseumContext();
  const isHebrew = language === "he"; // Check if the current language is Hebrew

  useEffect(() => {
    const getTitle = () => {
      if (!user || !user.role) return "";

      switch (user.role.roleName) {
        case "MuseumOwner":
          return isHebrew
            ? `   ברוך הבא למערכת ניהול המוזיאון, ${user.name}`
            : `Hello ${user.name}, Welcome to ${
                museum ? museum.name : "your museum"
              } CMS`;
        case "Curator":
          return isHebrew
            ? `שלום ${user.name}, ברוך הבא לאזור האוצרים`
            : `Hello ${user.name}, Welcome to the Curator's area CMS`;
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
      className={`shadow p-4 flex ${isHebrew ? "flex-row-reverse" : "flex-row"} justify-between items-center bg-gray-200 dark:bg-gray-800 transition-colors duration-300`}
    >
      {/* Title */}
      <h1 className={`font-poppins text-l font-semibold sm:text-lg text-gray-800 dark:text-gray-200 ${isHebrew ? "ml-auto" : "mr-auto"}`}>
        {title}
      </h1>

      {/* Container for Theme Toggle, Language Switcher, and Logout */}
      <div className={`flex items-center ${isHebrew ? "space-x-reverse space-x-4" : "space-x-4"}`}>
        {/* Hebrew Order: Logout -> Language Switcher -> Theme Button */}
        {isHebrew ? (
          <>
            {/* Logout Button */}
            <button
              className="bg-grey-500 font-poppins text-white px-4 py-2 rounded sm:px-3 sm:py-1 hover:bg-blue-600 transition duration-200 w-auto"
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <button
              className="flex items-center font-poppins bg-gray-200 text-gray-800 px-2 py-2 rounded sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </>
        ) : (
          <>
            {/* Theme Toggle */}
            <button
              className="flex items-center font-poppins bg-gray-200 text-gray-800 px-2 py-2 rounded sm:px-3 sm:py-1 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Logout Button */}
            <button
              className="bg-black text-white font-poppins px-4 py-2 rounded sm:px-3 sm:py-1 hover:bg-red-600 transition duration-200 w-auto"
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
