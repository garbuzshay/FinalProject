import config from "../config.js";
import BaseApi from "./BaseApi.js";
const { apiBaseUrl } = config;

class ArtworksApi extends BaseApi {
  constructor() {
    super(apiBaseUrl);
  }

  /**
   * Retrieves artworks by exhibition ID.
   */
  async getArtworksByExhibition(exhibitionId) {
    try {
      const response = await this.api.get(`/exhibitions/${exhibitionId}/artworks`);
      return response.data.data;
    } catch (error) {
      console.error(`Error getting artworks for exhibition with ID ${exhibitionId}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new artwork.
   */
  async createArtwork(exhibitionId, artworkData) {
    try {
      console.log('artworkData:', artworkData);
      const response = await this.api.post(`/exhibitions/${exhibitionId}/artworks`, artworkData);
      return response.data;
    } catch (error) {
      console.error('Error creating artwork:', error);
      throw error;
    }
  }
}

const artworksApi = new ArtworksApi();
export default artworksApi;
