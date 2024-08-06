import { useState } from "react";
import museumApi from "../api/museumApi";

export const useMuseumApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyPassword = async (museumName, password) => {
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
  };

  const fetchMuseumDetails = async (museumName) => {
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
  };

  
  const fetchExhibitionDetails = async (exhibitionId) => {
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
  };

  return {
    loading,
    error,
    verifyPassword,
    fetchMuseumDetails,
    fetchExhibitionDetails,
  };
};
