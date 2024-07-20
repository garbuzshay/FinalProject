import config from "../config.js";
import BaseApi from "./BaseApi.js";
const { apiBaseUrl } = config;

class MuseumApi  extends BaseApi {
    constructor() {
      super(apiBaseUrl);
    }


/**
   * Creates a new museum.
   */
async createMuseum(museumData) {
    try {
      const response = await this.api.post('/museums', museumData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating museum:', error);
      throw error;
    }
  }
  async getMuseumByOwnerId(ownerId) {
    try {
        const response = await this.api.get(`/museums/owner/${ownerId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error getting museum with owner ID ${ownerId}:`, error);
        throw error;
    }
}

  /**
   * Retrieves a list of museums.
   */
  async getMuseums() {
    try {
      const response = await this.api.get('/museums');
      return response.data.data;
    } catch (error) {
      console.error('Error getting museums:', error);
      throw error;
    }
  }

  /**
   * Retrieves a museum by its ID.
   */
  async getMuseumById(id) {
    try {
      const response = await this.api.get(`/museums/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error getting museum with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Updates a museum.
   */
  async updateMuseum(id, museumData) {
    try {
      const response = await this.api.put(`/museums/${id}`, museumData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating museum with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a museum by its ID.
   */
  async deleteMuseum(id) {
    try {
      const response = await this.api.delete(`/museums/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting museum with ID ${id}:`, error);
      throw error;
    }
  }

  async getMuseumByOwner() {
    try {
      const response = await this.api.get('/museums/owner');
      return response.data.data;
    } catch (error) {
      console.error('Error getting museums for the owner:', error);
      throw error;
    }
  }
}

const museumApi = new MuseumApi();
export default museumApi;