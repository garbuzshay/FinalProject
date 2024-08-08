import React from "react";

const NavigationButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {text}
    </button>
  );
};

export default NavigationButton;
