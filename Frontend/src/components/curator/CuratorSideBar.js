// CuratorSideBar.js
import React from "react";
import sideBarData from "../../data/sideBarData"; // Adjust the path if necessary
import Sidebar from "../common/Sidebar"; // Adjust the path if necessary
import { useLang } from "../../contexts/LangContext"; // Import the Language context

const CuratorSideBar = () => {
  const { language } = useLang(); // Get the current language from the context
  const isHebrew = language === "he"; // Check if the language is Hebrew

  // Choose the links based on the language
  const curatorsLinks = sideBarData.Curator[language]; // Access the correct language links for Curator

  return (
    // Sidebar component that positions based on language (left for English, right for Hebrew)
    <Sidebar links={curatorsLinks} isHebrew={isHebrew} />
  );
};

export default CuratorSideBar;
