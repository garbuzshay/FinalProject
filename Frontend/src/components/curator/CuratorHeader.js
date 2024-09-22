import React from 'react';
import Header from '../common/Header';
import { useLang } from '../../contexts/LangContext'; // Import useLang from LangContext

const CuratorHeader = () => {
    const { language } = useLang(); // Get the current language from LangContext

    // Translations for the button text
    const translations = {
        en: {
            logout: "Logout",
        },
        he: {
            logout: "התנתק",
        },
    };

    // Get the appropriate translation based on the current language
    const t = translations[language];

    return (
        <div>
            <Header 
                buttonText={t.logout} // Use the translated text for "Logout"
                buttonPath="/logout"
            />
        </div>
    );
};

export default CuratorHeader;
