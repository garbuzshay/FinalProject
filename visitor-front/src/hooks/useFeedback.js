
// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\hooks\useFeedback.js
import { useState, useEffect } from 'react';
import feedbackApi from '../api/FeedbackApi';

const useFeedback = (museumId) => {
  const [feedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const submitFeedback = async (museumRating, exhibitionRatings) => {
    if (!museumId) return;
    
    setLoading(true);
    setError(null);
    try {
      // Transform exhibitionRatings from object to array format expected by backend
      const formattedExhibitionRatings = Object.entries(exhibitionRatings).map(
        ([exhibitionId, rating]) => ({
          exhibitionId,
          rating
        })
      );

      await feedbackApi.submitFeedback(
        museumId,
        museumRating,
        formattedExhibitionRatings
      );
    //   await fetchFeedback(); // Refresh feedback after submission
      return true;
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchFeedback();
  }, [museumId]);

  return {
    feedback,
    loading,
    error,
    submitFeedback,
    // fetchFeedback,
  };
};

export default useFeedback;