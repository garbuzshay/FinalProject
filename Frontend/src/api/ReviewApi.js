// C:\Users\Shay\Desktop\MuseumApp\visitor-front\src\api\ReviewApi.js

import config from '../config.js';
import BaseApi from './BaseApi.js';

const { apiBaseUrl } = config;

class ReviewApi extends BaseApi {
  constructor() {
    super(apiBaseUrl);
  }

  /**
   * Retrieves reviews for a specific museum.
   * @param {String} museumId - The ID of the museum.
   * @returns {Object} The reviews data.
   */
  async getMuseumReviews(museumId) {
    try {
      const response = await this.api.get(`/reviews/${museumId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error retrieving reviews for museum ${museumId}:`, error);
      throw error;
    }
  }
}

const reviewApi = new ReviewApi();
export default reviewApi;
