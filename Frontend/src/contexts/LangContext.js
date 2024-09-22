// LangContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for language
const LangContext = createContext();

export const LangProvider = ({ children }) => {
    // Set the initial language, either from localStorage or default to 'en'
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('app-language') || 'en';
    });

    useEffect(() => {
        // Save the selected language in localStorage
        localStorage.setItem('app-language', language);
    }, [language]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LangContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LangContext.Provider>
    );
};

// Hook to use the LangContext
export const useLang = () => useContext(LangContext);
