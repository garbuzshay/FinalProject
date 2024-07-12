import React from "react";

const Image = ({ src }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <img src={src} alt="Illustration" className="max-w-md max-h-md" />
    </div>
  );
};

export default Image;
