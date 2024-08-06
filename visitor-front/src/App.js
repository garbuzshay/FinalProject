import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MuseumLoginPage from "./pages/MuseumLoginPage";
import MuseumPage from "./pages/MuseumPage";
import { MuseumProvider } from "./contexts/MuseumContext";
import ExhibitionPage from "./pages/ExhibitionPage";

const App = () => {
  return (
    <MuseumProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MuseumLoginPage />} />
          <Route path="/:museumName" element={<MuseumPage />}>
            <Route
              path="exhibitions/:exhibitionId"
              element={<ExhibitionPage />}
            />
          </Route>
          {/* Other routes... */}
        </Routes>
      </Router>
    </MuseumProvider>
  );
};

export default App;
