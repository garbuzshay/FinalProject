import React from "react";

const Image = ({ src }) => {
  return (
    <div className="w-full flex justify-center">
      <img
        src={src}
        alt=""
        className="max-w-full h-auto object-contain sm:max-h-48 md:max-h-64 lg:max-h-72 xl:max-h-80"
      />
    </div>
  );
};

export default Image;
