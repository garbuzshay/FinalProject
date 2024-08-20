import React from "react";

const Explanation = ({ text }) => {
  return (
    <div className="explanation">
      <p className="text-lg font-bold">{text}</p>
    </div>
  );
};

export default Explanation;
