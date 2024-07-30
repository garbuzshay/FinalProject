import UserModel from '../Models/User.js';
import admin from 'firebase-admin';
import { toE164 } from '../Utils/phoneUtils.js';
import { generateRandomPassword } from '../Utils/passwordUtils.js';
import RoleModel from '../Models/Role.js';  // Import the Role model

class UsersService {
  /**
   * Creates a new user.
   * @param {Object} userData - The user data.
   * @returns {Object} The created user.
   */
  async createUser(userData) {
    try {
      const { name, lastName, email, phoneNumber, terms, role , museum } = userData;
      let password = userData.password;

      const formattedNumber = toE164(phoneNumber);

      // Check if the email is already taken
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return existingUser;
      }

      if (!password) {
        password = generateRandomPassword();
        console.log(email + ' Generated Password:', password);
      }
      
      // Fetch the role objectId from the database
      let roleId = null;
      if (role) {
        const roleRecord = await RoleModel.findOne({ roleName: role });
        if (roleRecord) {
          roleId = roleRecord._id;
        } else {
          throw new Error('Invalid role');
        }
      }

      // Create the user in Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: `${name} ${lastName}`,
        phoneNumber: formattedNumber
      });

      // Set custom user claims (roles)
      let claims = {};
      if (role) {
        claims = { role };
        await admin.auth().setCustomUserClaims(userRecord.uid, claims);
      }

      // Create the user in MongoDB
      const newUser = new UserModel({
        uid: userRecord.uid,
        name,
        lastName,
        email,
        phoneNumber: formattedNumber,
        terms,
        role: roleId,
        museum : userData.museum,
      });

      await newUser.save();

      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUsers(currentUserId) {
    try {
      // Find users excluding the current user
      const users = await UserModel.find({ _id: { $ne: currentUserId } })
        .populate('museum') // Populate the museum field with the museum name
        .populate('role', 'roleName'); // Populate the role field with the role name
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

    }

  /**
   * Retrieves a user by Firebase UID.
   * @param {String} uid - The Firebase UID.
   * @returns {Object|null} The fetched user or null if not found.
   */
  async getUserByUid(uid) {
    try {
      let user = await UserModel.findOne({ uid }).populate('role');
      if (user?.museum) {
          user = user.populate('museum');
      }
      return user ? user : null;
    } catch (error) {
      console.error('Error fetching user by UID:', error);
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
      const user = await UserModel.findById(id);
      if (!user) {
        return null;
      }

      // Delete the user from Firebase Authentication
      await admin.auth().deleteUser(user.uid);

      // Delete the user from MongoDB
      await UserModel.findByIdAndDelete(id);

      return user;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Deletes a user by Firebase UID.
   * @param {String} uid - The Firebase UID.
   * @returns {Object|null} The deleted user or null if not found.
   */
  async deleteUserByUid(uid) {
    try {
      // Delete the user from Firebase Authentication
      await admin.auth().deleteUser(uid);

      // Delete the user from MongoDB
      const user = await UserModel.findOneAndDelete({ uid });

      return user;
    } catch (error) {
      console.error('Error deleting user by UID:', error);
      throw error;
    }
  }
}

export default new UsersService();
