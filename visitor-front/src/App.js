// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import MuseumLoginPage from "./pages/MuseumLoginPage";
// import MuseumPage from "./pages/MuseumPage";
// import { MuseumProvider } from "./contexts/MuseumContext";
// import ExhibitionPage from "./pages/ExhibitionPage";
// import LandingPage from "./components/LandingPage";

// const App = () => {
//   return (
//     <MuseumProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<MuseumLoginPage />} />

//           {/* Landing Page for each museum */}
//           <Route path="/:museumName" element={<LandingPage />} />

//           {/* Museum Exhibitions list */}
//           <Route path="/:museumName/exhibitions" element={<MuseumPage />} />

//           {/* Single Exhibition Details */}
//           <Route
//             path="/:museumName/exhibitions/:exhibitionId"
//             element={<ExhibitionPage />}
//           />
//           {/* Other routes... */}
//         </Routes>
//       </Router>
//     </MuseumProvider>
//   );
// };

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import MuseumLoginPage from "./pages/MuseumLoginPage";
// import MuseumPage from "./pages/MuseumPage";
// import { MuseumProvider } from "./contexts/MuseumContext";
// import ExhibitionPage from "./pages/ExhibitionPage";
// import LandingPage from "./components/LandingPage";

// const App = () => {
//   return (
//     <MuseumProvider>
//       <Router>
//         <Routes>
//           {/* Museum login page for admin/museum owner */}
//           <Route path="/" element={<MuseumLoginPage />} />

//           {/* Landing Page for each museum */}
//           <Route path="/:museumName" element={<LandingPage />} />

//           {/* Museum Exhibitions list */}
//           <Route path="/:museumName/exhibitions" element={<MuseumPage />} />

//           {/* Single Exhibition Details */}
//           <Route
//             path="/:museumName/exhibitions/:exhibitionId"
//             element={<ExhibitionPage />}
//           />

//           {/* Other routes... */}
//         </Routes>
//       </Router>
//     </MuseumProvider>
//   );
// };

// export default App;

// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\App.js
// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\App.js

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
