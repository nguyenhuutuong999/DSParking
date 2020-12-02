import React from "react";
import './styles.css';

<<<<<<< HEAD
import { Route, NavLink, withRouter } from 'react-router-dom';
import { FaUser, FaBell, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt, FaHome, FaAddressCard, FaUsers } from 'react-icons/fa';
import { RollbackOutlined } from '@ant-design/icons';

import history from '../../util/history'

=======
import { withRouter } from 'react-router-dom';
import { FaUser, FaBell, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt, FaHome, FaAddressCard } from 'react-icons/fa';

import history from '../../util/history'
>>>>>>> dev_tuong
function Sidebar(props) {
  const { role } = props;
  const user_menus = [
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
      name: "Lịch sử",
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
<<<<<<< HEAD
  ];

  const admin_menus = [
    {
      name: "Line Vào",
      to: "/admin",
      exact: true,
      icon: () =><FaHome className="icons" />

    },
    {
      name: "Line ra",
      to: "/admin/lineout",
      exact: true,
      icon: () =><FaHome className="icons" />
    },
=======
   
>>>>>>> dev_tuong
    {
      name: "Thông tin cá nhân",
      to: "/admin/profile",
      exact: true,
<<<<<<< HEAD
      icon: () =><FaUser className="icons" />
    },
    {
      name: "Thống kê",
      to: "/admin/statistic",
      exact: true,
      icon: () =><FaChartArea className="icons" />
    },
    {
      name: "Quản lí người dùng",
      to: "/admin/management",
      exact: true,
      icon: () =><FaUsers className="icons" />
=======
      position: 0,
      icon: () =><FaSignOutAlt className="icons" />
>>>>>>> dev_tuong
    },
  ];

  const sidebarMap = () => {
<<<<<<< HEAD
    if(role === "user"){
      return user_menus.map((item, index) => {
        return (
          <li className={`nav-item ${history.location.pathname === user_menus[index].to && 'nav-item-active'}`} key={index} onClick={() => history.push(user_menus[index].to)}>
            <a href="#" className="nav-link">
=======
    var position = JSON.parse(localStorage.getItem("user")).position;
    return menus.map((item, index) => {
      if(item.position === position || item.position === 0){
        return (
          <li className={`nav-item ${history.location.pathname === menus[index].to && 'nav-item-active'}`} key={index} onClick={() => history.push(menus[index].to)}>
            <a href="#a" className="nav-link">
>>>>>>> dev_tuong
              {item.icon()}
              <span className="link-text">{item.name}</span>
            </a>
          </li>
        );
<<<<<<< HEAD
      });
    }
    else{
      return admin_menus.map((item, index) => {
        return (
          <li className={`nav-item ${history.location.pathname === admin_menus[index].to && 'nav-item-active'}`} key={index} onClick={() => history.push(admin_menus[index].to)}>
            <a href="#" className="nav-link">
              {item.icon()}
              <span className="link-text">{item.name}</span>
            </a>
          </li>
        );
      });
    }
    }

=======
      }
     
    });
  }
>>>>>>> dev_tuong
  return (
    <div className="navbar">
      <ul className="navbar-nav">
        {sidebarMap()}
      </ul>
    </div>
  );
}

export default withRouter(Sidebar);