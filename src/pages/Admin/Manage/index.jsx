import React, { useState, useEffect } from "react";
import { Row, Table, Input, Select, Space, Button, Tag, Modal } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  StopOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import { firebaseApp } from "./../../../configs/firebase";

import AddAccountModal from './components/AddAccountModal';
import EditAccountModal from './components/EditAccountModal';

import * as Style from './styles';

const ROLES = ['GuardBOT', 'Guard', 'Teacher', 'Student', 'Admin', 'Place'];

function Manage() {
  const [users, setUsers] = useState([]);
  const [userInfos, setUserInfos] = useState([]);
  const [selectPlace, setSelectPlace] = useState(undefined);
  const [keyword, setKeyword] = useState("");
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [modifyAccountData, setModifyAccountData] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    let arr = [];
    const snap = await firebaseApp.database().ref("User/account").once("value");
    const snapshotValue = snap.val();

    for (let obj in snapshotValue) {
      Array.prototype.push.apply(arr, [snapshotValue[obj]]);
    }
    setUsers(arr);

    let arrInfor = [];
    const snapInfor = await firebaseApp
      .database()
      .ref("User/information")
      .once("value");
    const snapshotValueInfor = snapInfor.val();

    for (let obj in snapshotValueInfor) {
      Array.prototype.push.apply(arrInfor, [snapshotValueInfor[obj]]);
    }
    setUserInfos(arrInfor);
  }

  let tableData = [];

  users.forEach((user) => {
    userInfos.forEach((item) => {
      for (let obj in item) {
        if (user.id === obj) {
          tableData = [
            ...tableData,
            {
              key: user.id,
              id: user.id,
              name: item[obj].name,
              position: user.position,
              address: item[obj].adress ? item[obj].adress : '-',
              avatar: item[obj].avatar,
              money: item[obj].money
                ? parseInt(item[obj].money).toLocaleString("it-IT", { style: "currency", currency: "VND" })
                : '-',
              class: item[obj].classS ? item[obj].classS : '-',
              gender: item[obj].sex
                ? item[obj].sex.toString() === 1 ? 'Male' : 'Female'
                : '-',
              birthday: item[obj].birthday ? item[obj].birthday : '-',
            }
          ];
        }
      }
    });
  });

  function handleEditAccount(record) {
    setIsShowEditModal(true);
    setModifyAccountData(record);
  }

  function handleBlockAccount(record) {
    Modal.confirm({
      title: `Are you sure block ${record.name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  
  }

  const tableFilterData = tableData.filter((item) => {
    if (selectPlace) {
      return item.position === selectPlace && item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    } else {
      return item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    }
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Role',
      dataIndex: 'position',
      render: (_, record) => ROLES[parseInt(record.position)],
    },
    {
      title: 'Class',
      dataIndex: 'class',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
    },
    {
      title: 'Money',
      dataIndex: 'money',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => <Tag color="#87d068">Active</Tag>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() => handleEditAccount(record)}
          >
            <EditOutlined />
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleBlockAccount(record)}
          >
            <StopOutlined />
            Block
          </Button>
        </Space>
      ),
    }
  ]

  return (
    <>
      <Style.ManageContainer>
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <Space size={16}>
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              suffix={<SearchOutlined />}
              placeholder="Search name..."
            />
            <Select
              allowClear
              onChange={(value) => setSelectPlace(value)}
              value={selectPlace}
              placeholder="Filter role"
              style={{ width: 140 }}
            >
              <Select.Option value="0">GuardBOT</Select.Option>
              <Select.Option value="1">Guard</Select.Option>
              <Select.Option value="2">Teacher</Select.Option>
              <Select.Option value="3">Student</Select.Option>
              <Select.Option value="4">Admin</Select.Option>
              <Select.Option value="5">Place</Select.Option>
            </Select>
            <Select
              allowClear
              placeholder="Status account"
              style={{ width: 140 }}
            >
              <Select.Option value="0">Active</Select.Option>
              <Select.Option value="1">Block</Select.Option>
            </Select>
          </Space>
          <Button type="primary" onClick={() => setIsShowAddModal(true)}>Add Account</Button>
        </Row>
        <Table
          columns={columns}
          dataSource={tableFilterData}
          scroll={{ x: 1100 }}
        />
      </Style.ManageContainer>
      <AddAccountModal
        setIsShowAddModal={setIsShowAddModal}
        isShowAddModal={isShowAddModal}
      />
      <EditAccountModal
        setIsShowEditModal={setIsShowEditModal}
        isShowEditModal={isShowEditModal}
        modifyAccountData={modifyAccountData}
      />
    </>
  );
}
export default Manage;
