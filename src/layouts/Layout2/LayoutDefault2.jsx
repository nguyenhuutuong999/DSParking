import React from 'react';
import './styles.css'
import { Route } from "react-router-dom";
import Sidebar from "./../../components/Sidebar/Sidebar";
import Header from '../../components/Header/index'

function DefaultLayout2({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
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