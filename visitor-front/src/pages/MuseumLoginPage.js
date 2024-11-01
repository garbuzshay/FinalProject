// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useMuseumApi } from '../hooks/useMuseumApi';
// import { useMuseum } from '../contexts/MuseumContext';

// const MuseumLoginPage = () => {
//   const [museumName, setMuseumName] = useState('');
//   const [password, setPassword] = useState('');
//   const { verifyPassword } = useMuseumApi();
//   const { setMuseum, setExhibitions } = useMuseum();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await verifyPassword(museumName, password);
//       setMuseum(data);
//       setExhibitions(data.exhibitions);
//       navigate(`/${data.name}`);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-4">Login to Museum</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Museum Name"
//             value={museumName}
//             onChange={(e) => setMuseumName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
//             Login
//           </button>
//         </form>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default MuseumLoginPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useVisitor } from "../contexts/VisitorContext";

// const MuseumLoginPage = () => {
//   const [museumName, setMuseumName] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, loading, error } = useVisitor();
//   const navigate = useNavigate();
//   const [localError, setLocalError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Attempt login via context function
//       await login(museumName, password);
//       navigate(`/${museumName}`);
//     } catch (err) {
//       setLocalError(
//         "Failed to log in. Please check your museum name and password."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-4">Login to Museum</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Museum Name"
//             value={museumName}
//             onChange={(e) => setMuseumName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-500 text-white py-2 rounded-lg"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         {localError && <p className="text-red-500 mt-4">{localError}</p>}
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default MuseumLoginPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVisitor } from "../contexts/VisitorContext";


const MuseumLoginPage = () => {
  const [museumName, setMuseumName] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useVisitor();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");

  // Auto-login if URL contains museumName and password
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const autoMuseumName = params.get("museumName");
    const autoPassword = params.get("password");

    if (autoMuseumName && autoPassword) {
      setMuseumName(autoMuseumName);
      setPassword(autoPassword);

      // Trigger login with URL parameters
      handleAutoLogin(autoMuseumName, autoPassword);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAutoLogin = async (autoMuseumName, autoPassword) => {
    try {
      await login(autoMuseumName, autoPassword);
      navigate(`/${autoMuseumName}`);
    } catch (err) {
      setLocalError("Auto-login failed. Please enter your credentials manually.");
    }
  };

  useEffect(() => {
    // Redirect to the museum page if a valid token already exists
    if (validateMuseumToken()) {
      const savedMuseumData = JSON.parse(localStorage.getItem('museumData'));
      if (savedMuseumData && savedMuseumData.museum) {
        navigate(`/${savedMuseumData.museum.name}`);
      }
    }
  }, [navigate, validateMuseumToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(museumName, password);
      navigate(`/${museumName}`);
    } catch (err) {
      setLocalError("Failed to log in. Please check your museum name and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login to Museum</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Museum Name"
            value={museumName}
            onChange={(e) => setMuseumName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {localError && <p className="text-red-500 mt-4">{localError}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default MuseumLoginPage;
