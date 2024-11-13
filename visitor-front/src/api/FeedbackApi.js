// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\api\FeedbackApi.js

import config from './config.js';
import BaseApi from './baseApi.js';

const { apiBaseUrl } = config;

class FeedbackApi extends BaseApi {
  constructor() {
    super(apiBaseUrl);
  }

  // Function to submit feedback for a museum
  async submitFeedback(museumId, museumRating, exhibitionRatings) {
    try {
      const response = await this.api.post('/reviews', {
        museumId,
        museumRating,
        exhibitionRatings,
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }

  // Function to retrieve feedback for a specific museum
//   async getMuseumFeedback(museumId) {
//     try {
//       const response = await this.api.get(`/reviews/${museumId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error retrieving feedback for museum ${museumId}:`, error);
//       throw error;
//     }
//   }
}

const feedbackApi = new FeedbackApi();
export default feedbackApi;
