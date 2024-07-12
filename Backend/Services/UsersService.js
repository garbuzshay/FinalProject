import UserModel from '../Models/User.js';
import bcrypt from 'bcrypt';

class UserService {
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
}

export default new UserService();
