import crypto from 'crypto';

// Function to generate a random password
export const generateRandomPassword = () => {
    return crypto.randomBytes(4).toString('hex'); // Generates a random 16-character hex string
};