import React from "react";
import { Space } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  BellOutlined,
  HistoryOutlined,
  LineChartOutlined,
  QuestionOutlined,
  FormOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { Text } from '../../components/styles';

import * as Style from './styles';

const USER_SIDEBAR_MENU = [
  {
    name: "Home",
    to: "/",
    exact: true,
    icon: <HomeOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Profile",
    to: "/profile",
    exact: true,
    icon: <UserOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Statistics",
    to: "/statistic",
    exact: true,
    icon: <LineChartOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Notifications",
    to: "/notifications",
    exact: true,
    icon: <BellOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "History",
    to: "/account",
    exact: true,
    icon: <HistoryOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Evaluations",
    to: "/evaluation",
    exact: true,
    icon: <FormOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Support",
    to: "/support",
    exact: true,
    icon: <QuestionOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Setting",
    to: "/setting",
    exact: true,
    icon: <SettingOutlined style={{ fontSize: 16 }} />
  },
];

const ADMIN_SIDEBAR_MENU = [
  {
    name: "Home",
    to: "/admin",
    exact: true,
    icon: <HomeOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Profile",
    to: "/admin/profile",
    exact: true,

    icon: <UserOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Statistic",
    to: "/admin/statistic",
    exact: true,
    icon: <LineChartOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Management",
    to: "/admin/management",
    exact: true,
    icon: <UsergroupAddOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Management Slot",
    to: "/admin/management-slot",
    exact: true,
    icon: <UsergroupAddOutlined style={{ fontSize: 16 }} />
  },
  {
    name: "Logout",
    to: "/login",
    exact: true,
    icon: <LogoutOutlined style={{ fontSize: 16 }} />
  },
]

function Sidebar({ history }) {
  const authData = JSON.parse(localStorage.getItem("user"));
  // const handleLogout = () => {

  //   localStorage.removeItem("user");
  //   return history.push("/login");
  // };

  const role = authData.position;

  const sidebarMenu = role === '4' ? ADMIN_SIDEBAR_MENU : USER_SIDEBAR_MENU;

  return sidebarMenu.map((sidebarItem, sidebarIndex) => {
    return (
      <Style.SidebarItemContainer
        key={`sidebar-${sidebarIndex}`}
        onClick={() => history.push(sidebarItem.to)}
        active={history.location.pathname === sidebarItem.to}
      >
        <Space size={12}>
          {sidebarItem.icon}
          <Text lg>{sidebarItem.name}</Text>
        </Space>
      </Style.SidebarItemContainer>
    )
  })
}

export default Sidebar;
