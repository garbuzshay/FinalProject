
// import React from "react";
// import AdminHeader from "../components/admin/AdminHeader";
// import { Outlet } from "react-router-dom";
// import Footer from "../components/common/Footer";
// import { useThemeMode } from "../contexts/DarkModeContext";
// import { useLang } from "../contexts/LangContext"; // Import Language context

// const AdminPage = () => {
//   const { isDarkMode } = useThemeMode();
//   const { language } = useLang(); // Get current language

//   const isHebrew = language === "he"; // Check if the current language is Hebrew

//   return (
//     <div className={`flex h-screen w-full ${isDarkMode ? 'bg-gray-900 text-black' : 'bg-gray-100 text-gray-900'}`}>
//       {/* Sidebar is on the left for English and on the right for Hebrew */}
//       {isHebrew ? (
//         <>
//           <div className="flex-1 flex flex-col ">
//             <AdminHeader />
//             <main className="flex-1 p-4 overflow-y-auto">
//               <Outlet />
//             </main>
//             <Footer />
//           </div>
       
//         </>
//       ) : (
//         <>
//           <div className="flex-1 flex flex-col">
//             <AdminHeader />
//             <main className="flex-1 p-4 overflow-y-auto">
//               <Outlet />
//             </main>
//             <Footer />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminPage;


import React from "react";
import AdminHeader from "../components/admin/AdminHeader";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useThemeMode } from "../contexts/DarkModeContext";

const AdminPage = () => {
  const { isDarkMode } = useThemeMode();
  
  return (
    <div className={`flex h-screen w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;
