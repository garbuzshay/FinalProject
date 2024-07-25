import React from "react";
import ContactUs from "../common/ContantUs";

const CuratorContactUs = () => {
  return (
    <div className="flex justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Museum Owner Contact Us
        </h2>
        <ContactUs />
      </div>
    </div>
  );
};

export default CuratorContactUs;
