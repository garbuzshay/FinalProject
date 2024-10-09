import React, { useState } from "react";
import { auth, sendPasswordResetEmail } from "../../configuration/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SymbolMuseum from '../../assets/MusuemSymbol.png'; // Importing the logo image

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/login",
      });
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#cfd7f7] via-white to-[#dfe4f9] relative overflow-hidden">
      <form className="relative bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-sm" onSubmit={handleResetPassword}>
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <img src={SymbolMuseum} alt="SymbolMuseum" className="w-36 h-36 object-contain" />
        </div>

        <h1 className="text-3xl font-bold text-[#343341] text-center mb-5 font-poppins">
          RESET PASSWORD
        </h1>

        {/* Email Input with Icon */}
        <div className="mb-6 relative">
          <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3a4c98] text-opacity-80" />
          <input
            className="w-full pl-12 py-3 bg-blue-100 bg-opacity-50 text-gray-600 text-opacity-80 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            id="email"
            placeholder="Please enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Message/Error */}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          className="w-full py-3 font-poppins bg-[#3a4c98] text-white font-semibold rounded-full hover:bg-[#2f3a73] transition duration-200"
          type="submit"
        >
          Send Reset Email
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          className="w-full py-3 font-poppins bg-gray-400 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-200 mt-4"
          onClick={() => navigate("/login")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
