import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MuseumLoginPage from "./pages/MuseumLoginPage";
import MuseumPage from "./pages/MuseumPage";
import { MuseumProvider } from "./contexts/MuseumContext";
import ExhibitionPage from "./pages/ExhibitionPage";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <MuseumProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MuseumLoginPage />} />

          {/* Landing Page for each museum */}
          <Route path="/:museumName" element={<LandingPage />} />

          {/* Museum Exhibitions list */}
          <Route path="/:museumName/exhibitions" element={<MuseumPage />} />

          {/* Single Exhibition Details */}
          <Route
            path="/:museumName/exhibitions/:exhibitionId"
            element={<ExhibitionPage />}
          />
          {/* Other routes... */}
        </Routes>
      </Router>
    </MuseumProvider>
  );
};

export default App;
