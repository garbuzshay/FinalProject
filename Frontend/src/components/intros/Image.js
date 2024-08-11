  import React from "react";

  const Image = ({ src }) => {
    return (
      <div>
        <img src={src} alt="Illustration" className="max-h-md sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md w-full h-auto" />
      </div>
    );
  };

  export default Image;
 