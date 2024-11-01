// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVisitor } from '../contexts/VisitorContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const {logout} = useVisitor();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens, user data)
    logout();
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
