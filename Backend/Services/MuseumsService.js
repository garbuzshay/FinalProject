import MuseumModel from '../models/Museum.js';

class MuseumsService {
  /**
   * Creates a new museum.
   * @param {Object} museumData - The museum data.
   * @returns {Object} The created museum.
   */
  async createMuseum(museumData) {
    try {
      const museum = new MuseumModel(museumData);
      await museum.save();
      return museum;
    } catch (error) {
      console.error('Error creating museum:', error);
      throw error;
    }
  }

  /**
   * Retrieves all museums.
   * @returns {Array} The list of museums.
   */
  async getMuseums() {
    try {
      const museums = await MuseumModel.find();
      return museums;
    } catch (error) {
      console.error('Error fetching museums:', error);
      throw error;
    }
  }

  /**
   * Retrieves a museum by ID.
   * @param {String} id - The museum ID.
   * @returns {Object|null} The fetched museum or null if not found.
   */
  async getMuseumById(id) {
    try {
      const museum = await MuseumModel.findById(id).populate('plan').populate('owner') ;
      return museum ? museum : null;
    } catch (error) {
      console.error('Error fetching museum by ID:', error);
      throw error;
    }
  }

  /**
   * Updates a museum by ID.
   * @param {String} id - The museum ID.
   * @param {Object} museumData - The museum data to update.
   * @returns {Object|null} The updated museum or null if not found.
   */
  async updateMuseum(id, museumData) {
    try {
      const museum = await MuseumModel.findByIdAndUpdate(id, museumData, { new: true, runValidators: true });
      return museum ? museum : null;
    } catch (error) {
      console.error('Error updating museum:', error);
      throw error;
    }
  }

  /**
   * Deletes a museum by ID.
   * @param {String} id - The museum ID.
   * @returns {Object|null} The deleted museum or null if not found.
   */
  async deleteMuseum(id) {
    try {
      const museum = await MuseumModel.findByIdAndDelete(id);
      return museum ? museum : null;
    } catch (error) {
      console.error('Error deleting museum:', error);
      throw error;
    }
  }
}

export default new MuseumsService();
