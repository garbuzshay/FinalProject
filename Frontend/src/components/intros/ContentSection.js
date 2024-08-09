import React from "react";
import Logo from "./Logo";
import Explanation from "./Explanation";
import Image from "./Image";

const ContentSection = ({ logoSrc, title, explanation, imageSrc }) => {
  return (
    <div>
      <div >
      <Logo src={logoSrc} />
        <div className="flex flex-col text-center items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl font-bold overflow-hidden whitespace-nowrap pr-5 animate-typing relative">
            {title}
            <span className="border-r-2 border-white animate-caret "></span>
          </h1>


          <Image src={imageSrc}  />
    
          <Explanation text={explanation} />
          </div>
      </div>
    </div>
  );
};

export default ContentSection;

