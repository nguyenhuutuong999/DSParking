import React , {useState} from 'react';
import './styles.css';
import { connect } from 'react-redux';

import Card from './../../../components/Cards/index'

import { FaAddressCard, FaTrashAlt, FaThumbtack, } from 'react-icons/fa';
import { Button, Form, Input, Table } from 'antd';

import { getTransactionsList } from '../../../redux/actions';


function Account({
  getTransactionsList,
  transactionsList,
}) {
  // const [transactionsList, setTransactionsList] = useState([
  //   {
  //     no:'001',
  //     id:'GD10112020',
  //     time:'10/11/2020',
  //     money: '2000',
  //     title: 'Top Up to DSParking',
  //     balance:'4000',
  //   },
  // ])
  const columns = [
    {
      title: 'Mã GD',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Số tiền',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Nội dung',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Số dư',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];
  const renderTransactionList = () => {
    return transactionsList.map((item, itemIndex) => {
      return (
        <tr key={itemIndex}>
          <td>{item.no}</td>
          <td>{item.id}</td>
          <td>{item.time}</td>
          <td>{item.money}</td>
          <td>{item.title}</td>
          <td>{item.balance}</td>
          <td><FaTrashAlt /> <FaThumbtack /></td>
        </tr>
      );
    });
  }

  return (
    <div className="dsp-account">
      <Card/>
      <div className="content-account">
        <div className="account-title">
          <p><span><FaAddressCard/></span>Tài Khoản Ngân Hàng/DSPay</p>
        </div>
        <div className="account-form">
            <Button>Liên kết Ngân Hàng</Button>
            <div className="account-info">
            <Form
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{display:'flex', justifyContent: 'space-between', marginTop: '13px'}}
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
        <div className="div-table">
        {/* <table>
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
            {renderTransactionList()}
          </tbody>
        </table> */}
        <Table columns={columns} dataSource={transactionsList} pagination={false} />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log('Log: mapStateToProps -> state', state);
  const { transactionsList } = state;
  return {
    transactionsList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionsList: (params) => dispatch(getTransactionsList(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);