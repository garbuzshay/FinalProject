// import React from "react";
// import MuseumOwnerSideBar from "../components/museumOwner/MuseumOwnerSideBar";
// import { Outlet } from "react-router-dom";
// import MuseumOwnerHeader from "../components/museumOwner/MuseumOwnerHeader";
// import Footer from "../components/common/Footer";
// import { useUserContext } from "../contexts/UserContext";

// const MusuemOwnerPage = () => {
//   const { user } = useUserContext();
//   const isMuseumApproved = user.museum;

//   return (
//     <div className="flex h-screen">
//       <MuseumOwnerSideBar isMuseumApproved={isMuseumApproved } />
//       <div className="flex-1 flex flex-col">
//         <MuseumOwnerHeader />
//         <main className="flex-1 p-4 overflow-y-auto">
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default MusuemOwnerPage;

import React from "react";
import MuseumOwnerSideBar from "../components/museumOwner/MuseumOwnerSideBar";
import { Outlet } from "react-router-dom";
import MuseumOwnerHeader from "../components/museumOwner/MuseumOwnerHeader";
import Footer from "../components/common/Footer";
import { useUserContext } from "../contexts/UserContext";

const MuseumOwnerPage = () => {
  const { user } = useUserContext();
  const isMuseumApproved = user.museum;

  return (
    <div className="flex h-screen">
      <MuseumOwnerSideBar isMuseumApproved={isMuseumApproved} />
      <div className="flex-1 flex flex-col">
        <MuseumOwnerHeader />
        <main className="flex-1 p-4 overflow-y-auto">
          {isMuseumApproved ? (
            <Outlet />
          ) : (
            <div className="flex justify-center items-center h-full">
              <h1 className="text-2xl font-semibold text-gray-700">
                Waiting for admin to approve request
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
