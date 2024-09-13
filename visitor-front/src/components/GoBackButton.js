import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ text = "Go Back", className, customPath }) => {
  const navigate = useNavigate(); // useNavigate hook

  const handleClick = () => {
    if (customPath) {
      navigate(customPath); // Navigate to the custom path if provided
    } else {
      navigate(-1); // Go back to the previous page
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
      {text}
    </button>
  );
};

export default GoBackButton;
