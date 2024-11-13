// Backend/Controllers/ReviewsController.js
import ReviewsService from '../Services/ReviewsService.js';

export const submitReview = async (req, res) => {
  try {
    const { museumId, museumRating, exhibitionRatings } = req.body;
    
    // Validate required fields
    if (!museumId || !museumRating || !exhibitionRatings) {
      return res.status(400).json({
        message: 'Missing required fields',
        success: false
      });
    }

    const feedbackData = {
      museumId,
      overallRating: museumRating,
      exhibitionRatings
    };

    const review = await ReviewsService.addOrUpdateFeedback(feedbackData);
    
    res.status(200).json({
      message: 'Feedback submitted successfully',
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({
      message: 'Failed to submit feedback',
      success: false,
      error: error.message
    });
  }
};

export const getMuseumReviews = async (req, res) => {
  try {
    const { museumId } = req.params;
    
    if (!museumId) {
      return res.status(400).json({
        message: 'Museum ID is required',
        success: false
      });
    }

    const reviews = await ReviewsService.getMuseumReviews(museumId);
    
    if (!reviews) {
      return res.status(404).json({
        message: 'No reviews found for this museum',
        success: false
      });
    }

    res.status(200).json({
      message: 'Reviews retrieved successfully',
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({
      message: 'Failed to retrieve reviews',
      success: false,
      error: error.message
    });
  }
};