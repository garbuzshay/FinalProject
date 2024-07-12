import axios from "axios";
import config from "../config.js";
const { apiBaseUrl } = config;

/**
 * A class to handle API requests related to plans.
 */
class PlansApi {
  constructor() {
    this.api = axios.create({
      baseURL: apiBaseUrl,
    });
  }

  /**
   * Creates a new plan.
   */
  async createPlan(planData) {
    try {
      // Send a POST request to create the plan
      const response = await this.api.post("/plans", planData);
      // Return the created plan data
      return response.data.data;
    } catch (error) {
      console.error("Error creating plan:", error);
      throw error;
    }
  }

  /**
   * Retrieves a list of plans.
   */
  async getPlans() {
    try {
      const response = await this.api.get("/plans");
      return response.data.data;
    } catch (error) {
      console.error("Error getting plans:", error);
      throw error;
    }
  }

  /**
   * Retrieves a plan by its ID.
   */
  async getPlanById(id) {
    try {
      const response = await this.api.get(`/plans/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error getting plan with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Updates a plan.
   */
  async updatePlan(id, planData) {
    try {
      const response = await this.api.put(`/plans/${id}`, planData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating plan with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a plan by its ID.
   */
  async deletePlan(id) {
    try {
      const response = await this.api.delete(`/plans/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting plan with ID ${id}:`, error);
      throw error;
    }
  }
}
const plansApi = new PlansApi();
export default plansApi;
