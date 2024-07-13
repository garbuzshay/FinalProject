import React from "react";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPage from "./pages/AdminPage";
import AdminDashboard from './components/admin/AdminDashboard';
import AdminExhibitList from './components/admin/AdminExhibitList';
import AdminUserList from './components/admin/AdminUserList';
import AdminLogin from './components/admin/AdminLogin';
import AdminMuseumList from './components/admin/AdminMuseumList';
import AdminTermsPricesPackages from './components/admin/AdminTermsPricesPackages';
import AdminRequestsManagement from "./components/admin/AdminRequestsManagement ";
import MusuemOwnerPage from "./pages/MusuemOwnerPage";
import CuartorPage from "./pages/CuartorPage";
import MuseumOwnerOpenExhibit from "./components/museumOwner/MuseumOwnerOpenExhibit";
const App = () => {
  return (
    <div className="App">
      
      <Routes>
        
        <Route path="/" element={<IntroPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="museums" element={<AdminMuseumList />} />
          <Route path="exhibitions" element={<AdminExhibitList />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="terms-prices-packages" element={<AdminTermsPricesPackages />} />
          <Route path="requests" element={<AdminRequestsManagement />} />
          <Route path="" element={<AdminLogin />} />
        </Route>
        <Route path="/owner" element={<MusuemOwnerPage />}>
          <Route path='open-exhibit' element={<MuseumOwnerOpenExhibit />} />
        
    
        </Route>
        <Route path="/curator" element={<CuartorPage />}>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
