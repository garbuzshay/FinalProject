import React from "react";
import { useLang } from "../../contexts/LangContext"; // Import LangContext

const ConfirmationDialog = ({
  message,
  onConfirm,
  onCancel,
  type = "button",
}) => {
  const { language } = useLang(); // Get the current language from context
  const isHebrew = language === "he"; // Check if the current language is Hebrew

  // Define translations for English and Hebrew
  const translations = {
    en: {
      title: "Are you sure?",
      yes: "Yes",
      no: "No",
    },
    he: {
      title: "האם אתה בטוח?",
      yes: "כן",
      no: "לא",
    },
  };

  // Select the correct translation based on the current language
  const t = translations[language];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50`}
      dir={isHebrew ? "rtl" : "ltr"}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full  `}
      >
        <h2 className="text-xl font-semibold mb-4">{t.title}</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className={`flex justify-center space-x-4  ${isHebrew ? "space-x-reverse" : ""}`}>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded transition duration-200"
            onClick={onCancel}
          >
            {t.no}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
            onClick={onConfirm}
            type={type}
          >
            {t.yes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
