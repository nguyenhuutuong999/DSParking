import React, { useState, useEffect } from 'react';
import './styles.css'

import { Space, Badge, Dropdown, Menu, Button, Modal } from 'antd';
import { RollbackOutlined, ExclamationCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { FaBell, FaQrcode, FaBirthdayCake, FaUser, FaExclamationCircle } from 'react-icons/fa';

import history from '../../util/history'

import AvatarDefault from '../../img/avatardefault.jpg'

import QRCode from 'qrcode.react';

import {
  firebaseApp,
} from '../../configs/firebase'
import MenuItem from 'antd/lib/menu/MenuItem';

function Header({ signOut }) {
  const [isShowQrModal, setIsShowQrModal] = useState(false);
  const [userData, setUserData] = useState({});

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    firebaseApp.database().ref(`/User/information/parkingMan/${user.id}`).on('value', (snapshot) => {
      setUserData({ ...snapshot.val() });
    })
  }, [])

  const handleShowQrModal = () => {
    setIsShowQrModal(true);
  }

  const handleHideQrModal = () => {
    setIsShowQrModal(false);
  }

  const handleLogout = () => {
    firebaseApp.auth().signOut();
    localStorage.removeItem('user');
    return history.push('/login');
  }

  const handleChangeQRCode = () => {
    firebaseApp.database().ref(`/users/${user.id}`).update({
      qrPin: Math.random().toString().substr(2, 4),
    })
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
        <p>Xin chào, {userData.name} !!!</p>

      </div>
      <Space className="header-right" align="center" size="middle">
        <div className="header-balance">
          <Space>
            <DollarOutlined />
            <p>{userData.money?.toLocaleString('vi')}</p>
          </Space>
        </div>
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
          <img style={{ width: '35px', height: '35px', borderRadius: '50%' }} src={userData.avatar ? userData.avatar : AvatarDefault} alt="Avatar" />
        </Dropdown>
      </Space>

      <Modal
        title="QRCode của bạn: "
        visible={isShowQrModal}
        footer={false}
        onOk={handleHideQrModal}
        onCancel={handleHideQrModal}
      >
        <QRCode value={`${user.id}${userData.secretNum}`} size={250} style={{ margin: '0 110px' }} />
        <div onClick={() => handleChangeQRCode()}><Button type="primary" ghost >Đổi QRCode</Button></div>
      </Modal>
    </div>

  );
}

export default Header;