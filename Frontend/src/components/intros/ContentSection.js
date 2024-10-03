import React from "react";
import Logo from "./Logo";
import Explanation from "./Explanation";
import Image from "./Image";

const ContentSection = ({ logoSrc, title, explanation, imageSrc }) => {
  return (

      <div >
      <Logo src={logoSrc} />
        <div className="flex flex-col text-center items-center container mx-auto font-poppins">
          <Image src={imageSrc}  />
          <h1 className="mb-5 text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold overflow-hidden whitespace-nowrap pr-5 animate-typing relative">
            {title}
            <span className="border-r-2 border-white animate-caret "></span>
          </h1>
          <Explanation text={explanation} />
          </div>
      </div>

  );
};

export default ContentSection;

