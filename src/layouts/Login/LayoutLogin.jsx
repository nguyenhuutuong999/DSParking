import React from 'react';
import { Route } from 'react-router-dom';


function LayoutLogin({ component: Component, ...props }) {
  return (
    <Route {...props} component={Component} />
  );
}

export default LayoutLogin;