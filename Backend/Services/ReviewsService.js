// Backend/Services/ReviewsService.js
import ReviewModel from '../Models/ReviewModel.js';
import ExhibitionModel from '../Models/Exhibition.js';

class ReviewsService {
  /**
   * Adds or updates feedback for a museum and its exhibitions.
   * @param {Object} feedbackData - Contains museumId, overallRating, and ratings for exhibitions.
   */
  // async addOrUpdateFeedback(feedbackData) {
  //   const { museumId, overallRating, exhibitionRatings } = feedbackData;

  //   try {
  //     let review = await ReviewModel.findOne({ museum: museumId });

  //     if (!review) {
  //       // Create new review record if none exists
  //       const exhibitions = exhibitionRatings.map(({ exhibitionId, rating }) => ({
  //         exhibitionId,
  //         exhibitionScores: [rating],
  //       }));

  //       review = new ReviewModel({
  //         museum: museumId,
  //         museumScores: [overallRating],
  //         exhibitions,
  //       });
  //     } else {
  //       // Update existing review record
  //       review.museumScores.push(overallRating);
  //       exhibitionRatings.forEach(({ exhibitionId, rating }) => {
  //         const exhibition = review.exhibitions.find(ex => ex.exhibitionId.toString() === exhibitionId);
  //         if (exhibition) {
  //           exhibition.exhibitionScores.push(rating);
  //         } else {
  //           review.exhibitions.push({ exhibitionScores: [rating] });
  //         }
  //       });
  //     }

  //     await review.save();
  //     return review;
  //   } catch (error) {
  //     console.error('Error adding or updating feedback:', error);
  //     throw error;
  //   }
  // }
  async addOrUpdateFeedback(feedbackData) {
    const { museumId, overallRating, exhibitionRatings } = feedbackData;

    try {
      let review = await ReviewModel.findOne({ museum: museumId });

      if (!review) {
        // Create new review record if none exists
        const exhibitions = exhibitionRatings
          .filter(rating => rating.exhibitionId && rating.rating)
          .map(({ exhibitionId, rating }) => ({
            exhibitionId,
            exhibitionScores: [rating],
          }));

        review = new ReviewModel({
          museum: museumId,
          museumScores: [overallRating],
          exhibitions,
        });
      } else {
        // Update existing review record
        review.museumScores.push(overallRating);

        exhibitionRatings
          .filter(rating => rating.exhibitionId && rating.rating)
          .forEach(({ exhibitionId, rating }) => {
            const exhibition = review.exhibitions.find(ex => 
              ex.exhibitionId && ex.exhibitionId.toString() === exhibitionId.toString()
            );

            if (exhibition) {
              exhibition.exhibitionScores.push(rating);
            } else {
              review.exhibitions.push({ 
                exhibitionId, 
                exhibitionScores: [rating] 
              });
            }
          });
      }

      await review.save();
      return review;
    } catch (error) {
      console.error('Error adding or updating feedback:', error);
      throw error;
    }
  }

  async getMuseumReviews(museumId) {
    try {
      return await ReviewModel.findOne({ museum: museumId }).populate('museum').populate('exhibitions.exhibitionId');
    } catch (error) {
      console.error('Error retrieving museum reviews:', error);
      throw error;
    }
  }
}

export default new ReviewsService();
