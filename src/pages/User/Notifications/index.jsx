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
    firebaseApp.database().ref(`/User/information/parkingMan/${user.id}/notification/notifi1`).on('value', (snapshot) => {
      let snapshotNotificationList = snapshot.val();
      console.log("🚀 ~ file: index.jsx ~ line 27 ~ firebaseApp.database ~ snapshotNotificationList", snapshotNotificationList)
      let newNotificationList = [];
      for (let notificationIndex in snapshotNotificationList) {
        newNotificationList = [
          {
            id: 'null',
            // level: snapshotNotificationList[notificationIndex].level,
            title: snapshotNotificationList.title,
            content: snapshotNotificationList[notificationIndex].content,
            date: moment(snapshotNotificationList[notificationIndex].date, 'YYYYMMDDHHmm').format('DD/MM/YYYY HH:mm'),
          },
          ...newNotificationList,
        ]
      }
      setNotificationList([...newNotificationList]);
    })
  }, [])

  const columns = [
    {
      dataIndex: 'level', key: 'level',
      render: (_, record) => {
        return (
          <Tag color={record.level === 'high' ? 'red' : 'gold'}>
            {LEVEL_NOTIFICATIONS[record.level]}
          </Tag>
        )
      }
    },
    {
      dataIndex: 'title', key: 'title',
    },
    {
      dataIndex: 'date', key: 'date',
    },
    {
      dataIndex: '', key: 'x',
      render: (_, record) => <Button danger onClick={() => handleShowConfirmModal(record.id)} type="text"><FaTrashAlt /></Button>,
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
          <TabPane tab="Thông báo" key="1">
            <Table
              columns={columns}
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