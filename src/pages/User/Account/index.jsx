import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Table, Tabs, List } from 'antd';

import {
  firebaseApp,
} from '../../../configs/firebase';

import { LOCATION } from '../../../constants/common';

import * as Style from './styles';

function AccountPage({
  transactionsList,
}) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [checkInHistory, setCheckInHistory] = useState([]);


  useEffect(() => {
    firebaseApp.database().ref(`/History/parkingMan/moneyIn/${user.id}`).on('value', (snapshot) => {
      firebaseApp.database().ref(`/User/information/parkingMan/${user.id}`).on('value', (snapshotUser) => {
        let snapshotUserInformation = snapshotUser.val();
        let snapshotTransactionValue = snapshot.val();
        let newTransactionHistory = [];

        for (let obj in snapshotTransactionValue) {
          Array.prototype.push.apply(newTransactionHistory, [snapshotTransactionValue[obj]]);
        }

        for (let topUpId in snapshotTransactionValue) {
          newTransactionHistory = [
            {
              id: snapshotTransactionValue[topUpId].idPay,
              date: moment(snapshotTransactionValue[topUpId].dateSend, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
              money: snapshotTransactionValue[topUpId].payMoney,
              content: "-",
              balance: snapshotUserInformation.money
            },
            ...newTransactionHistory,
          ]
        }
        setTransactionHistory([...newTransactionHistory]);
      })
    })

    firebaseApp.database().ref(`/History/parkingMan/moneyOut/${user.id}`).on('value', (snapshot) => {
      let snapshotHistoryValue = snapshot.val();
      let newCheckInHistory = [];
      // for (let obj in snapshotHistoryValue) {
      //   Array.prototype.push.apply(newCheckInHistory, [snapshotHistoryValue[obj]]);
      // }
      for (let checkInId in snapshotHistoryValue) {
          newCheckInHistory = [
            {
              place: `${LOCATION[snapshotHistoryValue[checkInId].place]}`,
              plateLicense: snapshotHistoryValue[checkInId].plateLicense,
              dateGet: moment(snapshotHistoryValue[checkInId].dateGet, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
              dateSend: moment(snapshotHistoryValue[checkInId].dateSend, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
            },
            ...newCheckInHistory,
          ]
      }
      setCheckInHistory([...newCheckInHistory]);
    })
  }, [])

  const columns = [
    {
      title: 'Trading code',
      dataIndex: 'id',
      key: 'idPay',
    },
    {
      title: 'Time',
      dataIndex: 'date',
      key: 'dateSend',
    },
    {
      title: 'Amount of money',
      dataIndex: 'money',
      key: 'money',
      render: (_, record) => parseInt(record.money).toLocaleString("it-IT")
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (_, record) => parseInt(record.balance).toLocaleString("it-IT")
    },
  ];
  const { TabPane } = Tabs;

  const renderHistoryList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={checkInHistory}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.place}
              description={item.plateLicense}
            />
            <div>
              <p>Date Send: {item.dateSend}</p>
              <p>Date Get: {item.dateGet}</p>
            </div>
          </List.Item>
        )}
      />
    )
  }

  return (
    <Style.AccountContainer>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Transaction History" key="1">
          <Style.AccountContent>
            <Table columns={columns} dataSource={transactionHistory} pagination={{ pageSize: 7 }} />
          </Style.AccountContent>
        </TabPane>
        <TabPane tab="Parking History" key="2">
          <Style.AccountContent>
            {renderHistoryList()}
          </Style.AccountContent>
        </TabPane>
      </Tabs>
    </Style.AccountContainer>
  );
}
export default AccountPage;