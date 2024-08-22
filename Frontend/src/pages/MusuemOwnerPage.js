import React from "react";
import MuseumOwnerSideBar from "../components/museumOwner/MuseumOwnerSideBar";
import { Outlet } from "react-router-dom";
import MuseumOwnerHeader from "../components/museumOwner/MuseumOwnerHeader";
import Footer from "../components/common/Footer";
import { useMuseumContext } from "../contexts/MuseumContext";
import { useDarkMode } from "../contexts/DarkModeContext";

const MuseumOwnerPage = () => {
  const { museum, isLoading, error } = useMuseumContext();
  const { isDarkMode } = useDarkMode();

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  // Uncomment this block to handle errors
  // if (error) {
  //   return (
  //     <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
  //       <h1 className="text-2xl font-semibold">Error: {error}</h1>
  //     </div>
  //   );
  // }

  const isMuseumWaitingApproval = museum === null;

  if (isMuseumWaitingApproval) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <h1 className="text-2xl font-semibold">
          Waiting for admin to approve request
        </h1>
      </div>
    );
  }

  const isMuseumOpen = museum?.status !== "closed";

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-black' : 'bg-white text-gray-900'}`}> 
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
    </div>
  );
};

export default MuseumOwnerPage;

// Frontend\src\pages\MuseumOwnerPage.js
// import React from "react";
// import MuseumOwnerSideBar from "../components/museumOwner/MuseumOwnerSideBar";
// import { Outlet } from "react-router-dom";
// import MuseumOwnerHeader from "../components/museumOwner/MuseumOwnerHeader";
// import Footer from "../components/common/Footer";
// import { useMuseumContext } from "../contexts/MuseumContext";
// import { useDarkMode } from "../contexts/DarkModeContext";

// const MuseumOwnerPage = () => {
//   const { museum, isLoading, error } = useMuseumContext();
  
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
//       </div>
//     );
//   }


//   const isMuseumWaitingApproval = museum === null;

//   if (isMuseumWaitingApproval) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h1 className="text-2xl font-semibold text-gray-700">
//           Waiting for admin to approve request
//         </h1>
//       </div>
//     );
//   }

//   const isMuseumOpen = museum?.status !== "closed";

//   return (
//     <div className="flex h-screen"> 
//       <MuseumOwnerSideBar isMuseumOpen={isMuseumOpen} />
//       <div className="flex-1 flex flex-col">
//         <MuseumOwnerHeader />
//         <main className="flex-1 p-4 overflow-y-auto">
//           { isMuseumOpen ? (<Outlet/>) :
//             <div className="flex justify-center items-center h-full">
//               <h1 className="text-2xl font-semibold text-gray-700">
//                 Your Museum is currently closed
//               </h1>
//             </div>
//           }
//           {/* <Outlet/> */}
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default MuseumOwnerPage;
