import React, { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import SymbolMuseum from '../../assets/MusuemSymbol.png'; // Importing the logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#cfd7f7] via-white to-[#dfe4f9] relative overflow-hidden">
  <form className="relative bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
    {/* Logo */}
    <div className="flex justify-center mb-3">
      <img src={SymbolMuseum} alt="Museum Symbol" className="w-36 h-36 object-contain" />
    </div>

    <h1 className="text-6xl font-bold text-[#343341] text-center mb-5 font-poppins">WELCOME</h1>
    
    {/* Email Input with Icon */}
    <div className="mb-6 relative">
      <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3a4c98] text-opacity-80" />
      <input
        className="w-full pl-12 py-3 bg-white bg-opac5ty-10 text-gray-600 text-opacity-80 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
        type="email"
        id="email"
        placeholder="Please enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    
    {/* Password Input with Icon */}
    <div className="mb-6 relative">
      <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3a4c98] text-opacity-80" />
      <input
        className="w-full pl-12 py-3 bg-white bg-opacity-50 text-gray-600 text-opacity-80 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
        type="password"
        id="password"
        placeholder="Please enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Submit Button */}
        <button className="w-full py-3 font-poppins bg-[#3a4c98] text-white font-semibold rounded-full hover:bg-[#2f3a73] transition duration-200" type="submit">Login</button>
        
        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link to="/reset-password" className="text-xs text-gray-500 text-opacity-80 hover:underline font-poppins">Forgot password or First Login?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
