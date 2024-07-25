
// AdminSideBar.js
import React from "react";
import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
import Sidebar from "../common/Sidebar"; // Adjust the path if necessary
import { useUserContext } from '../../contexts/UserContext'; // Import the UserContext

const MuseumOwnerSideBar = () => {
  const { user } = useUserContext();
  const museumsLinks = sideBarData.MuseumOwner;

  // Check if the museum is approved
  const isMuseumApproved = user.museum;

  return (
    <Sidebar links={isMuseumApproved ? museumsLinks : []} /> // Render links only if museum is approved
  );
};

export default MuseumOwnerSideBar;
