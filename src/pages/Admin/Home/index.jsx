import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../../redux/actions/index';
import { LineChart, Line, ResponsiveContainer, XAxis, Legend, YAxis, Tooltip } from 'recharts';
import './styles.css';
import moment from 'moment';
import { WEEKDAY_FORMAT } from '../../../constants/common';
import fire from './../../../services/firebase';


function Home(props) {
  let nvl1 = props.getList
  const [nvl, setnvl] = useState([0, 0, 0, 0, 0, 0, 0]);

 
  const [totalToday254NVL, setTotalToday254NVL] = useState(0);
  const [totalToday03qt, setTotalToday03qt] = useState(0);
  const [totalToday334nvl, setTotalToday334nvl] = useState(0);
  const [totalTodayHK, setTotalTodayHK] = useState(0);

  const [weekChartData, setWeekChartData] = useState(0);
  const [weektDataTotal, setWeekDataTotal] = useState(0);


  //const authData = JSON.parse(localStorage.getItem('authData'));
  const currentDay = moment();
  const oneWeekAgo = moment().subtract(6, 'days');
  const oneMonthAgo = moment().subtract(1, 'month').add(1, 'days');

  const year = moment().year();
  const currentMonth = moment().format('MM');
  const currentYear = moment().format('YYYY');

  useEffect(() => {
    getWeekStatistic();
  }, [])
  
  //get week statistic form Firebase
  function getWeekStatistic (){
    const currentWeekAgo = getDayList(oneWeekAgo, currentDay);
    // cua Ni baby
    fire.database().ref("Data/")
      .on('value', (snapshot) => {
        let snapshotValue = snapshot.val();
        let arr = [];
        for (var obj in snapshotValue) {
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
        var weekCount = 0;
        let getCountPlace = [];
        let newWeekChartData = currentWeekAgo.map((item, index) => {
          let nvl254 = 0;
          let qtr = 0;
          let nvl334 = 0;
          let hk = 0;

          arr.map((ob) => {
            getCountPlace = ob.chartData[item.year].month[parseInt(item.month)].day[1]

            // ID 1: 254 Nguyen Van Linh
            // ID 2: Quang Trung
            // ID 3: 254 334 Nguyen Van Linh
            // ID 4: Hoa Khanh
            nvl254 += getCountPlace["1"];
            qtr += getCountPlace["2"];
            nvl334 += getCountPlace["3"];
            hk += getCountPlace["4"];

          })
          setTotalToday254NVL(nvl254);
          setTotalToday334nvl(nvl334);
          setTotalToday03qt(qtr);
          setTotalTodayHK(hk);

          weekCount += nvl254 + qtr + nvl334 + hk;
          return {
            "day": `${WEEKDAY_FORMAT[item.weekday]}`,
            "nvl254" : nvl254,
            "qtr": qtr,
            "nvl334": nvl334,
            "hk": hk,
          }
        })
        setWeekChartData(newWeekChartData)
        
      })
  }
  
  // get data from now to 7 day previous
  const getDayList = (startDay, endDay) => {
    let days = [];
    for (let date = startDay; date <= endDay; date.add(1, 'days')) {
      days = [
        ...days,
        {
          day: date.format('DD'),
          month: date.format('MM'),
          year: year,
          weekday: date.weekday(),
        },
      ]
    }
    return days;
  }
  const data = [
    {
      "name": "Jan",
      "254 NVL": 4000,
      "334nvl": 2400,
      "03 Quang Trung": 5400,
      "Hoa Khanh": 1400,
      "amt": 2400
    },
    {
      "name": "Feb",
      "254 NVL": 3000,
      "334nvl": 1398,
      "03 Quang Trung": 2398,
      "Hoa Khanh": 398,
      "amt": 2210
    },
    {
      "name": "Mar",
      "254 NVL": 2000,
      "334nvl": 4800,
      "03 Quang Trung": 5800,
      "Hoa Khanh": 3800,
      "amt": 2290
    },
    {
      "name": "Apr",
      "254 NVL": 180,
      "334nvl": 3908,
      "03 Quang Trung": 5908,
      "Hoa Khanh": 2908,
      "amt": 2000
    },
    {
      "name": "May",
      "254 NVL": 1890,
      "334nvl": 4800,
      "03 Quang Trung": 2800,
      "Hoa Khanh": 3800,
      "amt": 2181
    },
    {
      "name": "June",
      "254 NVL": 2390,
      "334nvl": 3800,
      "03 Quang Trung": 3800,
      "Hoa Khanh": 2800,
      "amt": 2500
    },
    {
      "name": "July",
      "254 NVL": 3490,
      "334nvl": 4300,
      "03 Quang Trung": 2300,
      "Hoa Khanh": 3300,
      "amt": 2100
    },
    {
      "name": "August",
      "254 NVL": 3490,
      "334nvl": 4300,
      "03 Quang Trung": 4300,
      "Hoa Khanh": 3300,
      "amt": 2100
    },
    {
      "name": "Sept",
      "254 NVL": 3490,
      "334nvl": 4300,
      "03 Quang Trung": 1300,
      "Hoa Khanh": 3300,
      "amt": 2100
    },
    {
      "name": "Oct",
      "254 NVL": 3490,
      "334nvl": 4300,
      "03 Quang Trung": 4300,
      "Hoa Khanh": 1300,
      "amt": 2100
    },
    {
      "name": "Nov",
      "254 NVL": 3490,
      "334nvl": 4300,
      "03 Quang Trung": 1300,
      "Hoa Khanh": 3300,
      "amt": 2100
    },
    {
      "name": "Dev",
      "254 NVL": 3490,
      "334nvl": 4300,
      "03 Quang Trung": 1300,
      "Hoa Khanh": 2300,
      "amt": 2100
    },
  ]

  const dataWeek = [

    {
      name: 'Mon', "254NVL": nvl1[0], pv: 5400, amt: 2500,
    },
    {
      name: 'Page B', "254NVL": nvl1[1], pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', "254NVL": nvl1[2], pv: 15000, amt: 2290,
    },
    {
      name: 'Page D', "254NVL": nvl1[3], pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', "254NVL": nvl1[4], pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', "254NVL": nvl1[5], pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', "254NVL": nvl1[6], pv: 4300, amt: 2100,
    },
  ];
  const columnsHistory = [
    {
      title: 'Loại', dataIndex: 'type', key: 'type',
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
  return (
    <div className="home">

      <div className="home-week-static">
        <div className="home-week-items">
          <div className="home-week-info">
            <div className="icon-title-statistics">

              <div className="local">254 Nguyễn Văn Linh</div>
              <div className="number">{totalToday254NVL}/500</div>
            </div>

          </div>
          <div className="home-week-chart">
            <ResponsiveContainer width="98%" height={100}>
              <LineChart data={weekChartData}
                margin={{ left: -30 }}
              >
                <XAxis dataKey="day" tick={{ fill: '#db5c00' }} />
                <YAxis dataKey="nvl254" tick={{ fill: '#db5c00' }} />
                <Tooltip />
                <Line type="monotone" dataKey="nvl254" stroke="#db5c00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="home-week-items">
          <div className="home-week-info">
            <div className="icon-title-statistics">
              <div className="local">03 Quang Trung</div>
              <div className="number">{totalToday03qt}/300</div>
            </div>
          </div>
          <div className="home-week-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={weekChartData}
                margin={{ left: -30 }}
              >
                <XAxis dataKey="day" tick={{ fill: '#6875E9' }}/>
                <YAxis  dataKey="qtr" tick={{ fill: '#6875E9' }}/>
                <Tooltip />
                <Line type="monotone" dataKey="qtr" stroke="#6875E9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="home-week-items">
          <div className="home-week-info">
            <div className="icon-title-statistics">

              <div className="local">334 Nguyễn Văn Linh</div>
              <div className="number">{totalToday334nvl}/300</div>
            </div>

          </div>
          <div className="home-week-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={weekChartData}
                margin={{ left: -30 }}
              >
                <XAxis dataKey="day" tick={{ fill: '#41B35D' }}/>
                <YAxis  dataKey="nvl334" tick={{ fill: '#41B35D' }}/>
                <Tooltip />
                <Line type="monotone" dataKey="nvl334" stroke="#41B35D" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="home-week-items">
          <div className="home-week-info">
            <div className="icon-title-statistics">

              <div className="local">Hòa Khánh</div>
              <div className="number">{totalTodayHK}/300</div>
            </div>

          </div>
          <div className="home-week-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={weekChartData}
                margin={{ left: -30 }}
              >
                <XAxis dataKey="day" tick={{ fill: '#36A6CA' }}/>
                <YAxis  dataKey="hk" tick={{ fill: '#36A6CA' }}/>
                <Tooltip />
                <Line type="monotone" dataKey="hk" stroke="#36A6CA" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="home-bottom-static">
        <div class="col-xs-8">
          <div className="home-month-chart">
            <ResponsiveContainer width="97%" height="97%" fill='white'>
              <LineChart data={data}
                margin={{ top: 35, right: 5 }} color="#fff"
                fill='white'
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="254 NVL" stroke="#8684d8" />
                <Line type="monotone" dataKey="334nvl" stroke="#82ca9d" />
                <Line type="monotone" dataKey="03 Quang Trung" stroke="#c7b3e6" />
                <Line type="monotone" dataKey="Hoa Khanh" stroke="#db5c00" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div class="col-xs-4">
          <div className="home-revenue">
            <div className="revenue-monthly">
              <div className="time">Now</div>
              <div className="revenue-block">
                <div className="cicle-icon">
                  <i class="fa fa-coins fa-3x"></i>
                </div>
                <div className="revenue"> 100.000.000 VND</div>
              </div>
            </div>
            <div className="revenue-monthly">
              <div className="time">Monthly</div>
              <div className="revenue-block">
                <div className="cicle-icon">
                  <i class="fa fa-coins fa-3x"></i>
                </div>
                <div className="revenue"> 100.000.000 VND</div>
              </div>
            </div>

          </div>
          <div className="home-flow">
            <div className="flow-section">
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="cicle-icon-small">
                  <i style={{ color: "#F7CB89" }} class="fa fa-motorcycle fa-2x"></i>
                </div>
              </div>

              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div className="flow-block">
                  <div className="title-flow">20/20000 user/today</div>
                  <div className="flow-perc">
                    <div className="flow-bar">
                      <div className="vehicle-flow"></div>
                      <div className="vehicle-flow-background"></div>
                    </div>
                    <div className="perc">10%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flow-section">
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="cicle-icon-small">
                  <i style={{ color: "#F7CB89" }} class="fa fa-motorcycle fa-2x"></i>
                </div>
              </div>

              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div className="flow-block">
                  <div className="title-flow">20/20000 users until now</div>
                  <div className="flow-perc">
                    <div className="flow-bar">
                      <div className="vehicle-flow"></div>
                      <div className="vehicle-flow-background"></div>
                    </div>
                    <div className="perc">10%</div>
                  </div>
                </div>


              </div>
            </div>

          </div>
        </div>

      </div>


    </div>
  )
}
const mapStateToProps = (state) => {
  const { getList } = state;
  return {
    getList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMoneyOutListTodayRequest: () => {
      dispatch(actions.getMoneyOutListTodayRequest())
    },

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);