// import { useState, useCallback } from "react";
// import museumApi from "../api/museumApi";

// export const useMuseumApi = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const verifyPassword = useCallback(
//     async (museumName, password) => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await museumApi.verifyMuseumPassword(museumName, password);
//         return data;
//       } catch (err) {
//         setError(err.response.data.message);
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [setLoading, setError]
//   );

//   const fetchMuseumDetails = useCallback(
//     async (museumName) => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await museumApi.getMuseumDetails(museumName);
//         return data;
//       } catch (err) {
//         setError(err.response.data.message);
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [setLoading, setError]
//   );

//   const fetchExhibitionDetails = useCallback(
//     async (exhibitionId) => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await museumApi.getExhibitionDetails(exhibitionId);
//         return data;
//       } catch (err) {
//         setError(err.response.data.message);
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [setLoading, setError]
//   );

//   return {
//     loading,
//     error,
//     verifyPassword,
//     fetchMuseumDetails,
//     fetchExhibitionDetails,
//   };
// };



import { useCallback } from "react";
import museumApi from "../api/museumApi";

export const useMuseumApi = () => {
  // Verifies museum password and returns login data
  const verifyPassword = useCallback(async (museumName, password) => {
    try {
      const response = await museumApi.verifyMuseumPassword(museumName, password);
      return response;
    } catch (error) {
      console.error("Error verifying museum password:", error);
      throw error;
    }
  }, []);

  // Fetches full museum details
  const getMuseumDetails = useCallback(async (museumName) => {
    try {
      const response = await museumApi.getMuseumDetails(museumName);
      return response;
    } catch (error) {
      console.error(`Error getting museum details for ${museumName}:`, error);
      throw error;
    }
  }, []);

  return {
    verifyPassword,
    getMuseumDetails,  // Ensure getMuseumDetails is returned here
  };
};
