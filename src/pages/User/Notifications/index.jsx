import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import Card from './../../../components/Cards/index'
import ConfirmModal from '../../../components/ConfirmModal/index'

import { FaTrashAlt, FaThumbtack, FaBell } from 'react-icons/fa';
import { Button } from 'antd';

import {getNotificationsList, deleteNotifications} from '../../../redux/actions/index';

function Notifications({
  noticeListData,
  getNotificationsList,
  deleteNotifications,
}) {
  const [notificationDetail, setNotificationDetail] = useState([]);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({});
  //Show Details
  const handleToggleDetails = (id) => {
    const moreNotificationIndex = notificationDetail.findIndex((moreId) => moreId === id);
    if (moreNotificationIndex === -1) {
      setNotificationDetail([
        ...notificationDetail,
        id,
      ]);
    } else {
      const newDetailList = notificationDetail;
      newDetailList.splice(moreNotificationIndex, 1);
      setNotificationDetail([
        ...newDetailList,
      ]);
    }
  }
  //Hide / Show Modal
  const handleShowConfirmModal = (index) => {
    setIsShowConfirmModal(true);
    setConfirmModalData({ index: index });
  }
  const handleHideConfirmModal = () => {
    setIsShowConfirmModal(false);
    setConfirmModalData({});
  }

  //Delete
  // const handleDeleteNotifications = (deletedId) => {
  //   deleteNotifications({
  //     id: deletedId
  //   })
  //   const newNotificationListData = noticeListData;
  //   const notificationIndex = noticeListData.findIndex((item) => item.id === deletedId);
  //   newNotificationListData.splice(notificationIndex, 1);
  //   setNotificationsListData([
  //     ...newNotificationListData,
  //   ]);
  //   setIsShowConfirmModal(null);
  // }

  const handleDeleteNotifications = (deletedId) => {
    deleteNotifications({id: deletedId})
    setIsShowConfirmModal(false);
  }

  //Render
  const renderNotificationsList = () => {
    return noticeListData.map((item, itemIndex) => {
      return (
        <>
          <tr key={itemIndex}>
              <td>{item.id}</td>
              <td>{item.level}</td>
              <td className="col-content">{item.title}</td>
              <td><Button type="primary" ghost onClick={() => handleToggleDetails(item.id)}>{notificationDetail.findIndex((moreId) => moreId === item.id) === -1 ? 'Chi tiết' : 'Thu gọn'}</Button></td>
              <td>{item.date}</td>
              {/* <td><FaTrashAlt /> <FaThumbtack /></td> */}
              <td><Button danger type="text" onClick={() => handleShowConfirmModal(item.id)}>Xóa</Button></td>
          </tr>
            <div>
              {(notificationDetail.findIndex((id) => id === item.id) !== -1) && (
                <div className="todo-item-description">
                  {item.description}
                </div>
              )}
            </div>
        </>
      );
    });

  }

  return (
    <div className="notification">
      <Card />
      <div className="table-notification">
        <div className="notification-title">
          <p><FaBell />Thông báo</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mức độ</th>
              <th>Nội dung</th>
              <th>Chi tiết</th>
              <th>Ngày</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {renderNotificationsList()}
          </tbody>
        </table>
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
  const { noticeListData} = state;
  return {
    noticeListData,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationsList: (params) => dispatch(getNotificationsList(params)),
    deleteNotifications: (params) => dispatch(deleteNotifications(params))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);