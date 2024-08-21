  import React from "react";

  const Image = ({ src }) => {
    return (
      <div className="size-3/5 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm">
        <img src={src}  className="sm:min-h-12" />
      </div>
    );
  };

  export default Image;

