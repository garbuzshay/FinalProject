import jwt from 'jsonwebtoken';
import config from '../config.js';


const JWT_SECRET = config.jwt.jwt_secret;
const JWT_EXPIRATION = config.jwt.jwt_expiration;

/**
 * Generate a JWT token for a user.
 * @param {Object} payload - Payload to encode in the token.
 * @returns {string} - Signed JWT token.
 */
export const generateToken = (payload) => {
  if (!JWT_SECRET) {
    throw new Error('JWT secret is not defined in environment variables');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};