// src/components/MuseumHeader.js

import React from "react";
import LogoutButton from "./LogoutButton";

const MuseumHeader = ({ title, address, state }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-lg">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {address && state && (
          <p className="text-lg text-gray-600">
            {address}, {state}
          </p>
        )}
      </div>
      <LogoutButton /> {/* Logout button */}
    </div>
  );
};

export default MuseumHeader;
