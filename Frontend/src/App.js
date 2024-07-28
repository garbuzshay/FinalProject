import React from "react";
import { Route, Routes } from "react-router-dom";
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
import CuratorArtsList from "./components/curator/CuratorArtsList";
import MuseumOwnerCuratorsList from "./components/museumOwner/MuseumOwnerCuratorsList.js";
import { ExhibitionsProvider } from "./contexts/ExhibitionsContext";
import { MuseumProvider } from "./contexts/MuseumContext"; // Import the MuseumProvider
import MuseumOwnerDashboard from "./components/museumOwner/MuseumOwnerDashboard.js";
import { AdminProvider } from "./contexts/AdminContext.js";
import CuratorEditArtwork from "./components/curator/CuratorEditArtwork.js";


const App = () => {
  return (
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
          <Route
            path="terms-prices-packages"
            element={<AdminTermsPricesPackages />}
          />
          <Route path="requests" element={<AdminRequestsManagement />} />
          {/* <Route path="" element={<AdminLogin />} /> */}
        </Route>
        <Route
          path="/owner"
          element={
            <PrivateRoute requiredRole="MuseumOwner">
              <MuseumProvider>
                <MusuemOwnerPage />
              </MuseumProvider>
            </PrivateRoute>
          }
        >
          <Route path="" element={<MuseumOwnerDashboard />} />
          <Route path="open-exhibit" element={<MuseumOwnerOpenExhibit />} />
          <Route
            path="exhibiton-list"
            element={<MuseumOwnerExhibitionsList />}
          />
          <Route
            path="exhibiton-list/:id"
            element={<MuseumOwnerEditExhibition />}
          />
          <Route path="contact-us" element={<MuseumOwnerContactUs />} />
          <Route path="my-curators" element={<MuseumOwnerCuratorsList />} />
        </Route>
        <Route
          path="/curator"
          element={
            <PrivateRoute requiredRole="Curator">
              <ExhibitionsProvider>
                <CuartorPage />
              </ExhibitionsProvider>
            </PrivateRoute>
          }
        >
          <Route path="exhibiton-list" element={<CuratorExhibitionsList />} />
          <Route path="exhibiton-list/:id" element={<CuratorArtsList />} />
          <Route path="exhibiton-list/:exhibitionId/:artworkId" element={<CuratorEditArtwork />} />
          <Route path="contact-us" element={<CuratorContactUs />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;


