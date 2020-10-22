import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import moment from 'moment';
import './styles.css';

import {
  firebaseApp,
} from '../../../configs/firebase';

function AdminLineIn() {
  const [qrCodeData, setQRCodeData] = useState('');
  const [checkInUser, setCheckInUser] = useState({});
  const [checkInHistory, setCheckInHistory] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    firebaseApp.database().ref('/lineIn/').on('value', (snapshot) => {
      let snapshotValue = snapshot.val();
      let newCheckInHistory = [];
      for (let checkInIndex in snapshotValue) {
        newCheckInHistory = [
          snapshotValue[checkInIndex],
          ...newCheckInHistory,
        ]
      }
      setCheckInHistory([...newCheckInHistory]);
    })
  }, [])

  // useEffect(() => {
  //   firebaseApp.database().ref("User/parkingMan/account/std1").on('value', (snapshot) => {
  //     setUserInfo({
  //       ...snapshot.val(),
  //     })
  //   })
  // }, [])

  const handleScanQR = (data) => {
    if (data) {
      setQRCodeData(data);
      if (data !== qrCodeData) {
        const uid = data.slice(0, 28);
        const qrPin = data.slice(28, 32);
        firebaseApp.database().ref(`/users/${uid}`).once('value', (snapshot) => {
          const snapshotValue = snapshot.val();
          if (snapshotValue && snapshotValue.qrPin === qrPin) {
            const newLineInKey = firebaseApp.database().ref('/lineIn').push().key;
            const lineInData = {
              uid,
              dateTime: parseFloat(moment().format('YYYYMMDDHHmm')),
              name: snapshotValue.name,
              email: snapshotValue.email,
              studentCode: snapshotValue.studentCode,
              licensePlates: snapshotValue.licensePlates,
            }
            const parkingHistory = {
              dateTime: parseFloat(moment().format('YYYYMMDDHHmm')),
              type: 'lineIn',
            }
            let updates = {};
            updates[`/lineIn/${newLineInKey}`] = lineInData;
            updates[`/users/${uid}/parkingHistory/${newLineInKey}`] = parkingHistory;
            if (snapshotValue.money - 1000 <= 5000 && snapshotValue.money - 1000 >= 0) {
              firebaseApp.database().ref(`/users/${uid}/notification`).push({
                title: 'Cảnh báo tài khoảng dưới 5.000 VND',
                content: 'Bạn cần nạp tiền vào tài khoảng!',
                dateTime: parseFloat(moment().format('YYYYMMDDHHmm')),
                level: 'high',
              })              
              updates[`/users/${uid}/money`] = snapshotValue.money - 1000;
            } else if (snapshotValue.money - 1000 < 0) {
              console.log("handleScanQR -> snapshotValue.money - 1000", snapshotValue.money - 1000)
              window.alert('Không đủ tiền');
            } else {
              updates[`/users/${uid}/money`] = snapshotValue.money - 1000;
            }
            firebaseApp.database().ref().update(updates);
            setCheckInUser(lineInData);
          } else {
            window.alert('Lỗi')
          }
        });

      }
    }
    console.log("handleScanQR -> data", data)
  }

  const renderHistoryList = () => {
    return checkInHistory.map((historyItem, historyIndex) => (
      <div key={`history-${historyIndex}`}>
        {historyItem.email}
        {moment(historyItem.dateTime.toString(), 'YYYYMMDDHHmm').format('HH:mm DD/MM/YYYY')}
      </div>
    ))
  }

  return (
    <div className="line-in">
      <div className="div-scan">
        <div className="div-camera">
          <QrReader
            delay={300}
            // onError={this.handleError}
            onScan={(data) => handleScanQR(data)}
            style={{ width: 400 }}
          />
        </div>
        <br />
        <div>
          <div>{checkInUser.email}</div>
        </div>
      </div>
      <div className="div-scan-information">
        <div className ="scan-information">
          {renderHistoryList()}
        </div>
      </div>
    </div>
  );
}

export default AdminLineIn;