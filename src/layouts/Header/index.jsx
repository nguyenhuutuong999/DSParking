import React, { useState, useEffect } from 'react';
import { Row, Space, Dropdown, Menu, Button, Modal } from 'antd';
import {
  DollarOutlined,
  DownloadOutlined,
  QrcodeOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import QRCode from 'qrcode.react';
import {
  FaBirthdayCake,
  FaExclamationCircle,
} from 'react-icons/fa';

import history from '../../util/history';

import MenuItem from 'antd/lib/menu/MenuItem';
import { Text } from '../../components/styles';

import { firebaseApp } from '../../configs/firebase';

import AvatarDefault from '../../img/avatardefault.jpg';

import * as Style from './styles';

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
      <Menu style={{ width: 140 }}>
        <Menu.Item onClick={() => history.push("/profile")}>
          <Space>
            <UserOutlined style={{ fontSize: 16 }} />
            <Text>Profile</Text>
          </Space>
        </Menu.Item>
        <Menu.Item onClick={() => handleLogout()}>
          <Space>
            <LogoutOutlined style={{ fontSize: 16 }} />
            <Text>Log out</Text>
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
      <Space size="middle">
        <Style.MoneyButton
          type="primary"
          shape="round"
          icon={<DollarOutlined style={{ fontSize: 24 }} />}
        >
          {parseInt(userData.money)?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </Style.MoneyButton>
        <Style.HeaderButton onClick={() => handleShowQrModal()}>
          <QrcodeOutlined style={{ fontSize: 20, color: '#c44a8a' }} />
        </Style.HeaderButton>
        <Dropdown overlay={renderDropdownNotification()} arrow>
          <Style.HeaderButton onClick={() => history.push('/notifications')}>
            <BellOutlined style={{ fontSize: 20, color: '#c44a8a' }} />
          </Style.HeaderButton>
        </Dropdown>
        <Dropdown overlay={renderDropdownAvatar()} placement="bottomLeft" arrow>
          <img
            style={{ width: "36px", height: "36px", borderRadius: "50%", cursor: 'pointer' }}
            src={userData.avatar ? userData.avatar : AvatarDefault}
            alt="Avatar"
          />
        </Dropdown>
      </Space>

      <Modal
        title="Your QRCode"
        visible={isShowQrModal}
        onOk={handleHideQrModal}
        onCancel={handleHideQrModal}
        width={300}
        footer={
          <Row justify="space-between">
            <Button type="primary" ghost onClick={() => handleChangeQRCode()}>
              Change QRCode
            </Button>
            <Button type="primary" ghost icon={<DownloadOutlined />}>
              Export
            </Button>
          </Row>
        }
      >
        <QRCode
          value={`${user.id}${userData.secretNum}`}
          size={252}
        />
      </Modal>
    </Style.AppHeader>
  );
}

export default Header;
