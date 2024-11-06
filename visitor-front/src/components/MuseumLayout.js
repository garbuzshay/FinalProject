// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\layouts\MuseumLayout.js

import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { MuseumProvider } from "../contexts/MuseumContext";
import Footer from "./Footer";

const MuseumLayout = () => {
  const { museumName } = useParams(); // Get museumName from URL

  return (
    <MuseumProvider museumName={museumName}>
      <Outlet /> {/* Render nested routes here */}
      <Footer/>
    </MuseumProvider>
  );
};

export default MuseumLayout;
