// import React from "react";
// import MuseumOwnerSideBar from "../components/museumOwner/MuseumOwnerSideBar";
// import { Outlet } from "react-router-dom";
// import MuseumOwnerHeader from "../components/museumOwner/MuseumOwnerHeader";
// import Footer from "../components/common/Footer";
// import { useMuseumContext } from "../contexts/MuseumContext";
// import { useThemeMode } from "../contexts/DarkModeContext";

// const MuseumOwnerPage = () => {
//   const { museum, isLoading } = useMuseumContext();
//   const { isDarkMode } = useThemeMode();

//   if (isLoading) {
//     return (
//       <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
//         <h1 className="text-2xl font-semibold">Loading...</h1>
//       </div>
//     );
//   }

//   const isMuseumWaitingApproval = museum === null;

//   if (isMuseumWaitingApproval) {
//     return (
//       <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
//         <h1 className="text-2xl font-semibold">
//           Waiting for admin to approve request
//         </h1>
//       </div>
//     );
//   }

//   const isMuseumOpen = museum?.status !== "closed";

//   return (
//     <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-black' : 'bg-gray-200 text-gray-900'}`}> 
//       <MuseumOwnerSideBar isMuseumOpen={isMuseumOpen} />
//       <div className="flex-1 flex flex-col">
//         <MuseumOwnerHeader />
//         <main className="flex-1 p-4 overflow-y-auto">
//           {isMuseumOpen ? (
//             <Outlet />
//           ) : (
//             <div className="flex justify-center items-center h-full">
//               <h1 className="text-2xl font-semibold">
//                 Your Museum is currently closed
//               </h1>
//             </div>
//           )}
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default MuseumOwnerPage;


import React from "react";
import MuseumOwnerSideBar from "../components/museumOwner/MuseumOwnerSideBar";
import { Outlet } from "react-router-dom";
import MuseumOwnerHeader from "../components/museumOwner/MuseumOwnerHeader";
import Footer from "../components/common/Footer";
import { useMuseumContext } from "../contexts/MuseumContext";
import { useThemeMode } from "../contexts/DarkModeContext";
import { useLang } from "../contexts/LangContext"; // Import the Language context

const MuseumOwnerPage = () => {
  const { museum, isLoading } = useMuseumContext();
  const { isDarkMode } = useThemeMode();
  const { language } = useLang(); // Get current language from context
  const isHebrew = language === "he"; // Check if the language is Hebrew

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  const isMuseumWaitingApproval = museum === null;

  if (isMuseumWaitingApproval) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-semibold">
          {isHebrew
            ? "ממתין לאישור מנהל"
            : "Waiting for admin to approve request"}
        </h1>
      </div>
    );
  }

  const isMuseumOpen = museum?.status !== "closed";

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-900 text-black" : "bg-gray-200 text-gray-900"
      }`}
    >
      {/* Dynamically position the sidebar on the right for Hebrew and left for English */}
      {isHebrew ? (
        <>
          <div className="flex-1 flex flex-col">
            <MuseumOwnerHeader />
            <main className="flex-1 p-4 overflow-y-auto">
              {isMuseumOpen ? (
                <Outlet />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <h1 className="text-2xl font-semibold">
                    המוזיאון שלך כרגע סגור
                  </h1>
                </div>
              )}
            </main>
            <Footer />
          </div>
          <MuseumOwnerSideBar isMuseumOpen={isMuseumOpen} />
        </>
      ) : (
        <>
          <MuseumOwnerSideBar isMuseumOpen={isMuseumOpen} />
          <div className="flex-1 flex flex-col">
            <MuseumOwnerHeader />
            <main className="flex-1 p-4 overflow-y-auto">
              {isMuseumOpen ? (
                <Outlet />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <h1 className="text-2xl font-semibold">
                    Your Museum is currently closed
                  </h1>
                </div>
              )}
            </main>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default MuseumOwnerPage;
