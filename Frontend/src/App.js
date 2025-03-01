
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPage from "./pages/AdminPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminExhibitList from "./components/admin/AdminExhibitList";
import AdminUserList from "./components/admin/AdminUserList";
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
import { ThemeProvider } from "./contexts/DarkModeContext";
import CuratorEditExhibition from "./components/curator/CuratorEditExhibition.js";
import AdminEditExhibit from "./components/admin/AdminEditExhibit.js";
import AdminStatistics from "./components/admin/AdminStatistics.js";
import AdminViewExhibition from "./components/admin/AdminViewExhibition.js";
import { LangProvider } from "./contexts/LangContext.js";
import MuseumOwnerEditInfo from "./components/museumOwner/MuseumOwnerEditInfo.js";
import CuratorEditInfo from "./components/curator/CuratorEditInfo.js";
import { useUserContext } from "./contexts/UserContext.js";
import { rolePaths } from "./data/rolePaths.js";

const App = () => {
  const { user, loading } = useUserContext(); // Add this line to get user context

  // Add this function to handle login page redirect
  const LoginWrapper = () => {
    if (loading) return <div>Loading...</div>;

    if (user) {
      const dashboardPath =
        rolePaths[user.role.roleName]?.dashboard || "/unauthorized";
      return <Navigate to={dashboardPath} replace />;
    }

    return <Login />;
  };

  return (
    <ThemeProvider>
      {" "}
      {/* Wrap the entire app in ThemeProvider */}
      <LangProvider>
        {" "}
        {/* Wrap the entire app in LangProvider */}
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginWrapper />} />
            <Route path="/login" element={<LoginWrapper />} />

            
            <Route path="/intro" element={<IntroPage />} />
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
              <Route
                path="museums/edit-museum/:id"
                element={<AdminEditMuseum />}
              />
              <Route
                path="exhibitions/edit-exhibit/:id"
                element={<AdminEditExhibit />}
              />
              <Route path="exhibitions/:id" element={<AdminViewExhibition />} />
              <Route
                path="terms-prices-packages"
                element={<AdminTermsPricesPackages />}
              />
              <Route path="requests" element={<AdminRequestsManagement />} />
              <Route path="statistics" element={<AdminStatistics />} />
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
              <Route path="edit-info" element={<MuseumOwnerEditInfo />} />
              <Route path="exhibitions/:id/*" element={<MuseumOwnerTabs />}>
                <Route index element={<Navigate to="artworks" replace />} />
                <Route path="edit" element={<MuseumOwnerEditExhibition />} />
                <Route path="artworks" element={<MuseumOwnerWatchArtworks />} />

                <Route
                  path="artworks/:artworkId"
                  element={<MuseumOwnerEditArtwork />}
                />
                <Route
                  path="add-artwork"
                  element={<MuseumOwnerCreateArtwork />}
                />
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
              <Route
                path="exhibitions/:id"
                element={<CuratorManageExhibit />}
              />
              <Route
                path="exhibitions/edit/:id"
                element={<CuratorEditExhibition />}
              />

              <Route
                path="exhibitions/:exhibitionId/:artworkId"
                element={<CuratorEditArtwork />}
              />
              <Route path="edit-info" element={<CuratorEditInfo />} />
              <Route path="contact-us" element={<CuratorContactUs />} />
            </Route>
          </Routes>
        </div>
      </LangProvider>
    </ThemeProvider>
  );
};

export default App;




// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import IntroPage from "./pages/IntroPage";
// import RegistrationPage from "./pages/RegistrationPage";
// import AdminPage from "./pages/AdminPage";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import AdminExhibitList from "./components/admin/AdminExhibitList";
// import AdminUserList from "./components/admin/AdminUserList";
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
// import { MuseumProvider } from "./contexts/MuseumContext"; // Import the MuseumProvider
// import MuseumOwnerDashboard from "./components/museumOwner/MuseumOwnerDashboard.js";
// import { AdminProvider } from "./contexts/AdminContext.js";
// import CuratorEditArtwork from "./components/curator/CuratorEditArtwork.js";
// import MuseumOwnerWatchArtworks from "./components/museumOwner/MuseumOwnerWatchArtworks.js";
// import MuseumOwnerTabs from "./components/museumOwner/MuseumOwnerTabs.js";
// import MuseumOwnerEditArtwork from "./components/museumOwner/MuseumOwnerEditArtwork.js";
// import MuseumOwnerEditDetails from "./components/museumOwner/MuseumOwnerEditDetails.js";
// import AdminEditMuseum from "./components/admin/AdminEditMuseum.js";
// import MuseumOwnerCreateArtwork from "./components/museumOwner/MuseumOwnerCreateArtwork.js";
// import { ThemeProvider } from "./contexts/DarkModeContext";
// import CuratorEditExhibition from "./components/curator/CuratorEditExhibition.js";
// import AdminEditExhibit from "./components/admin/AdminEditExhibit.js";
// import AdminStatistics from "./components/admin/AdminStatistics.js";
// import AdminViewExhibition from "./components/admin/AdminViewExhibition.js";
// import { LangProvider } from "./contexts/LangContext.js";
// import MuseumOwnerEditInfo from "./components/museumOwner/MuseumOwnerEditInfo.js";
// import CuratorEditInfo from "./components/curator/CuratorEditInfo.js";

