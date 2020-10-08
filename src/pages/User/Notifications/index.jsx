import React from 'react';
import './styles.css';

import Card from './../../../components/Cards/index'

import { FaTrashAlt, FaThumbtack, FaBell } from 'react-icons/fa';
import { Button } from 'antd';

function Notifications() {
  return (
    <div className="notification">
      <Card />
      <div className="table-notification">
        <div className="notification-title">
          <p><FaBell style={{marginRight:'10px', fontSize:'25px', fill:"wheat"}}/>Thông báo</p>
        </div>
        <hr></hr>
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
            <tr>
              <td>001</td>
              <td><div className="level" style={{ backgroundColor: 'red' }}></div></td>
              <td className="col-content">Số dư trong tài khoản của bạn chỉ còn dưới 5000</td>
              <td><Button type="primary">Chi tiết</Button></td>
              <td>05/10/2020</td>
              <td><FaTrashAlt/> <FaThumbtack /></td>
            </tr>
            <tr>
              <td>002</td>
              <td><div className="level" style={{ backgroundColor: 'green' }}></div></td>
              <td>Chúc mừng sinh nhật Nguyễn T Bích Ni</td>
              <td><Button type="primary">Chi tiết</Button></td>
              <td>05/10/2020</td>
              <td><FaTrashAlt /> <FaThumbtack /></td>
            </tr>
            <tr>
              <td>001</td>
              <td><div className="level" style={{ backgroundColor: '#fa541c' }}></div></td>
              <td>Số dư trong tài khoản của bạn chỉ còn dưới 5000</td>
              <td><Button type="primary">Chi tiết</Button></td>
              <td>05/10/2020</td>
              <td><FaTrashAlt /> <FaThumbtack /></td>
            </tr>
            <tr>
              <td>001</td>
              <td><div className="level" style={{ backgroundColor: '#fadb14' }}></div></td>
              <td>Số dư trong tài khoản của bạn chỉ còn dưới 5000</td>
              <td><Button type="primary">Chi tiết</Button></td>
              <td>05/10/2020</td>
              <td><FaTrashAlt /> <FaThumbtack /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notifications;