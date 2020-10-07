import React from 'react';
import './styles.css';

import logo from '../../img/logo.png'
import {FaUser, FaBell, FaAddressCard, FaChartArea, FaQuestionCircle, FaPenSquare, FaCog, FaSignOutAlt} from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="navbar">
        <ul className="navbar-nav">
            <li className="nav-item nav-item-first">
                <a href="#" className="nav-link">
                    <img src={logo} style={{width: '50px', margin: '8px'}}/>
                    <span className="link-text">DSParking</span>
                </a>
            </li>
            <li className="nav-item nav-item-first">
                <a href="#" className="nav-link">
                    <img src={logo} style={{width: '50px', margin: '8px'}}/>
                    <span className="link-text">DSParking</span>
                </a>
            </li>
            <li className="nav-item nav-item-first">
                <a href="#" className="nav-link">
                    <img src={logo} style={{width: '50px', margin: '8px'}}/>
                    <span className="link-text">DSParking</span>
                </a>
            </li>
            <li className="nav-item nav-item-first">
                <a href="#" className="nav-link">
                    <img src={logo} style={{width: '50px', margin: '8px'}}/>
                    <span className="link-text">DSParking</span>
                </a>
            </li>
            <li className="nav-item nav-item-first">
                <a href="#" className="nav-link">
                    <img src={logo} style={{width: '50px', margin: '8px'}}/>
                    <span className="link-text">DSParking</span>
                </a>
            </li>
        </ul>
        
    </div>
  );
}

export default Sidebar;