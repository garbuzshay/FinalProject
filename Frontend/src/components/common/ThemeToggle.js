// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
  
    return (
      <button
        className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
        onClick={toggleTheme}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    );
  };
  
  export default ThemeToggle;