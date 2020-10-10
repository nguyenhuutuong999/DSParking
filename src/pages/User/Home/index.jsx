import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './styles.css'

import Avatar3 from '../../../img/avatar3.jpg'
import QrCode from '../../../img/qrcode.png'

import {
  Button,
  Tooltip as Tip
} from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import { FaMotorcycle } from 'react-icons/fa';
function Account() {
  const dataweek = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 15000, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];
  const datamonth = [
    {
      name: 'Page A', uv: 5000, pv: 5000, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 2098, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 6000, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 2908, amt: 2000,
    }
  ];

  return (
    <div className="home">
      <div className="home-left">
        <div className="home-statistic">

          <div className="home-statistic-items">
            <div className="home-statistic-info">
                <div style={{display:'flex', textAlign:'center', marginTop:'10px', marginLeft:'10px'}}>
                  <div style={{width: '40px', height:'40px', borderRadius:'50%', backgroundColor:'#d3adf7'}}>
                    < FaMotorcycle style={{fontSize:'25px', fill:'#722ed1', marginTop:'8px'}} />
                  </div>
                  <h5 style={{marginTop:'17px', marginLeft:'10px' ,fontWeight:'600',color:'#8c8c8c'}}>LƯỢT GỬI / Tuần</h5>
                </div>
              <h2 style={{color:'#2c2c2c', fontWeight: '600', margin:'0px 95px'}}>10</h2>
            </div>
            <div className="home-statistic-chart">
              <LineChart width={342} height={100} data={dataweek}>
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </div>
          </div>

          <div className="home-statistic-items">
          <div className="home-statistic-info">
                <div style={{display:'flex', textAlign:'center', marginTop:'10px', marginLeft:'10px'}}>
                  <div style={{width: '40px', height:'40px', borderRadius:'50%', backgroundColor:'#b7eb8f'}}>
                    < FaMotorcycle style={{fontSize:'25px', fill:'#389e0d', marginTop:'8px'}} />
                  </div>
                  <h5 style={{marginTop:'17px', marginLeft:'10px' ,fontWeight:'600',color:'#8c8c8c'}}>LƯỢT GỬI / Tháng</h5>
                </div>
              <h2 style={{color:'#2c2c2c', fontWeight: '600', margin:'0px 95px'}}>30</h2>
            </div>
            <div className="home-statistic-chart">
              <LineChart width={342} height={100} data={datamonth}>
                <Line type="monotone" dataKey="pv" stroke="#3f6600" strokeWidth={2} />
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
            <table>
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Ngày</th>
                  <th>Giờ vào</th>
                  <th>Giờ ra</th>
                  <th>Biển số</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MLS101001</td>
                  <td>10/10/2020</td>
                  <td>10 : 19</td>
                  <td>14 : 15</td>
                  <td>567 56</td>
                </tr>
                <tr>
                  <td>MLS101001</td>
                  <td>10/10/2020</td>
                  <td>10 : 19</td>
                  <td>14 : 15</td>
                  <td>567 56</td>
                </tr>
                <tr>
                  <td>MLS101001</td>
                  <td>10/10/2020</td>
                  <td>10 : 19</td>
                  <td>14 : 15</td>
                  <td>567 56</td>
                </tr>
              </tbody>
            </table>
            <Button className="btn-details-history" type="primary" ghost shape="round" >Xem chi tiết</Button>
          </div>         
          </div>
        </div>
      </div>

      <div className="home-right">
        <div className="home-user">
          <img src={Avatar3} alt="Avatar" />
          <div className="home-user-info">
            <span className="name">Nguyễn T Bích Ni - 2320716843</span>
            <span>24/01/1999</span>
            <span>K23CMU - TTT</span>
          </div>
          <Button className="btn-details-user" type="primary" ghost shape="round" >Xem chi tiết</Button>
        </div>
        <div className="home-qrcode">
          <img src={QrCode} alt="QrCode" />
          <Tip title="zoom">
            <Button className="zoom" type="primary" shape="circle" icon={<ZoomInOutlined />} ghost />
          </Tip>
        </div>
      </div>
    </div>
  )
}
export default Account;