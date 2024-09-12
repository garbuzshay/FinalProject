// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import IntroPage from "./pages/IntroPage";
// import RegistrationPage from "./pages/RegistrationPage";
// import AdminPage from "./pages/AdminPage";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import AdminExhibitList from "./components/admin/AdminExhibitList";
// import AdminUserList from "./components/admin/AdminUserList";
// import AdminLogin from "./components/admin/AdminLogin";
// import AdminMuseumList from "./components/admin/AdminMuseumList";
// import AdminTermsPricesPackages from "./components/admin/AdminTermsPricesPackages";
// import AdminRequestsManagement from "./components/admin/AdminRequestsManagement ";
// import MusuemOwnerPage from "./pages/MusuemOwnerPage";
// import CuartorPage from "./pages/CuartorPage";
// import MuseumOwnerOpenExhibit from "./components/museumOwner/MuseumOwnerOpenExhibit";
// import MuseumOwnerExhibitionsList from "./components/museumOwner/MuseumOwnerExhibitionsList";
// import PrivateRoute from "./utils/PrivateRoute";
// import Unauthorized from "./pages/Unauthorized";
// import Login from "./components/common/Login";
// import Logout from "./pages/LogoutPage";
// import ResetPassword from "./components/common/ResetPassword";
// import MuseumOwnerEditExhibition from "./components/museumOwner/MuseumOwnerEditExhibition";
// import MuseumOwnerContactUs from "./components/museumOwner/MuseumOwnerConatctUs";
// import CuratorContactUs from "./components/curator/CuratorContactUs";
// import CuratorExhibitionsList from "./components/curator/CuratorExhibitionsList";
// import CuratorManageExhibit from "./components/curator/CuratorManageExhibit";
// import MuseumOwnerCuratorsList from "./components/museumOwner/MuseumOwnerCuratorsList.js";
// import { ExhibitionsProvider } from "./contexts/ExhibitionsContext";
// import { MuseumProvider } from "./contexts/MuseumContext"; // Import the MuseumProvider
// import MuseumOwnerDashboard from "./components/museumOwner/MuseumOwnerDashboard.js";
// import { AdminProvider } from "./contexts/AdminContext.js";
// import CuratorEditArtwork from "./components/curator/CuratorEditArtwork.js";
// import MuseumOwnerWatchArtworks from "./components/museumOwner/MuseumOwnerWatchArtworks.js";
// import MuseumOwnerTabs from "./components/museumOwner/MuseumOwnerTabs.js";
// import MuseumOwnerEditArtwork from "./components/museumOwner/MuseumOwnerEditArtwork.js";


// const App = () => {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<IntroPage />} />
//         <Route path="/register" element={<RegistrationPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute requiredRole="Admin">
//               <AdminProvider>
//                 <AdminPage />
//               </AdminProvider>
//             </PrivateRoute>
//           }
//         >
//           <Route path="" element={<AdminDashboard />} />
//           <Route path="museums" element={<AdminMuseumList />} />
//           <Route path="exhibitions" element={<AdminExhibitList />} />
//           <Route path="users" element={<AdminUserList />} />
//           <Route
//             path="terms-prices-packages"
//             element={<AdminTermsPricesPackages />}
//           />
//           <Route path="requests" element={<AdminRequestsManagement />} />
//           {/* <Route path="" element={<AdminLogin />} /> */}
//         </Route>
//         <Route
//           path="/owner"
//           element={
//             <PrivateRoute requiredRole="MuseumOwner">
//               <MuseumProvider role="MuseumOwner">
//                 <MusuemOwnerPage />
//               </MuseumProvider>
//             </PrivateRoute>
//           }
//         >
//           <Route path="" element={<MuseumOwnerDashboard />} />
//           <Route path="open-exhibit" element={<MuseumOwnerOpenExhibit />} />
//           <Route
//             path="exhibitions"
//             element={<MuseumOwnerExhibitionsList />}
//           />
//           {/* <Route
//             path="exhibitions/:id"
//             element={<MuseumOwnerEditExhibition />}
//           />
//           <Route path="exhibitions/:id/artworks" element={<MuseumOwnerWatchArtworks />} /> */}
//          <Route path="exhibitions/:id/*" element={<MuseumOwnerTabs />}>
//             <Route index element={<Navigate to="artworks" replace />} />
//             <Route path="edit" element={<MuseumOwnerEditExhibition />} />
//             <Route path="artworks" element={<MuseumOwnerWatchArtworks />} />
//              <Route path="artworks/:artworkId" element={<MuseumOwnerEditArtwork/>} />
//           </Route>
//           <Route path="contact-us" element={<MuseumOwnerContactUs />} />
//           <Route path="my-curators" element={<MuseumOwnerCuratorsList />} />

//         </Route>
//         <Route
//           path="/curator"
//           element={
//             <PrivateRoute requiredRole="Curator">
//               <MuseumProvider role="Curator">
//                 <CuartorPage />
//               </MuseumProvider>
//             </PrivateRoute>
//           }
//         >
//          <Route index element={<Navigate to="exhibitions" replace />} />
//           <Route path="exhibitions" element={<CuratorExhibitionsList />} />
//           <Route path="exhibitions/:id" element={<CuratorManageExhibit />} />
//           <Route path="exhibitions/:exhibitionId/:artworkId" element={<CuratorEditArtwork />} />
//           <Route path="contact-us" element={<CuratorContactUs />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;


