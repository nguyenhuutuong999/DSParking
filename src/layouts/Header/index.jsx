import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import './styles.css'

import { Space, Badge, Dropdown, Menu } from 'antd';
import { FaBell, FaQrcode } from 'react-icons/fa';

import history from '../../util/history'

import Avatar from '../../img/avatar.jpg';

import {
  firebaseAppAuth,
  firebaseAppProviders,
} from '../../configs/firebase'

function Header({ signOut }) {
  const authData = JSON.parse(localStorage.getItem('authData'));
  const handleLogout = () => {
    signOut();
    localStorage.removeItem('authData');
    return history.push('/login');
  }
  const renderDropdownMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          Thông tin cá nhân
        </Menu.Item>
        <Menu.Item onClick={() => handleLogout()}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <div className="app-header">
      <div className="welcome">Welcome, {authData.name} !!!</div>
      <Space className="header-right" align="center" size="middle">
        <Dropdown overlay={renderDropdownMenu()} placement="bottomCenter">
          <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={Avatar} alt="Avatar" />
        </Dropdown>
        <Badge count={5}>
          <FaBell onClick={() => history.push('/notifications')} />
        </Badge>
        <FaQrcode />
      </Space>
    </div>
  );
}

export default withFirebaseAuth({
  providers: firebaseAppProviders,
  firebaseAppAuth,
})(Header);