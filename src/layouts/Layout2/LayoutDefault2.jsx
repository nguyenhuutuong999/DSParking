import React from 'react';
import { Route } from "react-router-dom";
import { Space } from 'antd';
import './styles.css'

import { FaBell, FaQrcode } from 'react-icons/fa';

import Avatar from '../../img/avatar.jpg';

import Sidebar from "./../../components/Sidebar/Sidebar";
import Header from '../../components/Header/index'

import branchImg from '../../assets/images/branch.png';

function DefaultLayout2({ component: Component, ...props }) {
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
                <div className="app-header">
                  {/* <Header /> */}
                  <div className="welcome">Welcome, Ni !!!</div>
                  <Space className="header-right" align="center" size="middle">
                    <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={Avatar} alt="Avatar"></img>
                    <FaBell />
                    <FaQrcode />
                  </Space>
                </div>
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