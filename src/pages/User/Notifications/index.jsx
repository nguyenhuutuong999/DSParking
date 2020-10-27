import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './styles.css';

import Card from './../../../components/Cards/index'
import ConfirmModal from '../../../components/ConfirmModal/index'

import { FaTrashAlt, FaThumbtack, FaBell } from 'react-icons/fa';
import { Button, Table, Tabs } from 'antd';

import { getNotificationsList, deleteNotifications } from '../../../redux/actions';
import { firebaseApp } from '../../../configs/firebase';

import { LEVEL_NOTIFICATIONS } from '../../../constants/common';

function Notifications({
  noticeListData,
  getNotificationsList,
  deleteNotifications
}) {
  const { TabPane } = Tabs;
  const [notificationList, setNotificationList] = useState([]);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({});
  const authData = JSON.parse(localStorage.getItem('authData'));

  const tableData = noticeListData.map((notice) => ({
    key: notice.id,
    ...notice,
  }))

  useEffect(() => {
    firebaseApp.database().ref(`/users/${authData.uid}/notification`).on('value', (snapshot) => {
      let snapshotNotificationList = snapshot.val();
      let newNotificationList = [];
      for (let notificationIndex in snapshotNotificationList) {
        newNotificationList = [
          {
            id: 'null',
            level: LEVEL_NOTIFICATIONS[snapshotNotificationList[notificationIndex].level],
            title: snapshotNotificationList[notificationIndex].title,
            description: snapshotNotificationList[notificationIndex].content,
            date: moment(snapshotNotificationList[notificationIndex].dateTime, 'YYYYMMDDHHmm').format('DD/MM/YYYY HH:mm'),
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
       render: (_, record) => <div dangerouslySetInnerHTML={{ __html: record.level } } style={{width:'80px', height:'10px', backgroundColor: record.level, borderRadius:'10px'}}></div>,
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

  //Delete
  const handleDeleteNotifications = () => {
    console.log("handleDeleteNotifications -> handleDeleteNotifications")
    deleteNotifications({ id: confirmModalData.id })
    setIsShowConfirmModal(false);
  }
  // const handleDeleteNotifications = (deletedId) => {
  //   const newNotificationListData = noticeListData;
  //   const notificationIndex = noticeListData.findIndex((item) => item.id === deletedId);
  //   newNotificationListData.splice(notificationIndex, 1);
  //   setNoticeListData([
  //     ...newNotificationListData,
  //   ]);
  //   setIsShowConfirmModal(null);
  // }

  
  // //Show Details
  // const handleToggleDetails = (id) => {
  //   const moreNotificationIndex = notificationDetail.findIndex((moreId) => moreId === id);
  //   if (moreNotificationIndex === -1) {
  //     setNotificationDetail([
  //       ...notificationDetail,
  //       id,
  //     ]);
  //   } else {
  //     const newDetailList = notificationDetail;
  //     newDetailList.splice(moreNotificationIndex, 1);
  //     setNotificationDetail([
  //       ...newDetailList,
  //     ]);
  //   }
  // }

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
        handleDeleteNotifications={handleDeleteNotifications}
        modalData={confirmModalData}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log('Log: mapStateToProps -> state', state);
  const { noticeListData } = state;
  return {
    noticeListData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationsList: (params) => dispatch(getNotificationsList(params)),
    deleteNotifications: (params) => dispatch(deleteNotifications(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);