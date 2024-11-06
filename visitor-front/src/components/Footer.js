// src/components/common/Footer.js

import React from 'react';

const Footer = () => {

  return (
    <footer
      className={`py-4 z-60 bg-gray-200 
     transition-colors duration-300`}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm">
          mensch-edutainment &copy; 2024 All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
