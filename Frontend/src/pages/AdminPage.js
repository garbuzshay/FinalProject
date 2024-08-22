// // AdminPage.js
// import React from "react";
// import AdminSideBar from "../components/admin/AdminSideBar";
// import AdminHeader from "../components/admin/AdminHeader";
// import { Outlet } from "react-router-dom";
// import Footer from "../components/common/Footer";
// import { useDarkMode } from "../contexts/DarkModeContext";


// const AdminPage = () => {
//   const { isDarkMode } = useDarkMode();
//   return (
//     <div className="flex h-screen">

//       <AdminSideBar/>
//       <div className="flex-1 flex flex-col">
//         <AdminHeader /> 
//         <main className="flex-1 p-4 overflow-y-auto">
//           <Outlet />
//         </main>
//       <Footer/>
//       </div>

//     </div>
    
//   );
// };

// export default AdminPage;

// AdminPage.js
import React from "react";
import AdminSideBar from "../components/admin/AdminSideBar";
import AdminHeader from "../components/admin/AdminHeader";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useDarkMode } from "../contexts/DarkModeContext";

const AdminPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-black' : 'bg-gray-100 text-gray-900'}`}>
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 overflow-y-auto ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;
