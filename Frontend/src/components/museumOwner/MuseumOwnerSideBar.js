
// // MuseumOwnerSideBar.js
// import React from "react";
// import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
// import Sidebar from "../common/Sidebar"; // Adjust the path if necessary
// import { useLang } from "../../contexts/LangContext"; // Import the Language context

// const MuseumOwnerSideBar = ({ isMuseumOpen }) => {
//   const { language } = useLang(); // Get the current language from the context
//   const isHebrew = language === "he"; // Check if the language is Hebrew

//   // Choose the links based on the language
//   const museumsLinks = sideBarData.MuseumOwner[language]; // Access the correct language links

//   return (
//     // Sidebar component that positions based on language (left for English, right for Hebrew)
//     <Sidebar links={isMuseumOpen ? museumsLinks : [museumsLinks[0]]} isHebrew={isHebrew} />
//   );
// };

// export default MuseumOwnerSideBar;


import React from "react";
import sideBarData from "../../data/sideBarData"; // Import sideBarData for links
import Sidebar from "../common/Sidebar";
import { useLang } from "../../contexts/LangContext";

const MuseumOwnerSideBar = ({ isMuseumOpen }) => {
  const { language } = useLang();


  // Get the museum owner links for the current language
  const museumsLinks = sideBarData.MuseumOwner[language] || [];

  return (
    <Sidebar links={museumsLinks} />
  );
};

export default MuseumOwnerSideBar;
