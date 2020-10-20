import React from 'react';
import { Redirect, Route } from 'react-router-dom';


function LayoutLogin({ component: Component, ...props }) {
  const authData = JSON.parse(localStorage.getItem('authData'));
  if (authData) return <Redirect to="/" />
  return (
    <Route {...props} component={Component} />
  );
}

export default LayoutLogin;