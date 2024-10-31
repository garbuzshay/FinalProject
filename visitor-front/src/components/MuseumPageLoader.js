import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMuseumApi } from "../hooks/useMuseumApi";
import { useMuseum } from "../contexts/MuseumContext";
import LandingPage from "./LandingPage";

const MuseumPageLoader = () => {
  const { museumName } = useParams();
  const navigate = useNavigate();
  const { getMuseumDetails } = useMuseumApi();
  const { museum, initializeMuseumData, validateMuseumToken } = useMuseum();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMuseumData = async () => {
      const lastVisitTimestamp = localStorage.getItem('visitTimestamp');

      // Case 1: No token (first visit) - Allow direct access
      if (!lastVisitTimestamp) {
        try {
          const museumData = await getMuseumDetails(museumName);
          initializeMuseumData(museumData);
          setLoading(false);
          return;
        } catch (error) {
          console.error("Failed to load museum:", error);
          navigate("/");
          return;
        }
      }

      // Case 2: Token exists - Validate it
      if (!validateMuseumToken()) {
        // Expired token - clear data and redirect
        localStorage.removeItem('museumData');
        localStorage.removeItem('museumToken');
        // localStorage.removeItem('visitTimestamp');
        navigate("/");
      } else {
        // Valid token - load data if not already loaded
        if (!museum || museum.name !== museumName) {
          try {
            const museumData = await getMuseumDetails(museumName);
            initializeMuseumData(museumData);
          } catch (error) {
            console.error("Failed to load museum:", error);
            navigate("/");
            return;
          }
        }
        setLoading(false);
      }
    };

    loadMuseumData();
  }, [museumName, museum, initializeMuseumData, navigate, getMuseumDetails, validateMuseumToken]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <LandingPage />;
};

export default MuseumPageLoader;