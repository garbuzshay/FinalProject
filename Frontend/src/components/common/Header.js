
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { useThemeMode } from "../../contexts/DarkModeContext";
import { useMuseumContext } from "../../contexts/MuseumContext";

// AdminHeader component
const AdminHeader = ({ buttonText, buttonPath }) => {
  const navigate = useNavigate();
  const [title] = useState("Admin Dashboard");
  const { isDarkMode, toggleDarkMode } = useThemeMode();

  const handleButtonClick = () => {
    navigate(buttonPath);
  };

  return (
    <header className="shadow p-4 flex justify-between items-center bg-gay-200 dark:bg-gray-800 transition-colors duration-300">
      <h1 className="text-xl font-semibold sm:text-lg text-gray-800 dark:text-gray-200">
        {title}
      </h1>
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

// EmployeeHeader component for MuseumOwner and Curator
const EmployeeHeader = ({ buttonText, buttonPath }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { user } = useUserContext();
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const { museum } = useMuseumContext();

  useEffect(() => {
    const getTitle = () => {
      if (!user || !user.role) return;

      switch (user.role.roleName) {
        case "MuseumOwner":
          return `Hello ${user.name}, Welcome to ${
            museum ? museum.name : "your museum"
          } CMS`;
        case "Curator":
          return `Hello ${user.name}, Welcome to the Curator's area CMS`;
        default:
          return "";
      }
    };

    setTitle(getTitle());
  }, [user, museum]);

  const handleButtonClick = () => {
    navigate(buttonPath);
  };

  return (
    <header className="shadow p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800 transition-colors duration-300">
      <h1 className="text-xl font-semibold sm:text-lg text-gray-800 dark:text-gray-200">
        {title}
      </h1>
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
