import { useState, useCallback } from "react";
import museumApi from "../api/museumApi";

export const useMuseumApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyPassword = useCallback(
    async (museumName, password) => {
      setLoading(true);
      setError(null);
      try {
        const data = await museumApi.verifyMuseumPassword(museumName, password);
        return data;
      } catch (err) {
        setError(err.response.data.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const getMuseumDetails = useCallback(
    async (museumName) => {
      setLoading(true);
      setError(null);
      try {
        const data = await museumApi.getMuseumDetails(museumName);
        return data;
      } catch (err) {
        setError(err.response.data.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );
  // useEffect(() => {
  //   fetchMuseumDetails();
  // }, []);


  const fetchExhibitionDetails = useCallback(
    async (exhibitionId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await museumApi.getExhibitionDetails(exhibitionId);
        return data;
      } catch (err) {
        setError(err.response.data.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );



  return {
    loading,
    error,
    verifyPassword,
    getMuseumDetails,
    fetchExhibitionDetails,
  };
};


