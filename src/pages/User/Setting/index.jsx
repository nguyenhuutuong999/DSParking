import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader'
import './styles.css';

import {
  firebaseApp,
} from '../../../configs/firebase';

function Setting() {
  const [qrCodeData, setQRCodeData] = useState('');
  const [checkInUser, setCheckInUser] = useState({});
  const [checkInHistory, setCheckInHistory] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    firebaseApp.database().ref('/checkIn/').on('value', (snapshot) => {
      let snapshotValue = snapshot.val();
      let newCheckInHistory = [];
      for (let checkInIndex in snapshotValue) {
        newCheckInHistory = [
          ...newCheckInHistory,
          snapshotValue[checkInIndex],
        ]
      }
      setCheckInHistory([ ...newCheckInHistory ]);
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
        firebaseApp.database().ref(`/users/${data}`).on('value', (snapshot) => {
          if (snapshot.val()) {
            firebaseApp.database().ref('/checkIn/').push({
              ...snapshot.val(),
            });
            setCheckInUser({
              ...snapshot.val(),
            })
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
      <div key={`history-${historyIndex}`}>{historyItem.email}</div>
    ))
  }

  return (
    <div className="div-header">
      Setting
      <QrReader
        delay={300}
        // onError={this.handleError}
        onScan={(data) => handleScanQR(data)}
        style={{ width: 200 }}
      />
      <div>{checkInUser.email}</div>
      {/* <p>{userInfo.id}</p> */}
      <br />
      {renderHistoryList()}
    </div>
  );
}

export default Setting;