import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...reset }) {
  
    const isAuthenticated = !!localStorage.getItem("access_token");

  return (
    <Route
      {...reset}
      render={(props) =>
        isAuthenticated !== '' ? 
        <Component {...props} /> : 
        <Redirect to={{ pathname: '/', state: { from: props.location }}} />
      }
    />
  );
}

export default ProtectedRoute;