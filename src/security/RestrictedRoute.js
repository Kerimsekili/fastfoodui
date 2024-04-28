import React from "react";
import { Route, Navigate } from "react-router-dom";

const RestrictedRoute = ({ role, allowedRoles, element }) => {
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/404" />;
  }

  return <Route element={element} />;
};

export default RestrictedRoute;
