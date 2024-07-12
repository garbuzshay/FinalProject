import React from "react";
import Logo from "./Logo";
import Explanation from "./Explanation";
import Image from "./Image";

const ContentSection = ({ logoSrc, title, explanation, imageSrc }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex w-full items-start justify-start mb-4">
        <Logo src={logoSrc} />
      </div>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex justify-center mb-4">
        <Image src={imageSrc} className="w-1/3 md:w-1/4 lg:w-1/5 h-auto" />
      </div>
      <div className="text-center">
        <Explanation text={explanation} className="text-lg" />
      </div>
    </div>
  );
};

export default ContentSection;
