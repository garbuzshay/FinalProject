import React from "react";
import CuratorSideBar from "../components/curator/CuratorSideBar";
import { Outlet } from "react-router-dom";
import CuratorHeader from "../components/curator/CuratorHeader";
import Footer from "../components/common/Footer";
import { useThemeMode } from "../contexts/DarkModeContext";

const CuartorPage = () => {
  const { isDarkMode } = useThemeMode();

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <CuratorSideBar />
      <div className="flex-1 flex flex-col">
        <CuratorHeader />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CuartorPage;
