import React from "react";

const Logo = ({ src }) => {
  return (
    <div className="logo">
      <img src={src} alt="Logo" className="h-24  " />
    </div>
  );
};

export default Logo;
