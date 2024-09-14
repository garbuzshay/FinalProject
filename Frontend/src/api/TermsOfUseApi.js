import config from "../config.js";
import BaseApi from "./BaseApi.js";

const { apiBaseUrl } = config;

/**
 * A class to handle API requests related to Terms of Use.
 */
class TermsOfUseApi extends BaseApi {
  constructor() {
    super(apiBaseUrl);
  }

  /**
   * Retrieves the latest terms of use.
   */
  async getTermsOfUse() {
    try {
      const response = await this.api.get("/terms-of-use");
      return response.data;
    } catch (error) {
      console.error("Error fetching terms of use:", error);
      throw error;
    }
  }

  /**
   * Updates the terms of use.
   */
  async updateTermsOfUse(termsData) {
    try {
      const response = await this.api.put("/terms-of-use", termsData);
      return response.data;
    } catch (error) {
      console.error("Error updating terms of use:", error);
      throw error;
    }
  }
}

const termsOfUseApi = new TermsOfUseApi();
export default termsOfUseApi;
