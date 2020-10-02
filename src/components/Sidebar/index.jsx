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

            <li className="nav-item">
                <a href="#" className="nav-link">
                    <FaUser className="icons"/>
                    <span className="link-text">Thông tin cá nhân</span>
                </a>
            </li>

            <li className="nav-item">
                <a href="#" className="nav-link">
                    <FaBell className="icons"/>
                    <span className="link-text">Thông báo</span>
                </a>
            </li>

            <li className="nav-item">
                <a href="#" className="nav-link">
                    <FaAddressCard className="icons"/>
                    <span className="link-text">Tài khoản DSParking</span>
                </a>
            </li>

            <li className="nav-item">
                <a href="#" className="nav-link">
                    <FaChartArea className="icons"/>
                    <span className="link-text">Thống kê</span>
                </a>
            </li>

            <li className="nav-item">
                <a href="#" className="nav-link">
                    < FaQuestionCircle className="icons"/>
                    <span className="link-text">Hỗ trợ</span>
                </a>
            </li>

            <li className="nav-item">
                <a href="#" className="nav-link">
                    < FaPenSquare className="icons"/>
                    <span className="link-text">Đánh giá</span>
                </a>
            </li>

            <li className="nav-item">
                <a href="#" className="nav-link">
                    <FaCog className="icons"/>
                    <span className="link-text">Cài đặt</span>
                </a>
            </li>

            <li className="nav-item">
                <a href="#" className="nav-link">
                    <FaSignOutAlt className="icons"/>
                    <span className="link-text">Đăng xuất</span>
                </a>
            </li>
        </ul>
    </div>
  );
}

export default Sidebar;