import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({ url, fileName }) => {
  const qrCodeRef = useRef(null);

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
    <div className="flex flex-col items-center">
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
        Get QR code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
