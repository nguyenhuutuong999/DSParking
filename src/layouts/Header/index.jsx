import React, {useState} from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import './styles.css'

import { Space, Badge, Dropdown, Menu, Button, Modal } from 'antd';
import { FaBell, FaQrcode, FaBirthdayCake } from 'react-icons/fa';

import history from '../../util/history'

import Avatar from '../../img/avatar.jpg';
import Qrcode from '../../img/qrcode.png'

import {
  firebaseAppAuth,
  firebaseAppProviders,
} from '../../configs/firebase'

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
        <Menu.Item>
          Thông tin cá nhân
        </Menu.Item>
        <Menu.Item onClick={() => handleLogout()}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    )
  }
  const renderDropdownNotification = () => {
    return (
      <Menu className="noti-dropdown-menu" style={{ width: 300 }}>
        <div className="noti-dropdown-title">
          <h3>Thông báo</h3>
        </div>
        <Menu.Item>
          <Space>
            <FaBirthdayCake/>
            <p>Chúc mừng sinh nhật Nguyễn T Bích Ni</p>
          </Space>
        </Menu.Item>
        <Menu.Item>
          <Space>
            <FaBirthdayCake/>
            <p>Số dư trong tài khoản dưới 5000</p>
          </Space>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div className="app-header">
      <div className="welcome">Welcome, {authData.name} !!!</div>
      <Space className="header-right" align="center" size="middle">
        <Dropdown overlay={renderDropdownAvatar()} placement="bottomCenter">
          <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={Avatar} alt="Avatar" />
        </Dropdown>

        <Badge count={5}>
          <Dropdown overlay={renderDropdownNotification()} placement="bottomRight">
            <FaBell onClick={() => history.push('/notifications')} />
          </Dropdown>
        </Badge>
        <Button danger type="text" onClick={() =>handleShowQrModal()}><FaQrcode/></Button>
      </Space>

      <Modal
          title="Your QRCode"
          visible={isShowQrModal}
          onOk={handleHideQrModal}
          onCancel={handleHideQrModal}
      >
          <img src={Qrcode} style={{width:'300px', height:'300px', margin:'4px 85px'}}/>
      </Modal>
    </div>
   
  );
}

export default withFirebaseAuth({
  providers: firebaseAppProviders,
  firebaseAppAuth,
})(Header);