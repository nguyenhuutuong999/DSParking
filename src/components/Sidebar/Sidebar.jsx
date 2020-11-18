import React from "react";
import './styles.css';

import { withRouter } from 'react-router-dom';
import { FaUser, FaBell, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt, FaHome, FaAddressCard } from 'react-icons/fa';

import history from '../../util/history'
function Sidebar(props) {
  const menus = [
    {
      name: "Home",
      to: "/",
      exact: true,
      position: 0,
      icon: () =><FaHome className="icons" />

    },
    {
      name: "Thông tin cá nhân",
      to: "/profile",
      exact: true,
      position: 0,
      icon: () =><FaUser className="icons" />
    },
    {
      name: "Thông báo",
      to: "/notifications",
      exact: true,
      position: 1,
      icon: () =><FaBell className="icons" />
    },
    {
      name: "Tài khoản DSParking",
      to: "/account",
      exact: true,
      position: 1,
      icon: () =><FaAddressCard className="icons" />
    },
    {
      name: "Thống kê",
      to: "/statistic",
      exact: true,
      position: 0,
      icon: () =><FaChartArea className="icons" />
    },
    {
      name: "Hỗ trợ",
      to: "/support",
      exact: true,
      position: 1,
      icon: () =><FaQuestionCircle className="icons" />
    },
    {
      name: "Đánh giá",
      to: "/evaluation",
      exact: true,
      position: 1,
      icon: () =><FaPenSquare className="icons" />
    },
    {
      name: "Quản lí account",
      to: "/manage",
      exact: true,
      position: 2,
      icon: () =><FaSignOutAlt className="icons" />
    },
    {
      name: "Cài đặt",
      to: "/setting",
      exact: true,
      position: 0,
      icon: () =><FaCog className="icons" />
    },
   
    {
      name: "Đăng xuất",
      to: "/login",
      exact: true,
      position: 0,
      icon: () =><FaSignOutAlt className="icons" />
    },
  ];
  const sidebarMap = () => {
    var position = JSON.parse(localStorage.getItem("user")).position;
    return menus.map((item, index) => {
      if(item.position === position || item.position === 0){
        return (
          <li className={`nav-item ${history.location.pathname === menus[index].to && 'nav-item-active'}`} key={index} onClick={() => history.push(menus[index].to)}>
            <a href="#a" className="nav-link">
              {item.icon()}
              <span className="link-text">{item.name}</span>
            </a>
          </li>
        );
      }
     
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