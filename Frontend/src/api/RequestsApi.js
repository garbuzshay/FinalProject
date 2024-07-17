import config from "../config.js";
import BaseApi from "./BaseApi.js";
const { apiBaseUrl } = config;

/**
 * A class to handle API requests related to requests.
 */
class RequestsApi extends BaseApi {
  constructor() {
    super(apiBaseUrl)
  }

  /**
   * Creates a new request.
   */
  async createRequest(requestData) {
    try {
      // Send a POST request to create the request
      const response = await this.api.post("/requests", requestData);
      // Return the created request data
      return response.data;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  }

  /**
   * Retrieves a list of requests.
   */
  async getRequests() {
    try {
      const response = await this.api.get("/requests");
      return response.data.data;
    } catch (error) {
      console.error("Error getting requests:", error);
      throw error;
    }
  }

  /**
   * Retrieves a request by its ID.
   */
  async getRequestById(id) {
    try {
      const response = await this.api.get(`/requests/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting request with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Updates a request.
   */
  async updateRequest(id, requestData) {
    try {
      const response = await this.api.put(`/requests/${id}`, requestData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating request with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a request by its ID.
   */
  async deleteRequest(id) {
    try {
      const response = await this.api.delete(`/requests/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting request with ID ${id}:`, error);
      throw error;
    }
  }
}

const requestsApi = new RequestsApi();
export default requestsApi;
