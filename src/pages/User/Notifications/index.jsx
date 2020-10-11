import React, {useState} from 'react';
import './styles.css';

import Card from './../../../components/Cards/index'

import { FaTrashAlt, FaThumbtack, FaBell } from 'react-icons/fa';
import { Button } from 'antd';

function Notifications(props) {
  const [notificationsListData, setNotificationsListData] = useState([
    {
      id: '001',
      level: () => <div className="level" style={{ backgroundColor: '#f5222d' }}></div>,
      title:'Số dư trong tài khoản của bạn chỉ còn dưới 5000',
      date:'05/10/2020'
    },
    {
      id: '001',
      level: () => <div className="level" style={{ backgroundColor: 'green' }}></div>,
      title:'Số dư trong tài khoản của bạn chỉ còn dưới 5000',
      date:'05/10/2020'
    },
    {
      id: '001',
      level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
      title:'Số dư trong tài khoản của bạn chỉ còn dưới 5000',
      date:'05/10/2020'
    },
  ])

  const renderNotificationsList = () => {
    return notificationsListData.map((item, itemIndex) => {
      return (
        <tr key={itemIndex}>
          <td>{item.id}</td>
          <td>{item.level()}</td>
          <td className="col-content">{item.title}</td>
          <td><Button type="primary" ghost>Chi tiết</Button></td>
          <td>{item.date}</td>
          <td><FaTrashAlt /> <FaThumbtack /></td>
        </tr>
      );
    });
  }

  return (
    <div className="notification">
      <Card />
      <div className="table-notification">
        <div className="notification-title">
          <p><FaBell/>Thông báo</p>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderNotificationsList()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notifications;