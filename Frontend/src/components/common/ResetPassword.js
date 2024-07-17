import React, { useState } from 'react';
import {auth, sendPasswordResetEmail } from '../../configuration/firebaseConfig'; // Adjust the path to your Firebase configuration
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      sendPasswordResetEmail(auth, email, {url: 'http://localhost:3000/login'}); // Adjust the URL to your application
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleResetPassword}>
        <h2 className="text-2xl font-semibold mb-5">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded" type="submit">Send Reset Email</button>
        <button
          type="button"
          className="w-full bg-gray-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => navigate('/login')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
