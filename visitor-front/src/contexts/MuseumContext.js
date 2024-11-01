// import React, { createContext, useState, useContext } from 'react';

// const MuseumContext = createContext();

// export const MuseumProvider = ({ children }) => {
//   const [museum, setMuseum] = useState(null);
//   const [exhibitions, setExhibitions] = useState([]);

//   return (
//     <MuseumContext.Provider value={{ museum, setMuseum, exhibitions, setExhibitions }}>
//       {children}
//     </MuseumContext.Provider>
//   );
// };

// export const useMuseum = () => useContext(MuseumContext);


// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\contexts\MuseumContext.js

// import React, { createContext, useContext, useState } from "react";
// import { useMuseumApi } from "../hooks/useMuseumApi";

// const MuseumContext = createContext();

// export const useMuseum = () => useContext(MuseumContext);

// export const MuseumProvider = ({ children }) => {
//   const [museumData, setMuseumData] = useState(null);
//   const [exhibitions, setExhibitions] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { verifyPassword, fetchMuseumDetails, fetchExhibitionDetails } = useMuseumApi();

//   const login = async (museumName, password) => {
//     setLoading(true);
//     setError(null);
//     setMuseumData(null); // Clear existing data before fetching new data
//     try {
//       await verifyPassword(museumName, password);
//       const data = await fetchFullMuseumData(museumName);
//       setMuseumData(data.museum); // Set museum data
//       setExhibitions(data.exhibitions); // Set exhibitions data
//       setIsAuthenticated(true);
//     } catch (err) {
//       setError("Login failed. Please check your museum name and password.");
//       setIsAuthenticated(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch full museum data with embedded exhibitions details
//   const fetchFullMuseumData = async (museumName) => {
//     const museumData = await fetchMuseumDetails(museumName);
    
//     if (museumData.exhibitions && typeof museumData.exhibitions[0] === 'string') {
//       const detailedExhibitions = await Promise.all(
//         museumData.exhibitions.map((id) => fetchExhibitionDetails(id))
//       );
//       museumData.exhibitions = detailedExhibitions;
//     }

//     return museumData;
//   };

//   const logout = () => {
//     setMuseumData(null);
//     setExhibitions([]);
//     setIsAuthenticated(false);
//   };

//   return (
//     <MuseumContext.Provider
//       value={{
//         museumData,
//         exhibitions,
//         isAuthenticated,
//         loading,
//         error,
//         login,
//         logout,
//         setMuseum: setMuseumData, // Expose setMuseumData as setMuseum
//         setExhibitions, // Expose setExhibitions
//       }}
//     >
//       {children}
//     </MuseumContext.Provider>
//   );
// };


// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\contexts\MuseumContext.js

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useMuseumApi } from "../hooks/useMuseumApi";
import { useParams } from "react-router-dom";
import { useVisitor } from "./VisitorContext";
// import { useVisitor } from "./VisitorContext"; // Import VisitorContext for authentication status

const MuseumContext = createContext();

export const useMuseum = () => useContext(MuseumContext);

export const MuseumProvider = ({ children }) => {
  const [museumData, setMuseumData] = useState(null);
  const { museumName } = useParams();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchMuseumDetails, fetchExhibitionDetails } = useMuseumApi();
  const { isAuthenticated } = useVisitor(); // Only fetch data if authenticated

  
  

  const fetchFullMuseumData = useCallback(
    async (museumName) => {
      setLoading(true);
      setError(null);
      try {
        const museumData = await fetchMuseumDetails(museumName);
        if (museumData.exhibitions && typeof museumData.exhibitions[0] === "string") {
          const detailedExhibitions = await Promise.all(
            museumData.exhibitions.map((id) => fetchExhibitionDetails(id))
          );
          museumData.exhibitions = detailedExhibitions;
        }
        setMuseumData(museumData.museum);
        setExhibitions(museumData.exhibitions);
      } catch (err) {
        setError("Failed to fetch museum data. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [fetchMuseumDetails, fetchExhibitionDetails]
  );

  useEffect(() => {
    console.log(museumName)
    if (museumName && isAuthenticated) {
      fetchFullMuseumData(museumName); // Pass museumName to the fetch function
    }
  }, [museumName, fetchFullMuseumData, isAuthenticated]);
  
  const clearData = () => {
    setMuseumData(null);
    setExhibitions([]);
  };

  return (
    <MuseumContext.Provider
      value={{
        museumData,
        exhibitions,
        loading,
        error,
        fetchFullMuseumData,
        clearData,
      }}
    >
      {children}
    </MuseumContext.Provider>
  );
};
