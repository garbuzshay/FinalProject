  import React from "react";

  const Image = ({ src }) => {
    return (
      <div className="flex justify-center items-center">
        <img src={src} alt="Illustration" className="max-h-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md" />
      </div>
    );
  };

  export default Image;
 