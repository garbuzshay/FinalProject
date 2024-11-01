
import React, { createContext, useContext, useState, useEffect } from "react";
import { useMuseumApi } from "../hooks/useMuseumApi";

const VisitorContext = createContext();

export const useVisitor = () => useContext(VisitorContext);

export const VisitorProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Start as loading until we check token
  const [error, setError] = useState(null);
  const { verifyPassword } = useMuseumApi();

  // Check if token exists in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (museumName, password) => {
    setLoading(true);
    setError(null);
    try {
      // Verify login with API, which should return a token on success
      const response = await verifyPassword(museumName, password);
      const token = response.token; // Assuming API returns { token, ... }

      // Store token in localStorage
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
    } catch (err) {
    //   setError("Login failed. Please check your museum name and password.");
      setIsAuthenticated(false);
      throw new Error('אמא שלך זונה');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear token from localStorage and update state
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <VisitorContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
