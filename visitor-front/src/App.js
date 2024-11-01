
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MuseumLoginPage from "./pages/MuseumLoginPage";
import MuseumPage from "./pages/MuseumPage";
import ExhibitionPage from "./pages/ExhibitionPage";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { VisitorProvider } from "./contexts/VisitorContext";
import MuseumLayout from "./components/MuseumLayout";

const App = () => {
  return (
    <VisitorProvider>
      <Router>
        <Routes>
          {/* Public route for login */}
          <Route path="/" element={<MuseumLoginPage />} />

          {/* Protected museum-specific routes under MuseumLayout */}
          <Route
            path="/:museumName"
            element={
              <ProtectedRoute>
                <MuseumLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<LandingPage />} /> {/* Default museum landing page */}
            <Route path="exhibitions" element={<MuseumPage />} /> {/* Museum exhibitions page */}
            <Route path="exhibitions/:exhibitionId" element={<ExhibitionPage />} /> {/* Exhibition details */}
          </Route>
        </Routes>
      </Router>
    </VisitorProvider>
  );
};

export default App;
