// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToAuthChanges, loginWithEmailPassword, logoutUser } from '../utils/auth';
import { rolePaths } from '../data/rolePaths';

// Create a context for the user
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const userWithRole = { ...user, role: idTokenResult.claims.role };
        setUser(userWithRole);
        localStorage.setItem('userToken', await user.getIdToken(true));
      } else {
        setUser(null);
        localStorage.removeItem('userToken');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userWithRole = await loginWithEmailPassword(email, password);
      setUser(userWithRole);

      // Redirect based on role
      const rolePath = rolePaths[userWithRole.role]?.dashboard || '/unauthorized';
      navigate(rolePath);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
