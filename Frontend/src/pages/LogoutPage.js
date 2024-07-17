// src/components/Logout.js
import React, { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';

const Logout = () => {
  const { logout } = useUserContext();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div>
      <h1>Logging out...</h1>
      <p>You are being logged out. Please wait...</p>
    </div>
  );
};

export default Logout;
