import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import Card from './../../../components/Cards/index'
import ConfirmModal from '../../../components/ConfirmModal/index'

import { FaTrashAlt, FaThumbtack, FaBell } from 'react-icons/fa';
import { Button, Table, Tabs } from 'antd';

import { getNotificationsList, deleteNotifications } from '../../../redux/actions';

function Notifications({
  noticeListData,
  getNotificationsList,
  deleteNotifications
}) {
  const { TabPane } = Tabs;
  const [notificationDetail, setNotificationDetail] = useState([]);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({});
  // const [noticeListData, setNoticeListData] = useState([
  //   {
  //     key: '1',
  //     id: '001',
  //     level: '<div dangerouslySetInnerHTML={{__html: First &middot; Second}}></div>',
  //     title: 'Tài khoản của bạn chỉ còn dưới 5000',
  //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo nemo totam dolore quae commodi. Aliquam quasi placeat rerum aut.',
  //     date: '05/10/2020'
  //   },
  //   {
  //     key: '2',
  //     id: '002',
  //     // level: () => <div className="level" style={{ backgroundColor: 'green' }}></div>,
  //     level: 'cao',
  //     title: 'Tài khoản của bạn chỉ còn dưới 5000',
  //     description: 'Ahihi',
  //     date: '05/10/2020'
  //   },
  //   {
  //     key: '3',
  //     id: '003',
  //     // level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
  //     level: 'cao',
  //     title: 'Tài khoản của bạn chỉ còn dưới 5000',
  //     description: 'Ahihi',
  //     date: '05/10/2020'
  //   },
  //   {
  //     key: '4',
  //     id: '004',
  //     // level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
  //     level: 'cao',
  //     title: 'Tài khoản của bạn chỉ còn dưới 5000',
  //     description: 'Ahihi',
  //     date: '05/10/2020'
  //   },
  // ])
  // const columns = [
  //   {
  //     title: 'ID', dataIndex: 'id', key: 'id',
  //   },
  //   {
  //     title: 'Mức độ', dataIndex: 'level', key: 'level',
  //   },
  //   {
  //     title: 'Tiêu đề', dataIndex: 'title', key: 'title',
  //   },
  //   {
  //     title: 'Ngày', dataIndex: 'date', key: 'date',
  //   },
  //   {
  //     title: 'Hành động', dataIndex: '', key: 'x',
  //     render: () => <Button danger onClick={(key) => handleShowConfirmModal(key)} type="text"><FaTrashAlt /></Button>,
  //   },
  // ];

  const tableData = noticeListData.map((notice) => ({
    key: notice.id,
    ...notice,
  }))

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

  //Render
  // const renderNotificationsList = () => {
  //   return noticeListData.map((item, itemIndex) => {
  //     return (
  //       <>
  //         <tr key={itemIndex}>
  //             <td>{item.id}</td>
  //             <td>{item.level()}</td>
  //             <td className="col-content">{item.title}</td>
  //             <td><Button type="primary" ghost onClick={() => handleToggleDetails(item.id)}>{notificationDetail.findIndex((moreId) => moreId === item.id) === -1 ? 'Chi tiết' : 'Thu gọn'}</Button></td>
  //             <td>{item.date}</td>
  //             <td><Button danger type="text" onClick={() => handleShowConfirmModal(item.id)}><FaTrashAlt /></Button></td>
  //         </tr>
  //           <div>
  //             {(notificationDetail.findIndex((id) => id === item.id) !== -1) && (
  //               <div className="notice-item-description">
  //                 {item.description}
  //               </div>
  //             )}
  //           </div>
  //       </>
  //     );
  //   });
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
              dataSource={tableData}
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