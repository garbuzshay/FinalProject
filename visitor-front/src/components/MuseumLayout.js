// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\layouts\MuseumLayout.js

import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { MuseumProvider } from "../contexts/MuseumContext";

const MuseumLayout = () => {
  const { museumName } = useParams(); // Get museumName from URL

  return (
    <MuseumProvider museumName={museumName}>
      <Outlet /> {/* Render nested routes here */}
    </MuseumProvider>
  );
};

export default MuseumLayout;
