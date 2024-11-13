// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\hooks\useMuseumReviews.js

import { useState, useEffect, useCallback } from 'react';
import reviewApi from '../api/ReviewApi';

const useMuseumReviews = (museumId) => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch reviews for the museum
  const fetchReviews = useCallback(async () => {
    if (!museumId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await reviewApi.getMuseumReviews(museumId);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching museum reviews:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [museumId]);

  useEffect(() => {
    fetchReviews(); // Fetch reviews when the hook is mounted or when museumId changes
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews, // Refetch function to manually refresh reviews if needed
  };
};

export default useMuseumReviews;