// const App = () => {
//   return (
//     <ThemeProvider>
//       {" "}
//       {/* Wrap the entire app in ThemeProvider */}
//       <LangProvider>
//         {" "}
//         {/* Wrap the entire app in LangProvider */}
//         <div className="App">
//           <Routes>
//             <Route path="/intro" element={<IntroPage />} />
//             <Route path="/" element={<Login />} />
//             <Route path="/register" element={<RegistrationPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/logout" element={<Logout />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/unauthorized" element={<Unauthorized />} />
//             <Route
//               path="/admin"
//               element={
//                 <PrivateRoute requiredRole="Admin">
//                   <AdminProvider>
//                     <AdminPage />
//                   </AdminProvider>
//                 </PrivateRoute>
//               }
//             >
//               <Route path="" element={<AdminDashboard />} />
//               <Route path="museums" element={<AdminMuseumList />} />
//               <Route path="exhibitions" element={<AdminExhibitList />} />
//               <Route path="users" element={<AdminUserList />} />
//               <Route
//                 path="museums/edit-museum/:id"
//                 element={<AdminEditMuseum />}
//               />
//               <Route
//                 path="exhibitions/edit-exhibit/:id"
//                 element={<AdminEditExhibit />}
//               />
//               <Route path="exhibitions/:id" element={<AdminViewExhibition />} />
//               <Route
//                 path="terms-prices-packages"
//                 element={<AdminTermsPricesPackages />}
//               />
//               <Route path="requests" element={<AdminRequestsManagement />} />
//               <Route path="statistics" element={<AdminStatistics />} />
//             </Route>
//             <Route
//               path="/owner"
//               element={
//                 <PrivateRoute requiredRole="MuseumOwner">
//                   <MuseumProvider role="MuseumOwner">
//                     <MusuemOwnerPage />
//                   </MuseumProvider>
//                 </PrivateRoute>
//               }
//             >
//               <Route path="" element={<MuseumOwnerDashboard />} />
//               <Route path="open-exhibit" element={<MuseumOwnerOpenExhibit />} />
//               <Route
//                 path="exhibitions"
//                 element={<MuseumOwnerExhibitionsList />}
//               />
//               <Route path="edit-details" element={<MuseumOwnerEditDetails />} />
//               <Route path="edit-info" element={<MuseumOwnerEditInfo />} />
//               <Route path="exhibitions/:id/*" element={<MuseumOwnerTabs />}>
//                 <Route index element={<Navigate to="artworks" replace />} />
//                 <Route path="edit" element={<MuseumOwnerEditExhibition />} />
//                 <Route path="artworks" element={<MuseumOwnerWatchArtworks />} />

//                 <Route
//                   path="artworks/:artworkId"
//                   element={<MuseumOwnerEditArtwork />}
//                 />
//                 <Route
//                   path="add-artwork"
//                   element={<MuseumOwnerCreateArtwork />}
//                 />
//               </Route>

//               <Route path="contact-us" element={<MuseumOwnerContactUs />} />
//               <Route path="my-curators" element={<MuseumOwnerCuratorsList />} />
//             </Route>
//             <Route
//               path="/curator"
//               element={
//                 <PrivateRoute requiredRole="Curator">
//                   <MuseumProvider role="Curator">
//                     <CuartorPage />
//                   </MuseumProvider>
//                 </PrivateRoute>
//               }
//             >
//               <Route index element={<Navigate to="exhibitions" replace />} />
//               <Route path="exhibitions" element={<CuratorExhibitionsList />} />
//               <Route
//                 path="exhibitions/:id"
//                 element={<CuratorManageExhibit />}
//               />
//               <Route
//                 path="exhibitions/edit/:id"
//                 element={<CuratorEditExhibition />}
//               />

//               <Route
//                 path="exhibitions/:exhibitionId/:artworkId"
//                 element={<CuratorEditArtwork />}
//               />
//               <Route path="edit-info" element={<CuratorEditInfo />} />
//               <Route path="contact-us" element={<CuratorContactUs />} />
//             </Route>
//           </Routes>
//         </div>
//       </LangProvider>
//     </ThemeProvider>
//   );
// };

// export default App;
