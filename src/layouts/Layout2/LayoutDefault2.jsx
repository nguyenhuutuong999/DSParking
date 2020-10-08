import React from 'react';
import './styles.css'
import Avatar from '../../img/avatar.jpg';
import Sidebar from "./../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './../../routes';
import {FaBell, FaQrcode} from 'react-icons/fa';


function DefaultLayout2() {
  var showContentMenu = (routes) =>{
    var result = null;
    if(routes.length > 0){
      result = routes.map((route, index) =>{
        return (
          <Route key = {index} path={route.path} exact = {route.exact} component={route.main} />
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
              <img src="./../../icon.png" className="img-fluid"  alt="logo"/>
            </div>
            <Sidebar/>
           
          </div>
          <div className="col-xs-1">
            <div className="vl"></div>
          </div>

          <div className="col-xs-9">
            <div className="header-main">
              <div className="title-header">
                <div className="overview">Overview</div>
                <div className="greeting">Hi Tuong, Welcome back !!!</div>
              </div>

              <ul className="header-list">

                <div className="header-items"><img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={Avatar} alt="Avatar"></img></div>
                <a className="header-items" href="#a"><FaBell /></a>
                <a className="header-items" href="#a"><FaQrcode /></a>

              </ul>
            </div>
           
            <Switch>

            {showContentMenu(routes)}
          </Switch>
          </div>
        </div>

      </div>
    </div>
    </Router>

  );
}

export default DefaultLayout2;