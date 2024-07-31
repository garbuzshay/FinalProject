import React from "react";
import Logo from "./Logo";
import Explanation from "./Explanation";
import Image from "./Image";

const ContentSection = ({ logoSrc, title, explanation, imageSrc }) => {
  return (
    <div>
      <div className="flex items-start justify-start w-full max-w-2xl">
        <Logo src={logoSrc} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold overflow-hidden whitespace-nowrap pr-5 animate-typing relative">
            {title}
            <span className="border-r-2 border-white animate-caret absolute right-0"></span>
          </h1>
        </div>
        <div className="flex justify-center">
          <Image src={imageSrc} className="w-1/3 md:w-1/4 lg:w-1/5 h-auto" />
        </div>
        <div className="text-center">
          <Explanation text={explanation} className="text-lg " />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
