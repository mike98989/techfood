import React from "react";
import { Navigate } from "react-router-dom"; // Assuming you're using react-router

interface ProtectedRouteProps {
  children: JSX.Element; // The wrapped component(s)
  isAuthenticated: boolean; // Check if the user is authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" />;
  }
  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;
