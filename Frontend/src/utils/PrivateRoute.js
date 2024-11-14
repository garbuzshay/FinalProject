import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { rolePaths } from '../data/rolePaths';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useUserContext();

  if (loading) {
    // Show a loading indicator while checking auth state
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to the login page for the attempted role
    const loginPath = rolePaths[requiredRole]?.login || '/admin/login';
    return <Navigate to={loginPath} />;
  }

  if (requiredRole && user.role.roleName !== requiredRole) {
    // Redirect to the Unauthorized page if the user doesn't have the required role
    return <Navigate to="/unauthorized" />;
  }

  // 

  // 

  return children;
};

export default PrivateRoute;
