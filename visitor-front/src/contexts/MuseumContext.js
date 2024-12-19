
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useMuseumApi } from "../hooks/useMuseumApi";
import { useParams } from "react-router-dom";
import { useVisitor } from "./VisitorContext";

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
  // console.log(museumData)
  useEffect(() => {
    // console.log(museumName)
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
