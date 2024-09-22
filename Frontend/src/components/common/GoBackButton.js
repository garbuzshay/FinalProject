import React from "react";
import useNavigation from "../../hooks/useNavigation"; // Adjust the path as needed
import { useLang } from "../../contexts/LangContext"; // Import language context

const GoBackButton = ({ text, className, customPath }) => {
  const { goBack, goTo } = useNavigation();
  const { language } = useLang(); // Get the current language
  const isHebrew = language === "he"; // Check if the language is Hebrew

  const handleClick = () => {
    if (customPath) {
      goTo(customPath);
    } else {
      goBack();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={
        className ||
        "mx-auto my-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      }
    >
      {text || (isHebrew ? "חזור" : "Go Back")}
    </button>
  );
};

export default GoBackButton;
