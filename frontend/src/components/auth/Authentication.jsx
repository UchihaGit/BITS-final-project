import React from "react";
import { Navigate } from "react-router-dom";

const Authentication = (props) => {
  if (!props.id) {
    return <Navigate to="/signup" />;
  }
  return props.children;
};

export default Authentication;
