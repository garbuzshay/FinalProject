import config from '../config.js';
import BaseApi from './BaseApi.js';

const { apiBaseUrl } = config;

/**
 * A class to handle API requests related to users.
 */
class UsersApi extends BaseApi {
  constructor() {
    super(apiBaseUrl);
  }

  /**
   * Creates a new user.
   * @param {Object} userData - The data of the user to create.
   */
  async createUser(userData) {
    try {
      const response = await this.api.post('/users', userData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Retrieves a list of users.
   */
  async getUsers() {
    try {
      const response = await this.api.get('/users');
      return response.data.data;
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user to retrieve.
   */
  async getUserById(id) {
    try {
      const response = await this.api.get(`/users/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error getting user with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Updates a user.
   * @param {string} id - The ID of the user to update.
   * @param {Object} userData - The data to update the user with.
   */
  async updateUser(id, userData) {
    try {
      const response = await this.api.put(`/users/${id}`, userData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a user by their ID.
   * @param {string} id - The ID of the user to delete.
   */
  async deleteUser(id) {
    try {
      const response = await this.api.delete(`/users/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.api.get('/auth/user');
      return response.data.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }
}

const usersApi = new UsersApi();
export default usersApi;
