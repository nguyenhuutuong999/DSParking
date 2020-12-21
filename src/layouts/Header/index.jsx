import React, { useState, useEffect } from "react";
import "./styles.css";

import { Space, Badge, Dropdown, Menu, Button, Modal } from "antd";
import {
  RollbackOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  FaBell,
  FaQrcode,
  FaBirthdayCake,
  FaUser,
  FaExclamationCircle,
} from "react-icons/fa";

import history from "../../util/history";

import AvatarDefault from "../../img/avatardefault.jpg";

import QRCode from "qrcode.react";

import { firebaseApp } from "../../configs/firebase";
import MenuItem from "antd/lib/menu/MenuItem";

function Header({ signOut }) {
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
            <p>Log Out</p>
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
            <p>Happy Birth Day Nguyễn T Bích Ni</p>
          </Space>
        </Menu.Item>
        <Menu.Item
          style={{ height: "40px", borderBottom: "0.2px solid #ededed" }}
        >
          <Space>
            <FaExclamationCircle style={{ fill: "#c44a8a" }} />
            <p>The balance in the account is less than 5000</p>
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

  return (
    <div className="app-header">
      <div className="welcome">
        <p>Hi, {userData.name} !!!</p>
      </div>
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
        </div>
      </Modal>
    </div>
  );
}

export default Header;