import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPage from "./pages/AdminPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminExhibitList from "./components/admin/AdminExhibitList";
import AdminUserList from "./components/admin/AdminUserList";
import AdminLogin from "./components/admin/AdminLogin";
import AdminMuseumList from "./components/admin/AdminMuseumList";
import AdminTermsPricesPackages from "./components/admin/AdminTermsPricesPackages";
import AdminRequestsManagement from "./components/admin/AdminRequestsManagement ";
import MusuemOwnerPage from "./pages/MusuemOwnerPage";
import CuartorPage from "./pages/CuartorPage";
import MuseumOwnerOpenExhibit from "./components/museumOwner/MuseumOwnerOpenExhibit";
import MuseumOwnerExhibitionsList from "./components/museumOwner/MuseumOwnerExhibitionsList";
import PrivateRoute from "./utils/PrivateRoute";
import Unauthorized from "./pages/Unauthorized";
import Login from "./components/common/Login";
import Logout from "./pages/LogoutPage";
import ResetPassword from "./components/common/ResetPassword";
import MuseumOwnerEditExhibition from "./components/museumOwner/MuseumOwnerEditExhibition";
import MuseumOwnerContactUs from "./components/museumOwner/MuseumOwnerConatctUs";
import CuratorContactUs from "./components/curator/CuratorContactUs";
import CuratorExhibitionsList from "./components/curator/CuratorExhibitionsList";
import CuratorManageExhibit from "./components/curator/CuratorManageExhibit";
import MuseumOwnerCuratorsList from "./components/museumOwner/MuseumOwnerCuratorsList.js";
import { ExhibitionsProvider } from "./contexts/ExhibitionsContext";
import { MuseumProvider } from "./contexts/MuseumContext"; // Import the MuseumProvider
import MuseumOwnerDashboard from "./components/museumOwner/MuseumOwnerDashboard.js";
import { AdminProvider } from "./contexts/AdminContext.js";
import CuratorEditArtwork from "./components/curator/CuratorEditArtwork.js";
import MuseumOwnerWatchArtworks from "./components/museumOwner/MuseumOwnerWatchArtworks.js";
import MuseumOwnerTabs from "./components/museumOwner/MuseumOwnerTabs.js";
import MuseumOwnerEditArtwork from "./components/museumOwner/MuseumOwnerEditArtwork.js";
import MuseumOwnerEditDetails from "./components/museumOwner/MuseumOwnerEditDetails.js";
import AdminEditMuseum from "./components/admin/AdminEditMuseum.js";
import MuseumOwnerCreateArtwork from "./components/museumOwner/MuseumOwnerCreateArtwork.js";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import CuratorEditExhibition from "./components/curator/CuratorEditExhibition.js";

const App = () => {
  return (
    <DarkModeProvider> {/* Wrap the entire app in DarkModeProvider */}
    <div className="App">
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="Admin">
              <AdminProvider>
                <AdminPage />
              </AdminProvider>
            </PrivateRoute>
          }
        >
          <Route path="" element={<AdminDashboard />} />
          <Route path="museums" element={<AdminMuseumList />} />
          <Route path="exhibitions" element={<AdminExhibitList />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="museums/edit/:id" element={<AdminEditMuseum />} />
          <Route
            path="terms-prices-packages"
            element={<AdminTermsPricesPackages />}
          />
          <Route path="requests" element={<AdminRequestsManagement />} />
        </Route>
        <Route
          path="/owner"
          element={
            <PrivateRoute requiredRole="MuseumOwner">
              <MuseumProvider role="MuseumOwner">
                <MusuemOwnerPage />
              </MuseumProvider>
            </PrivateRoute>
          }
        >
          <Route path="" element={<MuseumOwnerDashboard />} />
          <Route path="open-exhibit" element={<MuseumOwnerOpenExhibit />} />
          <Route
            path="exhibitions"
            element={<MuseumOwnerExhibitionsList />}
          />
          <Route path="edit-details" element={<MuseumOwnerEditDetails />} />
          {/* <Route
            path="exhibitions/:id"
            element={<MuseumOwnerEditExhibition />}
          />
          <Route path="exhibitions/:id/artworks" element={<MuseumOwnerWatchArtworks />} /> */}
         <Route path="exhibitions/:id/*" element={<MuseumOwnerTabs />}>
            <Route index element={<Navigate to="artworks" replace />} />
            <Route path="edit" element={<MuseumOwnerEditExhibition />} />
            <Route path="artworks" element={<MuseumOwnerWatchArtworks />} />
         
             <Route path="artworks/:artworkId" element={<MuseumOwnerEditArtwork/>} />
             <Route path="add-artwork" element={<MuseumOwnerCreateArtwork/>}/>
            
          </Route>
          
          <Route path="contact-us" element={<MuseumOwnerContactUs />} />
          <Route path="my-curators" element={<MuseumOwnerCuratorsList />} />

        </Route>
        <Route
          path="/curator"
          element={
            <PrivateRoute requiredRole="Curator">
              <MuseumProvider role="Curator">
                <CuartorPage />
              </MuseumProvider>
            </PrivateRoute>
          }
        >
         <Route index element={<Navigate to="exhibitions" replace />} />
          <Route path="exhibitions" element={<CuratorExhibitionsList />} />
          <Route path="exhibitions/:id" element={<CuratorManageExhibit />} />
          <Route path="exhibitions/edit/:id" element={<CuratorEditExhibition  />} />
          <Route path="exhibitions/:exhibitionId/:artworkId" element={<CuratorEditArtwork />} />
          <Route path="contact-us" element={<CuratorContactUs />} />
        </Route>
      </Routes>
    </div>
    </DarkModeProvider>
  );
};

export default App;


