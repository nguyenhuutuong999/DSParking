import React from "react";
import './styles.css';

import { withRouter } from 'react-router-dom';
import { FaUser, FaBell, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt, FaHome, FaAddressCard, FaUsers } from 'react-icons/fa';


import history from '../../util/history'

function Sidebar(props) {

  // const handleLogout = () => {
    
  //   localStorage.removeItem("user");
  //   return history.push("/login");
  // };

  const { role } = props;
  const user_menus = [
    {
      name: "Home",
      to: "/",
      exact: true,
      
      icon: () =><FaHome className="icons" />

    },
    {
      name: "Profile",
      to: "/profile",
      exact: true,
      
      icon: () =><FaUser className="icons" />
    },
    {
      name: "Notifications",
      to: "/notifications",
      exact: true,
      icon: () =><FaBell className="icons" />
    },
    {
      name: "History",
      to: "/account",
      exact: true,
      icon: () =><FaAddressCard className="icons" />
    },
    {
      name: "Statistics",
      to: "/statistic",
      exact: true,
      icon: () =><FaChartArea className="icons" />
    },
    {
      name: "Support",
      to: "/support",
      exact: true,
      icon: () =><FaQuestionCircle className="icons" />
    },
    {
      name: "Evaluations",
      to: "/evaluation",
      exact: true,
      icon: () =><FaPenSquare className="icons" />
    },
    {

      name: "Setting",
      to: "/setting",
      exact: true,
      icon: () =><FaCog className="icons" />
    },
  ];

  const admin_menus = [
    {
      name: "Home",
      to: "/admin",
      exact: true,
      icon: () =><FaHome className="icons" />

    },
    {
      name: "Profile",
      to: "/admin/profile",
      exact: true,

      icon: () =><FaUser className="icons" />
    },
    {
      name: "Statistic",
      to: "/admin/statistic",
      exact: true,
      icon: () =><FaChartArea className="icons" />
    },
    {
      name: "Management", 
      to: "/admin/management",
      exact: true,
      icon: () =><FaUsers className="icons" />

    },
    {
      name: "Logout", 
      to: "/login",
      exact: true,
      icon: () =><FaUsers className="icons" />,
      
    },
  ];

  const sidebarMap = () => {

    if(role === "3"){
      return user_menus.map((item, index) => {
        return (
          <li className={`nav-item ${history.location.pathname === user_menus[index].to && 'nav-item-active'}`} key={index} onClick={() => history.push(user_menus[index].to)}>
            <a href="#" className="nav-link">
              {item.icon()}
              <span className="link-text">{item.name}</span>
            </a>
          </li>
        );

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

  return (
     role === "3"? 
     (<div className="navbar"><ul className="navbar-nav">{sidebarMap()}
     </ul>
      </div>):
      (<div className="navbar-admin"><ul className="navbar-nav-admin">{sidebarMap()}
      </ul>
    </div>)
   
        
  );
}

export default withRouter(Sidebar);