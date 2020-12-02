import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import { List, Avatar, Space } from 'antd';
import moment from 'moment';
import './styles.css';

import {
  firebaseApp,
} from '../../../configs/firebase';

function AdminLineOut() {
  const [qrCodeData, setQRCodeData] = useState('');
  const [checkOutUser, setCheckOutUser] = useState({});
  const [checkOutHistory, setCheckOutHistory] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    firebaseApp.database().ref('/lineOut/').on('value', (snapshot) => {
      let snapshotValue = snapshot.val();
      let newCheckOutHistory = [];
      for (let checkOutIndex in snapshotValue) {
        newCheckOutHistory = [
          snapshotValue[checkOutIndex],
          ...newCheckOutHistory,
        ]
      }
      setCheckOutHistory([...newCheckOutHistory]);
    })
  }, [])

  const handleScanQR = (data) => {
    if (data) {
      setQRCodeData(data);
      if (data !== qrCodeData) {
        const uid = data.slice(0, 28);
        const qrPin = data.slice(28, 32);
        firebaseApp.database().ref(`/users/${uid}`).once('value', (snapshot) => {
          const snapshotValue = snapshot.val();
          if (snapshotValue && snapshotValue.qrPin === qrPin) {
            const newLineOutKey = firebaseApp.database().ref('/lineOut').push().key;
            const lineOutData = {
              uid,
              dateTime: parseFloat(moment().format('YYYYMMDDHHmm')),
              name: snapshotValue.name,
              email: snapshotValue.email,
              studentCode: snapshotValue.studentCode,
              licensePlates: snapshotValue.licensePlates,
              // avatar: snapshotValue.avatar,
            }
            const parkingHistory = {
              dateTime: parseFloat(moment().format('YYYYMMDDHHmm')),
              type: 'lineOut',
            }
            let updates = {};

            if (snapshotValue.money - 1000 < 0) {
              window.alert('Không đủ tiền');
            } else {
              if (snapshotValue.money - 1000 <= 5000) {
                firebaseApp.database().ref(`/users/${uid}/notification`).push({
                  title: 'Cảnh báo tài khoảng dưới 5.000 VND',
                  content: 'Bạn cần nạp tiền vào tài khoảng!',
                  dateTime: parseFloat(moment().format('YYYYMMDDHHmm')),
                  level: 'high',
                })
              }
              updates[`/lineOut/${newLineOutKey}`] = lineOutData;
              updates[`/users/${uid}/parkingHistory/${newLineOutKey}`] = parkingHistory;
              // updates[`/users/${uid}/money`] = snapshotValue.money - 1000;
            }

            firebaseApp.database().ref().update(updates);
            setCheckOutUser(lineOutData);
          } else {
            window.alert('Lỗi')
          }
        });

      }
    }
    console.log("handleScanQR -> data", data)
  }

  const renderHistoryList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={checkOutHistory}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.email}
              description={moment(item.dateTime.toString(), 'YYYYMMDDHHmm').format('HH:mm DD/MM/YYYY')}
            />
          </List.Item>
        )}
      />
    )
  }

  return (
    <div className="line-in">
      <div className="div-scan">
        <div className="div-camera">
          <QrReader
            delay={300}
            onScan={(data) => handleScanQR(data)}
            style={{ width: 350 }}
          />
        </div>
        <br />
          <div className="checkIn-user">
              <h1>{checkOutUser.name}</h1>
              <p>{checkOutUser.email}</p>
              <p>{checkOutUser.studentCode}</p>
          </div>
      </div>
      <div className="div-scan-history">
        <div className="scan-history-information">
          {renderHistoryList()}
        </div>
      </div>
    </div>
  );
}

export default AdminLineOut;