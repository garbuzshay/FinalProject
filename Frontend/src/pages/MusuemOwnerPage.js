
import React from "react";
import MuseumOwnerHeader from "../components/museumOwner/MuseumOwnerHeader";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useMuseumContext } from "../contexts/MuseumContext";
import { useThemeMode } from "../contexts/DarkModeContext";
import { useLang } from "../contexts/LangContext";

const MuseumOwnerPage = () => {
  const { museum, isLoading } = useMuseumContext();
  const { isDarkMode } = useThemeMode();
  const { language } = useLang();
  const isHebrew = language === "he";

  // Loading state
  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  // Waiting for approval state
  if (museum === null) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <h1 className="text-2xl font-semibold">
          {isHebrew ? "ממתין לאישור מנהל" : "Waiting for admin to approve request"}
        </h1>
      </div>
    );
  }

  const isMuseumOpen = museum?.status !== "closed";

  // Main content when museum is closed
  const ClosedMuseumMessage = () => (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-2xl font-semibold">
        {isHebrew ? "המוזיאון שלך כרגע סגור" : "Your Museum is currently closed"}
      </h1>
    </div>
  );

  return (
    <div className={`flex h-screen w-full ${isDarkMode ? "bg-gray-900 text-black" : "bg-gray-100 text-gray-900"}`}>
      <div className="flex-1 flex flex-col">
        <MuseumOwnerHeader />
        <main className="flex-1 p-4 overflow-y-auto">
          {isMuseumOpen ? <Outlet /> : <ClosedMuseumMessage />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MuseumOwnerPage;
