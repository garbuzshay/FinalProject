import { useState, useEffect } from "react";
import museumApi from "../api/MuseumApi"; // Adjust the path as needed

const useMuseums = () => {
  const [museums, setMuseums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMuseums = async () => {
    setIsLoading(true);
    try {
      const data = await museumApi.getMuseums();
      setMuseums(data); // Make sure this matches the structure of your API response
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const updateMuseum = async (id, museumData) => {
    try {
      const updatedMuseum = await museumApi.updateMuseum(id, museumData);
      setMuseums((prevMuseums) =>
        prevMuseums.map((museum) =>
          museum._id === id ? { ...museum, ...updatedMuseum } : museum
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMuseums();
  }, []);

  

  return { museums, isLoading, error, updateMuseum, fetchMuseums };
};

export default useMuseums;
