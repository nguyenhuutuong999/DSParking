import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './styles.css';


import ConfirmModal from '../../../components/ConfirmModal/index'

import { FaTrashAlt } from 'react-icons/fa';
import { Button, Table, Tabs, Tag } from 'antd';

import { firebaseApp } from '../../../configs/firebase';

import { LEVEL_NOTIFICATIONS } from '../../../constants/common';

function Notifications() {
  const { TabPane } = Tabs;
  const [notificationList, setNotificationList] = useState([]);
  console.log("notificationList", notificationList)
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {
    firebaseApp
      .database()
      .ref(`/User/information/parkingMan/${user.id}/notification`)
      .on("value", (snapshot) => {
        let snapshotNotificationList = snapshot.val();
        let newNotificationList = [];
        for (let notificationIndex in snapshotNotificationList) {
          newNotificationList = [
            {
              key: notificationIndex,
              title: snapshotNotificationList[notificationIndex].title,
              content: snapshotNotificationList[notificationIndex].content,
              date: moment(
                snapshotNotificationList[notificationIndex].date,
                "YYYY-MM-DD"
              ).format("DD/MM/YYYY"),
            },
            ...newNotificationList,
          ];
        }
        console.log('🚀 ~ file: index.jsx ~ line 35 ~ .on ~ newNotificationList', newNotificationList);
        setNotificationList([...newNotificationList]);
      });
  }, []);

  const notificationTableColumns = [
    {
      dataIndex: "title",
      key: "title",
    },
    {
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      dataIndex: "action",
      key: "action",
      width: 50,
      render: (_, record) => (
        <Button
          danger
          onClick={() => handleShowConfirmModal(record.id)}
          type="text"
        >
          <FaTrashAlt />
        </Button>
      ),
    },
  ];

  //Hide / Show Modal
  const handleShowConfirmModal = (id) => {
    setIsShowConfirmModal(true);
    setConfirmModalData({ id });
  }
  const handleHideConfirmModal = () => {
    setIsShowConfirmModal(false);
    setConfirmModalData({});
  }


  return (
    <div className="notification">
      <div className="table-notification">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Notifications" key="1">
            <Table
              columns={notificationTableColumns}
              expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
              }}
              dataSource={notificationList}
              pagination={false}
              showHeader={false}
            />
          </TabPane>
        </Tabs>
      </div>
      <ConfirmModal
        isShowModal={isShowConfirmModal}
        handleHideModal={handleHideConfirmModal}
        modalData={confirmModalData}
      />
    </div>
  );
}

export default Notifications;