import UsersService from '../Services/UsersService.js'; // Adjust the path as necessary
import admin from 'firebase-admin';

const createAdminUser = async (adminData) => {
  try {
    // Create the user with the role 'Admin'
    const newUser = await UsersService.createUser({
      ...adminData,
      role: 'Admin'
    });

    // Verify the role assignment in Firebase
    const userRecord = await admin.auth().getUser(newUser.uid);
    if (userRecord.customClaims && userRecord.customClaims.role === 'Admin') {
      console.log('Admin user created successfully:', newUser);
      return newUser;
    } else {
      throw new Error('Failed to assign admin role');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};



export default createAdminUser;
