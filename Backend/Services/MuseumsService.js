import MuseumModel from "../Models/Museum.js";
import UserModel from "../Models/User.js";
import Exhibition from '../Models/Exhibition.js';
import bcrypt from 'bcrypt';

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
      await UserModel.findByIdAndUpdate(museumData.owner, {
        museum: museum._id,
      });
      return museum;
    } catch (error) {
      console.error("Error creating museum:", error);
      throw error;
    }
  }

  /**
   * Retrieves all museums.
   * @returns {Array} The list of museums.
   */
  async getMuseums() {
    try {
      const museums = await MuseumModel.find()
        .populate("plan")
        .populate("owner")
        .populate("exhibitions")
        .populate("artworks");
      return museums;
    } catch (error) {
      console.error("Error fetching museums:", error);
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
      const museum = await MuseumModel.findById(id)
        .populate("plan")
        .populate("owner")
        .populate({
          path: "exhibitions",
          populate: [
            { path: "curators", model: "users" },
            { path: "artworks", model: "artworks" } 
          ]
        })
      return museum ? museum : null;
    } catch (error) {
      console.error("Error fetching museum by ID:", error);
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
      const museum = await MuseumModel.findByIdAndUpdate(id, museumData, {
        new: true,
        runValidators: true,
      });
      return museum ? museum : null;
    } catch (error) {
      console.error("Error updating museum:", error);
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
      console.error("Error deleting museum:", error);
      throw error;
    }
  }

  async getMuseumByOwnerId(ownerId) {
    try {
      const museum = await MuseumModel.findOne({ owner: ownerId })
        .populate("plan")
        .populate("owner")
        .populate({
          path: "exhibitions",
          populate: [
            { path: "curators", model: "users" },
            { path: "artworks", model: "artworks" } 
          ]
        })
        .populate("artworks");
        
      return museum;
    } catch (error) {
      console.error(`Error getting museums with owner ID ${ownerId}:`, error);
      throw error;
    }
  }

  async getMuseumByCurator(curatorId) {
    try {
      const museum = await MuseumModel.findOne({ curators: curatorId });
      return museum;
    } catch (error) {
      throw new Error("Error fetching museum by curator");
    }
  }

  async verifyPassword(museumName, password) {
    try {
      const museum = await MuseumModel.findOne({ name: museumName });
      if (!museum) throw new Error('Museum not found');
      
      const isPasswordValid = bcrypt.compare(password, museum.password);
      if (!isPasswordValid) throw new Error('Invalid password');
      
      return museum;
    } catch (error) {
      throw error;
    }
  }

  async getMuseumDetails(museumName) {
    try {
      const museum = await MuseumModel.findOne({ name: museumName }).populate({
        path: 'exhibitions',
        populate: { path: 'artworks'}
      });
      if (!museum) throw new Error('Museum not found');
      
      return { museum, exhibitions: museum.exhibitions };
    } catch (error) {
      throw error;
    }
  }
}



export default new MuseumsService();
