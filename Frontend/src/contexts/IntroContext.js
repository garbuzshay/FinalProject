import React, { createContext, useContext, useState } from "react";
import introPageData from "../data/introPageData";
import { useNavigate } from "react-router-dom";

export const IntroContext = createContext();

export const IntroProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = introPageData.length; // Assuming three multi-step pages

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    else {
      finishIntroPage();
    }
  };

  const finishIntroPage = () => {
    if (currentPage === totalPages - 1) navigate("/register");
  };   

  const goToPreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <IntroContext.Provider
      value={{ currentPage, goToNextPage, goToPreviousPage }}
    >
      {children}
    </IntroContext.Provider>
  );
};

export const useIntroContext = () => {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
