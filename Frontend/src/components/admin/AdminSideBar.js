
// // AdminSideBar.js
// import React from "react";
// import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
// import Sidebar from "../common/Sidebar"; // Adjust the path if necessary

// const AdminSideBar = () => {
//   const adminLinks = sideBarData.Admin;

//   return (
//     <Sidebar links={adminLinks} />
//   );
// };

// export default AdminSideBar;


// import React from "react";
// import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
// import Sidebar from "../common/Sidebar"; // Adjust the path if necessary
// import { useLang } from "../../contexts/LangContext"; // Import useLang to get the current language

// const AdminSideBar = () => {
//   const { language } = useLang(); // Get the current language from LangContext

//   // Get the admin links for the current language (e.g., 'en' or 'he')
//   const adminLinks = sideBarData.Admin[language];

//   return (
//     <Sidebar links={adminLinks} />
//   );
// };

// export default AdminSideBar;


import React from "react";
import sideBarData from "../../data/sideBarData"; // Import sideBarData for links
import Sidebar from "../common/Sidebar";
import { useLang } from "../../contexts/LangContext";

const AdminSideBar = () => {
  const { language } = useLang();

  // Get the admin links for the current language
  const adminLinks = sideBarData.Admin[language] || [];

  return (
    <Sidebar links={adminLinks} />
  );
};

export default AdminSideBar;
