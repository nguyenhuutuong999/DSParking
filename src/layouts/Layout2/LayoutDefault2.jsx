import React from 'react';
import './styles.css'
<<<<<<< HEAD

import { Route, Redirect } from "react-router-dom";

import Header from '../Header';
import Sidebar from "./../../components/Sidebar/Sidebar";

import branchImg from '../../assets/images/branch.png';

function DefaultLayout2({ component: Component, role, ...props }) {
  const authData = JSON.parse(localStorage.getItem('authData'));
  if (!authData){
    return <Redirect to="/login" />
  } else if (authData.role !== role) {
    if (authData.role === 'user') {
      return <Redirect to="/" />
    } else {
      return <Redirect to="/admin" />
    }
  }
=======
import { Route } from "react-router-dom";
import Sidebar from "./../../components/Sidebar/Sidebar";
import Header from '../../components/Header/index'

function DefaultLayout2({ component: Component, ...props }) {
>>>>>>> dev_tuong
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
<<<<<<< HEAD
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
=======
          <div className="page">
            <div className="app-container">
              <div className="row">
                <div className="col-xs-2 side-bar">
                  <div className="logo-wrapper">
                    <img src="./../../icon.png" className="img-fluid" alt="logo" />
                  </div>
                  <Sidebar />
                </div>
                <div className="col-xs-1">
                  <div className="vl"></div>
                </div>

                <div className="col-xs-9">
                  <Header />
                  <div className="main">
                    <Component {...routerProps} />
                  </div>
>>>>>>> dev_tuong
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