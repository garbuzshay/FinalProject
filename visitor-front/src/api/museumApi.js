import config from './config.js';
import BaseApi from './baseApi.js';

const { apiBaseUrl } = config;

class MuseumApi extends BaseApi {
  constructor() {
    super(apiBaseUrl);
  }

  async verifyMuseumPassword(museumName, password) {
    try {
      const response = await this.api.post('/museums/verify-password', { museumName, password });
      return response.data.data;
    } catch (error) {
      console.error('Error verifying museum password:', error);
      throw error;
    }
  }

  async getMuseumDetails(museumName) {
    try {
      const response = await this.api.get(`/museums/details/${museumName}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error getting museum details for ${museumName}:`, error);
      throw error;
    }
  }
  
}




const museumApi = new MuseumApi();
export default museumApi;