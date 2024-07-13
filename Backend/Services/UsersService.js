import UserModel from '../Models/User.js';
import bcrypt from 'bcrypt';

class UsersService {
  /**
   * Creates a new user.
   * @param {Object} userData - The user data.
   * @returns {Object} The created user.
   */
  async createUser(userData) {
    try {
      const { name, lastName, email, password, phoneNumber, terms } = userData;

      // Check if the email is already taken
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return existingUser;
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = new UserModel({
        name,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        terms,
      });

      // Save the user to the database
      await newUser.save();

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  /**
   * Retrieves a user by ID.
   * @param {String} id - The user ID.
   * @returns {Object|null} The fetched user or null if not found.
   */
  async getUserById(id) {
    try {
      const user = await UserModel.findById(id);
      return user ? user : null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  /**
   * Updates a user by ID.
   * @param {String} id - The user ID.
   * @param {Object} userData - The user data to update.
   * @returns {Object|null} The updated user or null if not found.
   */
  async updateUser(id, userData) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, userData, { new: true });
      return user ? user : null;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Deletes a user by ID.
   * @param {String} id - The user ID.
   * @returns {Object|null} The deleted user or null if not found.
   */
  async deleteUser(id) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      return user ? user : null;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export default new UsersService();