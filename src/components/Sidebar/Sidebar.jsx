import React, { Component } from "react";
import './styles.css';

import { Route, NavLink, withRouter } from 'react-router-dom';
import { FaUser, FaBell, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt, FaHome, FaAddressCard } from 'react-icons/fa';
import { RollbackOutlined } from '@ant-design/icons';

import history from '../../util/history'

function Sidebar(props) {
  const menus = [
    {
      name: "Home",
      to: "/",
      exact: true,
      icon: () =><FaHome className="icons" />

    },
    {
      name: "Thông tin cá nhân",
      to: "/profile",
      exact: true,
      icon: () =><FaUser className="icons" />
    },
    {
      name: "Thông báo",
      to: "/notifications",
      exact: true,
      icon: () =><FaBell className="icons" />
    },
    {
      name: "Tài khoản DSParking",
      to: "/account",
      exact: true,
      icon: () =><FaAddressCard className="icons" />
    },
    {
      name: "Thống kê",
      to: "/statistic",
      exact: true,
      icon: () =><FaChartArea className="icons" />
    },
    {
      name: "Hỗ trợ",
      to: "/support",
      exact: true,
      icon: () =><FaQuestionCircle className="icons" />
    },
    {
      name: "Đánh giá",
      to: "/evaluation",
      exact: true,
      icon: () =><FaPenSquare className="icons" />
    },
    {
      name: "Cài đặt",
      to: "/setting",
      exact: true,
      icon: () =><FaCog className="icons" />
    },
    {
      name: "Đăng xuất",
      to: "/login",
      exact: true,
      icon: () =><RollbackOutlined className="icons" />
    },
  ];
  const sidebarMap = () => {
    return menus.map((item, index) => {
      return (
        <li className={`nav-item ${history.location.pathname === menus[index].to && 'nav-item-active'}`} key={index} onClick={() => history.push(menus[index].to)}>
          <a href="#" className="nav-link">
            {item.icon()}
            <span className="link-text">{item.name}</span>
          </a>
        </li>
      );
    });
  }
  return (
    <div className="navbar">
      <ul className="navbar-nav">
        {sidebarMap()}
      </ul>
    </div>
  );
}

export default withRouter(Sidebar);