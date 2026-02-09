import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  // Get the token saved in the browser (after login)
  const token = localStorage.getItem("accessToken");

  // Get the current page the user is trying to visit
  const location = useLocation();

  // If the user has a token → allow access
  // If not → send them to the login page
  if (token) {
    // User is logged in, show the requested page
    return <Outlet />;
  } else {
    // User is NOT logged in, send to login page
    // "state={{ from: location }}" helps us remember which page the user tried to visit
    // "replace" stops the user from pressing back to go to a protected page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default RequireAuth;
