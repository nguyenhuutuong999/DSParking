import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell,
} from 'recharts';

import {
  Table
} from 'antd';

import { getHistoryList } from '../../../redux/actions';

function Statistic({
  getHistoryList,
  historyList,
  dataWeek,
  dataMonth,
  dataYear,
  dataCampus,
}) {
  const columnsHistory = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: 'Giờ vào',
      dataIndex: 'timeIn',
      key: 'timeIn',
    },
    {
      title: 'Giờ ra',
      dataIndex: 'timeOut',
      key: 'timeOut',
    },
    {
      title: 'Biển số',
      dataIndex: 'licensePlates',
      key: 'licensePlates',
    },
  ];
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

  // const dataWeek = [
  //   {
  //     name: 'T2', CP: 8000
  //   },
  //   {
  //     name: 'T3', CP: 3000
  //   },
  //   {
  //     name: 'T4', CP: 2000
  //   },
  //   {
  //     name: 'T5', CP: 5000
  //   },
  //   {
  //     name: 'T6', CP: 1000
  //   },
  //   {
  //     name: 'T7', CP: 2000
  //   },
  //   {
  //     name: 'CN', CP: 3000
  //   },
  // ];

  // const dataMonth = [
  //   {
  //     name: 'Tuần 1', CP: 40000
  //   },
  //   {
  //     name: 'Tuần 2', CP: 30000
  //   },
  //   {
  //     name: 'Tuần 3', CP: 20000
  //   },
  //   {
  //     name: 'Tuần 4', CP: 15000
  //   },
  // ]

  // const dataYear = [
  //   {
  //     name: 'Thg 1', CP: 20000
  //   },
  //   {
  //     name: 'Thg 2', CP: 40000
  //   },
  //   {
  //     name: 'Thg 3', CP: 25000
  //   },
  //   {
  //     name: 'Thg 4', CP: 10000
  //   },
  //   {
  //     name: 'Thg 5', CP: 50000
  //   },
  //   {
  //     name: 'Thg 6', CP: 35000
  //   },
  //   {
  //     name: 'Thg 7', CP: 29000
  //   },
  //   {
  //     name: 'Thg 8', CP: 30000
  //   },
  //   {
  //     name: 'Thg 9', CP: 20000
  //   },
  //   {
  //     name: 'Thg 10', CP: 56000
  //   },
  //   {
  //     name: 'Thg 11', CP: 17000
  //   },
  //   {
  //     name: 'Thg 12', CP: 23000
  //   },
  // ];

  // const dataCampus = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];

  // const renderHistoryList = () => {
  //   return historyList.map((item, itemIndex) => {
  //     return (
  //       <tr key={itemIndex}>
  //         <td>{item.stt}</td>
  //         <td>{item.id}</td>
  //         <td>{item.date}</td>
  //         <td>{item.timeIn}</td>
  //         <td>{item.timeOut}</td>
  //         <td>{item.place}</td>
  //         <td>{item.licensePlates}</td>
  //       </tr>
  //     );
  //   });
  // }
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <div className="statistic">

      <div className="statistic-row1">
        <div className="statistic-week">
          <div className="div-statistic-head">
            <h3>Lượt gửi/ Tuần</h3>
          </div>
          <div style={{ height: '83%', marginTop: '2%' }}>
            <BarChart
              width={600}
              height={300}
              data={dataWeek}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
              barSize={20}
            >
              <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="CP" fill="#8884d8" background={{ fill: '#eee' }} />
            </BarChart>
          </div>
        </div>

        <div className="statistic-month">
          <div className="div-statistic-head">
            <h3>Lượt gửi/ Tháng</h3>
          </div>
          <div style={{ height: '83%', marginTop: '2%' }}>
            <ResponsiveContainer>
              <AreaChart
                data={dataMonth}
                margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="CP" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="statistic-row2">
        <div className="statistic-year">
          <div className="div-statistic-head">
            <h3>Lượt gửi/ Năm</h3>
          </div>
          <div style={{ height: '83%', marginTop: '2%' }}>
            <LineChart
              width={800}
              height={200}
              data={dataYear}
              syncId="anyId"
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="CP" stroke="#8884d8" fill="#8884d8" />
            </LineChart>
          </div>
        </div>

        <div className="total-year">
            <h4>Tổng lượt gửi / Năm</h4>
          <div style={{ position: 'relative' }}>
            <PieChart width={200} height={400}>
              <Pie
                data={dataCampus}
                cx={95}
                cy={80}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {dataCampus.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
            </PieChart>
            <h1 style={{ position: 'absolute', top: '16%', left: '36%' }}>340</h1>
          </div>
        </div>
      </div>

      {/* <div className="statistic-row3">
        <table>
          <Table dataSource={historyList} columns={columnsHistory} />;
        </table>
      </div> */}
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log('Log: mapStateToProps -> state', state);
  const { historyList, dataWeek, dataMonth, dataYear, dataCampus } = state;
  return {
    historyList,
    dataWeek,
    dataMonth,
    dataYear,
    dataCampus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryList: (params) => dispatch(getHistoryList(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Statistic);