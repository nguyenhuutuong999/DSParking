import React, { useState, useEffect } from 'react';
import { Space, Dropdown, Menu, Button, Modal } from 'antd';
import {
  RollbackOutlined,
  DollarOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import QRCode from 'qrcode.react';
import {
  FaBell,
  FaQrcode,
  FaBirthdayCake,
  FaUser,
  FaExclamationCircle,
} from 'react-icons/fa';

import history from '../../util/history';

import MenuItem from 'antd/lib/menu/MenuItem';
import { Text } from '../../components/styles';

import { firebaseApp } from '../../configs/firebase';

import AvatarDefault from '../../img/avatardefault.jpg';

import * as Style from './styles';

import './styles.css';

function Header() {
  const [isShowQrModal, setIsShowQrModal] = useState(false);
  const [userData, setUserData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    firebaseApp
      .database()
      .ref(`/User/information/parkingMan/${user.id}`)
      .on("value", (snapshot) => {
        setUserData({ ...snapshot.val() });
      });
  }, []);

  const handleShowQrModal = () => {
    setIsShowQrModal(true);
  };

  const handleHideQrModal = () => {
    setIsShowQrModal(false);
  };

  const handleLogout = () => {
    firebaseApp.auth().signOut();
    localStorage.removeItem("user");
    return history.push("/login");
  };

  const handleChangeQRCode = () => {
    firebaseApp
      .database()
      .ref(`/User/information/parkingMan/${user.id}`)
      .update({
        secretNum: Math.random().toString().substr(2, 4),
      });
  };

  const renderDropdownAvatar = () => {
    return (
      <Menu>
        <Menu.Item onClick={() => history.push("/profile")}>
          <Space>
            <FaUser />
            <p>Profile</p>
          </Space>
        </Menu.Item>
        <Menu.Item onClick={() => handleLogout()}>
          <Space>
            <RollbackOutlined />
            <p>Log out</p>
          </Space>
        </Menu.Item>
      </Menu>
    );
  };
  const renderDropdownNotification = () => {
    return (
      <Menu className="noti-dropdown-menu" style={{ width: 300 }}>
        <div className="noti-dropdown-title">
          <h6>You have 5 new notifications</h6>
        </div>
        <Menu.Item
          style={{ height: "40px", borderBottom: "0.2px solid #ededed" }}
        >
          <Space>
            <FaBirthdayCake style={{ fill: "#8dc63f" }} />
            <p>Happy Birthday to Đạt</p>
          </Space>
        </Menu.Item>
        <Menu.Item
          style={{ height: "40px", borderBottom: "0.2px solid #ededed" }}
        >
          <Space>
            <FaExclamationCircle style={{ fill: "#cc3f44" }} />
            <p>Your balance less than 5000</p>
          </Space>
        </Menu.Item>
        <MenuItem
          style={{ backgroundColor: "#f5f5f5" }}
          onClick={() => history.push("/notifications")}
        >
          <a href="#" style={{ textAlign: "center", color: "#979898" }}>
            ---All---
          </a>
        </MenuItem>
      </Menu>
    );
  };

  if (user.position === '4') {
    return (
      <Style.AppHeader>
        <Text xl w6>Welcome Back, {userData.name} !!!</Text>
      </Style.AppHeader>
    )
  }
  return (
    <Style.AppHeader>
      <Text xl w6>Hi, {userData.name} !!!</Text>
      <Space className="header-right" align="center" size="middle">
        <div className="header-balance">
          <Space>
            <DollarOutlined />
            <p>
              {parseInt(userData.money)?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </Space>
        </div>
        <div className="div-svg-header">
          <FaQrcode onClick={() => handleShowQrModal()} />
        </div>

        <div className="div-svg-header">
          <Dropdown
            overlay={renderDropdownNotification()}
            placement="bottomRight"
          >
            {/* <Badge count={2}> */}
            <FaBell />
            {/* </Badge> */}
          </Dropdown>
        </div>

        <Dropdown overlay={renderDropdownAvatar()} placement="bottomCenter">
          <img
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            src={userData.avatar ? userData.avatar : AvatarDefault}
            alt="Avatar"
          />
        </Dropdown>
      </Space>

      <Modal
        title="Your QRCode: "
        visible={isShowQrModal}
        footer={false}
        onOk={handleHideQrModal}
        onCancel={handleHideQrModal}
      >
        <QRCode
          value={`${user.id}${userData.secretNum}`}
          size={250}
          style={{ margin: "0 110px" }}
        />
        <div onClick={() => handleChangeQRCode()} className="change-qrcode">
          <Button type="primary" ghost>
            Change QRCode
          </Button>
          <Button type="primary" ghost icon={<DownloadOutlined />}>
            Export
          </Button>
        </div>
      </Modal>
    </Style.AppHeader>
  );
}

export default Header;
