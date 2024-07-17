import admin from 'firebase-admin';
import UserModel from '../Models/User.js';

const authenticateUser = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid;

    // Retrieve the user's role from Firebase custom claims
    const { role } = decodedToken;

    // Retrieve user from MongoDB using the Firebase UID
    const user = await UserModel.findOne({ uid: req.uid });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user; // Attach user to the request object
    req.userRole = role; // Attach user role to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateUser;
