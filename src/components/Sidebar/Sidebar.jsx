import React, {Component} from "react";
import {Route, NavLink} from 'react-router-dom';
import {FaUser, FaBell, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa';

const menus = [
  {
    name: "Home",
    to: "/",
    exact: true,
    icon:  <FaHome className="icons" />
    
  },
  {
    name: "Thông tin cá nhân",
    to: "/profile",
    exact: true,
    icon:  <FaUser className="icons" />
  },
  {
    name: "Thông báo",
    to: "/notifications",
    exact: true,
    icon:  <FaBell className="icons" />
  },
  {
    name: "Thống kê",
    to: "/statistic",
    exact: true,
    icon:  <FaChartArea className="icons" />
  },
  {
    name: "Hỗ trợ",
    to: "/support",
    exact: true,
    icon: <FaQuestionCircle className="icons" />
  },
  {
    name: "Đánh giá",
    to: "/evaluation",
    exact: true,
    icon:  <FaPenSquare className="icons" />
  },
  {
    name: "Cài đặt",
    to: "/setting",
    exact: true,
    icon: <FaCog className="icons" />
  },
  {
    name: "Đăng xuất",
    to: "/logout",
    exact: true,
    icon: <FaSignOutAlt className="icons" />
  },
  
 
];


const MenuLink = ({label, to, icon, activeOnlyWhenExact}) =>{
  return(
    <Route path = {to} exact = {activeOnlyWhenExact} children = {({match}) =>{
         var active = match ? "active": "";
         return(
          <li className ={`nav-item ${active}`}>
            <NavLink to={to} className="nav-link">
            {icon}
            <span className="link-text">{label}</span>
             </NavLink>
           </li>
         )
    }} />
  )
}
class Menu extends Component{

  showMenu = (menus) =>{
    var result = null;
    result = menus.map((menu, index) => {
      return(
        <MenuLink key = {index} label={menu.name} to = {menu.to} icon = {menu.icon} activeOnlyWhenExact={menu.exact}  />
      )
      
    });
    return result;
  
  }
  render(){
    return (
        
      <div className="navbar">
      <ul className="navbar-nav">
            {this.showMenu(menus)}
         </ul>
       </div>
    );
  }
}


export default Menu;
