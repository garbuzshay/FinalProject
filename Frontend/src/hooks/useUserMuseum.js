import { useState, useEffect } from "react";
import museumApi from "../api/MuseumApi";
import exhibitionsApi from "../api/ExhibitionsApi"; 
const useUserMuseum = () => {
  const [museum, setMuseum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMuseum = async () => {
    setIsLoading(true);
    try {
      const museumData = await museumApi.getUserMuseum();
      setMuseum(museumData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const updateExhibition = async (exhibitionId, updatedData) => {
    try {
      await exhibitionsApi.updateExhibition(exhibitionId, updatedData); // Adjust the API call as needed
      await fetchMuseum(); // Refetch the museum data to reflect the updates
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchMuseum();
  }, []);

  return { museum, isLoading, error ,fetchMuseum, updateExhibition};
};

export default useUserMuseum;
