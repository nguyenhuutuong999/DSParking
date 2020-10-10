import React from 'react';
import './styles.css';

import Card from './../../../components/Cards/index'

import { FaAddressCard, FaTrashAlt, FaThumbtack, } from 'react-icons/fa';
import { Button, Form, Input, } from 'antd';

function Account() {
  return (
    <div className="dsp-account">
      <Card/>
      <div className="content-account">
        <div className="account-title">
          <p><span><FaAddressCard style={{marginRight:'10px', fontSize:'25px', fill:"#2c2c2c"}}/></span>Tài Khoản Ngân Hàng/DSPay</p>
        </div>
        <div>
            <Button type="primary" style={{backgroundColor:'#d48806', marginLeft: '82%'}}>Liên kết Ngân Hàng</Button>
            <div className="account-info">
            <Form
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{display:'flex', justifyContent: 'space-between', marginTop:'13px'}}
            >
              <Form.Item label="Tên tài khoản: ">
                <Input />
              </Form.Item>
              <Form.Item label="Số thẻ: ">
                <Input />
              </Form.Item>
              <Form.Item label="Số dư hiện tại: ">
                <Input />
              </Form.Item>
            </Form>
            </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã giao dịch</th>
              <th>Thời gian</th>
              <th>Số tiền</th>
              <th>Mô tả</th>
              <th>Số dư còn lại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>GD001003</td>
              <td>13:30 05/10/2020</td>
              <td>1000</td>
              <td>Phí gửi xe</td>
              <td>4000</td>
              <td><FaTrashAlt /> <FaThumbtack /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Account;