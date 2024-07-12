
// AdminSideBar.js
import React from "react";
import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
import Sidebar from "../common/Sidebar"; // Adjust the path if necessary

const AdminSideBar = () => {
  const adminLinks = sideBarData.Admin;

  return (
    <Sidebar links={adminLinks} />
  );
};

export default AdminSideBar;