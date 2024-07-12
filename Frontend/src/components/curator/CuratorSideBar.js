import React from "react";
import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
import Sidebar from "../common/Sidebar"; // Adjust the path if necessary

const CuratorSideBar = () => {
    const curatorsLinks = sideBarData.Curator;
  
    return (
      <Sidebar links={curatorsLinks} />
    );
  };
  
  export default CuratorSideBar;