import React from 'react';
import './styles.css'

import { Route } from "react-router-dom";

import Header from '../Header';
import Sidebar from "./../../components/Sidebar/Sidebar";

import branchImg from '../../assets/images/branch.png';

function DefaultLayout2({ component: Component, role, ...props }) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <div className="app-background">
            <div className="app-container">
              <div className="app-sidebar">
                <img src={branchImg} className="branch-img" alt="logo" />
                <Sidebar />
              </div>
              <div className="app-main">
                <Header />
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

export default DefaultLayout2;