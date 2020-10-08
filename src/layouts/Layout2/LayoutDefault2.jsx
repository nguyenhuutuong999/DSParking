import React from 'react';
import './styles.css'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FaBell, FaQrcode } from 'react-icons/fa';

import Avatar from '../../img/avatar.jpg';

import Sidebar from "./../../components/Sidebar/Sidebar";
import Header from '../../components/Header/index'
import routes from './../../routes';


function DefaultLayout2() {
  var showContentMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        )
      })
    }
    return result;
  }
  return (
    <Router>
      <div className="page">
        <div className="container">

          <div className="row">
            <div className="col-xs-2">
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
                <Switch>
                  {showContentMenu(routes)}
                </Switch>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Router>

  );
}

export default DefaultLayout2;