
// AdminSideBar.js
import React from "react";
import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
import Sidebar from "../common/Sidebar"; // Adjust the path if necessary
import { useUserContext } from '../../contexts/UserContext'; // Import the UserContext

const MuseumOwnerSideBar = ({isMuseumOpen}) => {

  const museumsLinks = sideBarData.MuseumOwner;

  return (
    <Sidebar links={isMuseumOpen ? museumsLinks : [museumsLinks[0]]} /> // Render links only if museum is approved
  );
};

export default MuseumOwnerSideBar;
