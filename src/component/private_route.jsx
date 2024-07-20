import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authenticated, element }) => {
  if (!authenticated) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
