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
import { ExhibitionsProvider } from './contexts/ExhibitionsContext';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/admin/login" element={<Login requiredRole="Admin" />} />
        <Route path="/owner/login" element={<Login requiredRole="MuseumOwner" />} />
        <Route path="/curator/login" element={<Login requiredRole="Curator" />} /> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="Admin">
              <AdminPage />
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
              <MusuemOwnerPage />
            </PrivateRoute>
          }
        >
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
        </Route>
        {/* <Route
          path="/curator"
          element={
            <PrivateRoute requiredRole="Curator">
              <CuartorPage />
            </PrivateRoute>
          }
        >
          <Route path="exhibiton-list" element={<CuratorExhibitionsList />} />
          <Route path="exhibiton-list/:id" element={<CuratorArtsList />} />
          <Route path="contact-us" element={<CuratorContactUs />} />
        </Route> */}
         <Route
          path="/curator"
          element={
            <PrivateRoute requiredRole="Curator">
              <CuartorPage />
            </PrivateRoute>
          }
        >
          <Route path="*" element={
            <ExhibitionsProvider>
              <Routes>
                <Route path="exhibiton-list" element={<CuratorExhibitionsList />} />
                <Route path="exhibiton-list/:id" element={<CuratorArtsList />} />
                <Route path="contact-us" element={<CuratorContactUs />} />
              </Routes>
            </ExhibitionsProvider>
          } />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
