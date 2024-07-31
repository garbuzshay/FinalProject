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
      return response.data.data;
    } catch (error) {
      console.error('Error creating artwork:', error);
      throw error;
    }
  }


  async updateArtwork(artworkId, artworkData) {
    try {
      const response = await this.api.put(`/artworks/${artworkId}`, artworkData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating artwork with ID ${artworkId}:`, error);
      throw error;
    }
  }


  async deleteArtwork(exhibitionId, artworkId) {
    try {
      const response = await this.api.delete(`/exhibitions/${exhibitionId}/artworks/${artworkId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting artwork with ID ${artworkId} from exhibition with ID ${exhibitionId}:`, error);
      throw error;
    }
  }
}


const artworksApi = new ArtworksApi();
export default artworksApi;
