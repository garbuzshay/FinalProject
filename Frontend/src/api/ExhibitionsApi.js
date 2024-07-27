import config from '../config.js';
import BaseApi from './BaseApi.js';
const { apiBaseUrl } = config;

class ExhibitionsApi extends BaseApi {
  constructor() {
    super(apiBaseUrl);
  }

  /**
   * Creates a new exhibition.
   */
  async createExhibition(exhibitionData) {
    try {
      const response = await this.api.post('/exhibitions', exhibitionData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating exhibition:', error);
      throw error;
    }
  }

  /**
   * Retrieves a list of exhibitions.
   */
  async getExhibitions() {
    try {
      const response = await this.api.get('/exhibitions');
      return response.data.data;
    } catch (error) {
      console.error('Error getting exhibitions:', error);
      throw error;
    }
  }

  

  /**
   * Retrieves an exhibition by its ID.
   */
  async getExhibitionById(id) {
    try {
      const response = await this.api.get(`/exhibitions/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error getting exhibition with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Updates an exhibition.
   */
  async updateExhibition(id, exhibitionData) {
    try {
      const response = await this.api.put(`/exhibitions/${id}`, exhibitionData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating exhibition with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes an exhibition by its ID.
   */
  async deleteExhibition(id) {
    try {
      const response = await this.api.delete(`/exhibitions/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting exhibition with ID ${id}:`, error);
      throw error;
    }
  }

  async getUserExhibitions() {
    try {
      const response = await this.api.get(`/exhibitions/my`);
      return response.data.data;
    } catch (error) {
      console.error(`Error getting exhibitions for museum with ID :`, error);
      throw error;
    }
  }
  async getExhibitionsWithDetails() {
    try {
      const response = await this.api.get('/exhibitions/details');
      return response.data.data;
    } catch (error) {
      console.error('Error getting exhibitions with details:', error);
      throw error;
    }
  }
  
}




const exhibitionsApi = new ExhibitionsApi();
export default exhibitionsApi;
