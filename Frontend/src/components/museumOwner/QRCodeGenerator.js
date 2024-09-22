// Frontend\src\components\QRCodeGenerator.js
import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLang } from "../../contexts/LangContext"; // Import Language Context

const QRCodeGenerator = ({ url, fileName }) => {
  const qrCodeRef = useRef(null);
  const { language } = useLang(); // Get the current language from LangContext
  const isHebrew = language === "he"; // Check if the language is Hebrew

  // Translations for the button text
  const translations = {
    en: {
      getQRCode: "Get QR code",
    },
    he: {
      getQRCode: "קבל קוד QR",
    },
  };

  // Get the correct translation based on the current language
  const t = translations[language];

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const jpegUrl = canvas
      .toDataURL("image/jpeg", 1.0) // Convert to JPEG format
      .replace("image/jpeg", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = jpegUrl;
    downloadLink.download = `${fileName}_QRCode.jpg`; // Save as .jpg file
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div
      className={`flex flex-col items-center ${isHebrew ? "text-right" : "text-left"}`} // Set text alignment based on language
      dir={isHebrew ? "rtl" : "ltr"} // Set the direction to RTL for Hebrew
    >
      <div ref={qrCodeRef} className="hidden">
        <QRCodeCanvas
          id="qrCode"
          value={url}
          size={1024}  // Increased size for better print quality
          bgColor="#ffffff"
          fgColor="#000000"
          level="Q"
          includeMargin
          className="rounded-md"
        />
      </div>
      <button
        onClick={downloadQRCode}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200"
      >
        {t.getQRCode} {/* Display translated "Get QR code" */}
      </button>
    </div>
  );
};

export default QRCodeGenerator;
