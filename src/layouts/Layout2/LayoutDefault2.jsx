import React from 'react';
import './styles.css'
import Avatar from '../../img/avatar.jpg';
import Sidebar from "./../../components/Sidebar/Sidebar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './../../routes';
import { FaUser, FaBell, FaCaretDown, FaQrcode, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt } from 'react-icons/fa';


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

        <div class="row">
          <div class="col-xs-2">
            <div className="logo-wrapper">
              <img src="./../../icon.png" className="img-fluid" alt="Responsive image" />
            </div>
            <Sidebar/>
           {/* 
           <div className="navbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaUser className="icons" />
                    <span className="link-text">Thông tin cá nhân</span>
                  </a>
                </li>

                 <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaBell className="icons" />
                    <div className="link-text">Thông báo</div>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaChartArea className="icons" />
                    <span className="link-text">Thống kê</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaQuestionCircle className="icons" />
                    <span className="link-text">Hỗ trợ</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaPenSquare className="icons" />
                    <span className="link-text">Đánh giá</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaCog className="icons" />
                    <span className="link-text">Cài đặt</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <FaSignOutAlt className="icons" />
                    <span className="link-text">Đăng xuất</span>
                  </a>
                </li> 
              
              </ul>
            </div>
            */}
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
                <a className="header-items" href="#"><FaBell /></a>
                <a className="header-items" href="#"><FaQrcode /></a>

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