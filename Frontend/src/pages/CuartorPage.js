// import React from "react";
// import CuratorSideBar from "../components/curator/CuratorSideBar";
// import { Outlet } from "react-router-dom";
// import CuratorHeader from "../components/curator/CuratorHeader";
// import Footer from "../components/common/Footer";
// import { useThemeMode } from "../contexts/DarkModeContext";

// const CuartorPage = () => {
//   const { isDarkMode } = useThemeMode();

//   return (
//     <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
//       <CuratorSideBar />
//       <div className="flex-1 flex flex-col">
//         <CuratorHeader />
//         <main className="flex-1 overflow-y-auto">
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default CuartorPage;


import React from "react";
import CuratorSideBar from "../components/curator/CuratorSideBar";
import { Outlet } from "react-router-dom";
import CuratorHeader from "../components/curator/CuratorHeader";
import Footer from "../components/common/Footer";
import { useThemeMode } from "../contexts/DarkModeContext";
import { useLang } from "../contexts/LangContext"; // Import the Language context

const CuratorPage = () => {
  const { isDarkMode } = useThemeMode();
  const { language } = useLang(); // Get current language from context
  const isHebrew = language === "he"; // Check if the language is Hebrew

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
      }`}
    >
      {/* Dynamically position the sidebar on the right for Hebrew and left for English */}
      {isHebrew ? (
        <>
          <div className="flex-1 flex flex-col">
            <CuratorHeader />
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
            <Footer />
          </div>
          <CuratorSideBar />
        </>
      ) : (
        <>
          <CuratorSideBar />
          <div className="flex-1 flex flex-col">
            <CuratorHeader />
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default CuratorPage;
