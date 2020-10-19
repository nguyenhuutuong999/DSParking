import React, { useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import './styles.css'

import { Space, Badge, Dropdown, Menu, Button, Modal } from 'antd';
import { RollbackOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { FaBell, FaQrcode, FaBirthdayCake, FaUser, FaExclamationCircle } from 'react-icons/fa';

import history from '../../util/history'

import Avatar from '../../img/avatar.jpg';
import Qrcode from '../../img/qrcode.png'

import {
  firebaseAppAuth,
  firebaseAppProviders,
} from '../../configs/firebase'
import MenuItem from 'antd/lib/menu/MenuItem';

function Header({ signOut }) {
  const [isShowQrModal, setIsShowQrModal] = useState(false);
  const handleShowQrModal = () => {
    setIsShowQrModal(true);
  }

  const handleHideQrModal = () => {
    setIsShowQrModal(false);
  }

  const authData = JSON.parse(localStorage.getItem('authData'));
  const handleLogout = () => {
    signOut();
    localStorage.removeItem('authData');
    return history.push('/login');
  }
  const renderDropdownAvatar = () => {
    return (
      <Menu>
        <Menu.Item onClick={() => history.push('/profile')} >
          <Space>
            <FaUser />
            <p> Thông tin cá nhân</p>
          </Space>
        </Menu.Item>
        <Menu.Item onClick={() => handleLogout()}>
          <Space>
            <RollbackOutlined />
            <p>Đăng xuất</p>
          </Space>
        </Menu.Item>
      </Menu>
    )
  }
  const renderDropdownNotification = () => {
    return (
      <Menu className="noti-dropdown-menu" style={{ width: 300, }}>
        <div className="noti-dropdown-title">
          <h6>Bạn có 5 thông báo mới</h6>
        </div>
        <Menu.Item style={{ height: '40px', borderBottom: '0.2px solid #ededed' }}>
          <Space>
            <FaBirthdayCake style={{ fill: '#8dc63f' }} />
            <p>Chúc mừng sinh nhật Nguyễn T Bích Ni</p>
          </Space>
        </Menu.Item>
        <Menu.Item style={{ height: '40px', borderBottom: '0.2px solid #ededed' }}>
          <Space>
            <FaExclamationCircle style={{ fill: '#cc3f44' }} />
            <p>Số dư trong tài khoản dưới 5000</p>
          </Space>
        </Menu.Item>
        <MenuItem style={{ backgroundColor: '#f5f5f5' }} onClick={() => history.push('/notifications')}>
          <a href="#" style={{ textAlign: 'center', color: '#979898' }}>---Xem tất cả---</a>
        </MenuItem>
      </Menu>
    )
  }

  return (
    <div className="app-header">
      <div className="welcome">
        <p>Xin chào, {authData.name} !!!</p>
        <p className="header-balance">Số dư: 5000</p>
      </div>
      <Space className="header-right" align="center" size="middle">
        <div className="div-svg-header">
          <FaQrcode onClick={() => handleShowQrModal()} />
        </div>

        <div className="div-svg-header">
          
            <Dropdown overlay={renderDropdownNotification()} placement="bottomRight">
            {/* <Badge count={2}> */}
              <FaBell />
            {/* </Badge> */}
            </Dropdown>
        </div>

          <Dropdown overlay={renderDropdownAvatar()} placement="bottomCenter">
            <img style={{ width: '35px', height: '35px', borderRadius: '50%' }} src={Avatar} alt="Avatar" />
          </Dropdown>
      </Space>

      <Modal
        title="QRCode của bạn"
        visible={isShowQrModal}
        onOk={handleHideQrModal}
        onCancel={handleHideQrModal}
      >
        <img src={Qrcode} style={{ width: '300px', height: '300px', margin: '4px 85px' }} />
      </Modal>
    </div>

  );
}

export default withFirebaseAuth({
  providers: firebaseAppProviders,
  firebaseAppAuth,
})(Header);