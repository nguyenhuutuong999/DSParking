import React, { PureComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  LineChart, Line,
} from 'recharts';
import QRCode from 'qrcode.react';
import moment from 'moment';
import './styles.css'

import Avatar3 from '../../../img/avatar3.jpg'
import history from '../../../util/history'

import {
  Button,
  Tooltip as Tip,
  Table
} from 'antd';

import { FaMotorcycle } from 'react-icons/fa';

import { getHistoryList } from '../../../redux/actions/index';

import {
  firebaseApp,
} from '../../../configs/firebase';

function Home({
  getHistoryList,
  historyList,
  dataWeek,
  dataMonth
}) {
  const [checkInHistory, setCheckInHistory] = useState([]);
  const authData = JSON.parse(localStorage.getItem('authData'));
  useEffect(() => {
    firebaseApp.database().ref(`/users/${authData.uid}/parkingHistory`).on('value', (snapshot) => {
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

  const columnsHistory = [
    {
      title: 'Mã', dataIndex: 'id', key: 'id',
    },
    {
      title: 'Ngày', dataIndex: 'date', key: 'date',
    },
    {
      title: 'Thời gian', dataIndex: 'timeIn', key: 'timeIn',
    },
    {
      title: 'Địa điểm', dataIndex: 'place', key: 'place',
    },
  ];

  const renderHistoryList = () => {
    return checkInHistory.map((historyItem, historyIndex) => (
      <div key={`history-${historyIndex}`}>
        {moment(historyItem.dateTime.toString(), 'YYYYMMDDHHmm').format('HH:mm DD/MM/YYYY')}
      </div>
    ))
  }
  // const [historyList,  setHistoryList] = useState([
  //   {
  //     stt: '001',
  //     id:'10112020',
  //     date:'10/11/2020',
  //     place:'254 Nguyễn Văn Linh',
  //     timeIn:'6:45',
  //     timeOut:'10:05',
  //     licensePlates:'567 56'
  //   },
  //   {
  //     stt: '002',
  //     id:'10112020',
  //     date:'10/11/2020',
  //     place:'254 Nguyễn Văn Linh',
  //     timeIn:'6:45',
  //     timeOut:'10:05',
  //     licensePlates:'567 56'
  //   },
  //   {
  //     stt: '003',
  //     id:'10112020',
  //     date:'10/11/2020',
  //     place:'254 Nguyễn Văn Linh',
  //     timeIn:'6:45',
  //     timeOut:'10:05',
  //     licensePlates:'567 56'
  //   },
  // ])
  /*-------------Data Chart---------------*/
  // const dataWeek = [
  //   {
  //     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  //   },
  //   {
  //     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  //   },
  //   {
  //     name: 'Page C', uv: 2000, pv: 15000, amt: 2290,
  //   },
  //   {
  //     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  //   },
  //   {
  //     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  //   },
  //   {
  //     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  //   },
  //   {
  //     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  //   },
  // ];
  // const dataMonth = [
  //   {
  //     name: 'Page A', uv: 5000, pv: 5000, amt: 2400,
  //   },
  //   {
  //     name: 'Page B', uv: 3000, pv: 2098, amt: 2210,
  //   },
  //   {
  //     name: 'Page C', uv: 2000, pv: 6000, amt: 2290,
  //   },
  //   {
  //     name: 'Page D', uv: 2780, pv: 2908, amt: 2000,
  //   }
  // ];

  // const renderHistoryList = () => {
  //   return historyList.map((item, itemIndex) => {
  //     return (
  //       <tr key={itemIndex}>
  //         <td>{item.id}</td>
  //         <td>{item.date}</td>
  //         <td>{item.timeIn}</td>
  //         <td>{item.timeOut}</td>
  //         <td>{item.licensePlates}</td>
  //       </tr>
  //     );
  //   });
  // }
  return (
    <div className="home">
      <div className="home-left">
        <div className="home-statistic">

          <div className="home-statistic-items">
            <div className="home-statistic-info">
              <div className="icon-title-statistics">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffe7ba' }}>
                  < FaMotorcycle style={{ fontSize: '25px', fill: '#db5c00', marginTop: '8px' }} />
                </div>
                <h5>Lượt gửi tuần</h5>
              </div>
              <h2>10</h2>
            </div>
            <div className="home-statistic-chart">
              <LineChart width={380} height={100} data={dataWeek}>
                <Line type="monotone" dataKey="CP" stroke="#db5c00" strokeWidth={2} />
              </LineChart>
            </div>
          </div>

          <div className="home-statistic-items">
            <div className="home-statistic-info">
              <div className="icon-title-statistics">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffe7ba' }}>
                  < FaMotorcycle style={{ fontSize: '25px', fill: '#db5c00', marginTop: '8px' }} />
                </div>
                <h5>Lượt gửi tháng</h5>
              </div>
              <h2>30</h2>
            </div>
            <div className="home-statistic-chart">
              <LineChart width={380} height={100} data={dataMonth}>
                <Line type="monotone" dataKey="CP" stroke="#db5c00" strokeWidth={2} />
              </LineChart>
            </div>
          </div>
        </div>

        <div className="home-history">
          <div className="home-history-detail">
            <div className="home-history-title">
              <h4>Lịch sử ra vào</h4>
            </div>
            <div className="home-history-table">
              <div className="div-table-history">
                {/* <Table 
                  dataSource={historyList} 
                  columns={columnsHistory}
                  pagination={false}
                 /> */}
                 {renderHistoryList()}
                 <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-right">
        <div className="home-user">
          <div className="home-user-detail">
            <div className="div-img">
              <img src={Avatar3} alt="Avatar" />
            </div>
            <div className="home-user-info">
              <div className="information">
                <span className="name">{authData.name}</span>
                <span>2320716843</span>
                <span>24/01/1999</span>
                <span>K23CMU - TTT</span>
                <span><Button onClick={() => history.push('/profile')}>Xem thông tin cá nhân</Button></span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-qrcode">
          <p>Mã QrCode của bạn:</p>
          <div className="home-qrcode-img">
            <QRCode value={`${authData.uid}${authData.qrPin}`} size={160} />
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  console.log('Log: mapStateToProps -> state', state);
  const { historyList, dataWeek, dataMonth } = state;
  return {
    historyList,
    dataWeek,
    dataMonth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryList: (params) => dispatch(getHistoryList(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);