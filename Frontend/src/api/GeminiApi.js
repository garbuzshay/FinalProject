import axios from 'axios';
import config from '../config.js';
import BaseApi from './BaseApi.js';

const { apiBaseUrl } = config;

class GeminiApi extends BaseApi {
  constructor() {
    super(apiBaseUrl); // Initialize the base URL
  }

  /**
   * Generates an artwork description based on a prompt.
   */
  async generateArtworkDescription(data) {
    try {
      const response = await this.api.post('/gemini/generate-artwork-description', data);
      return response.data.text;
    } catch (error) {
      console.error('Error generating artwork description:', error);
      throw error;
    }
  }

  
}

const geminiApi = new GeminiApi();
export default geminiApi;