import React from "react";

const Explanation = ({ text }) => {
  return (
    <div className="explanation font-poppins mb-3">
      <p className="text-lg text-gray-900">{text}</p>
    </div>
  );
};

export default Explanation;
