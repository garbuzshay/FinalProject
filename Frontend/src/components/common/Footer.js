// src/components/common/Footer.js

import React from 'react';
import { useThemeMode } from '../../contexts/DarkModeContext'; // Adjust the path as necessary

const Footer = () => {
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode from context

  return (
    <footer
      className={`py-4 z-60 ${
        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
      } transition-colors duration-300`}
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
