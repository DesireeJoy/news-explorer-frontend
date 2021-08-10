import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  props.handleSigninClick();
  return (
    <Route>
      {
        () => props.Loggedin ? <Component {...props} /> : <Redirect to='./' />
      }
    </Route>
)};

export default ProtectedRoute;