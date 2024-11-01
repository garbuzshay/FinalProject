import React from "react";
import { useVisitor } from "../contexts/VisitorContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useVisitor();
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
