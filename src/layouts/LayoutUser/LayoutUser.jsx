import React from 'react';
import './styles.css'
import history from "../../util/history";

import { Route, Redirect } from "react-router-dom";

import Header from '../Header';
import Sidebar from "../../components/Sidebar/Sidebar";

import branchImg from '../../assets/images/branch.png';

function LayoutUser({ component: Component, role, ...props }) {

  const authData = JSON.parse(localStorage.getItem('user'));

  if (!authData) {

    return <Redirect to="/login" />
  } else if (authData.position !== role) {
    if (authData.position === '1') {
      return <Redirect to="/" />
    } else {
      return <Redirect to="/admin" />
    }
  }
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <div className="app-background">
            <div className="app-container">
              <div className="app-sidebar">
                <img src={branchImg} className="branch-img" alt="logo" />
                <Sidebar {...routerProps} role={role} />
              </div>
              <div className="app-main">
                <Header {...routerProps} />
                <div className="app-content">
                  <Component {...routerProps} />

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    />
  );

}

export default LayoutUser;