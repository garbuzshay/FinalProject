// import React, { useState } from 'react';
// import { auth, sendPasswordResetEmail } from '../../configuration/firebaseConfig'; // Adjust the path to your Firebase configuration
// import { useNavigate } from 'react-router-dom';
// import FormConfirmButton from './FormConfirmButton'; // Import the FormConfirmButton component

// const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleResetPassword = async () => {
//     setMessage('');
//     setError('');

//     try {
//       await sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' }); // Adjust the URL to your application
//       setMessage('Password reset email sent. Please check your inbox.');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-semibold mb-5">Reset Password</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
//           <input
//             className="w-full px-3 py-2 border rounded"
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         {message && <p className="text-green-500 mb-4">{message}</p>}
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <FormConfirmButton
//           buttonText="Send Reset Email"
//           dialogMessage="Are you sure you want to send the reset email?"
//           onSubmit={handleResetPassword}
//         />
//         <button
//           type="button"
//           className="w-full bg-gray-500 text-white px-4 py-2 rounded mt-2"
//           onClick={() => navigate('/login')}
//         >
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import {
  auth,
  sendPasswordResetEmail,
} from "../../configuration/firebaseConfig";
import { useNavigate } from "react-router-dom";
import FormConfirmButton from "./FormConfirmButton";
import LogoMuseum from "../../assets/LogoMusuem.png"; // Import the logo

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/login",
      });
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

      <form className="relative bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={LogoMuseum}
            alt="Museum Logo"
            className="w-36 h-36 object-contain rounded-full shadow-lg"
          />
        </div>

        <h2 className="text-3xl font-semibold text-white text-center mb-5">
          Reset Password
        </h2>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-white text-opacity-80" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-3 bg-white bg-opacity-50 text-white text-opacity-80 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Message/Error */}
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <FormConfirmButton
          buttonText="Send Reset Email"
          dialogMessage="Are you sure you want to send the reset email?"
          onSubmit={handleResetPassword}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-200 mt-4"
        />

        {/* Cancel Button */}
        <button
          type="button"
          className="w-full py-3 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-200 mt-4"
          onClick={() => navigate("/login")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
