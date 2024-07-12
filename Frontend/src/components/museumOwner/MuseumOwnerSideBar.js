
// AdminSideBar.js
import React from "react";
import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
import Sidebar from "../common/Sidebar"; // Adjust the path if necessary

const MuseumOwnerSideBar = () => {
  const museumsLinks = sideBarData.MuseumOwner;

  return (
    <Sidebar links={museumsLinks} />
  );
};

export default MuseumOwnerSideBar;