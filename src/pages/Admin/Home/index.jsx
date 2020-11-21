import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, Legend, YAxis, Tooltip } from 'recharts';
import './styles.css';
import moment from 'moment';
import { WEEKDAY_FORMAT, MONTH_FORMAT } from '../../../constants/common';
import fire from './../../../services/firebase';


function Home() {

  // const data of the nearest week
  const [totalToday254NVL, setTotalToday254NVL] = useState(0);
  const [totalToday03qt, setTotalToday03qt] = useState(0);
  const [totalToday334nvl, setTotalToday334nvl] = useState(0);
  const [totalTodayHK, setTotalTodayHK] = useState(0);
  const [weekChartData, setWeekChartData] = useState(0);
  const [weekDataTotal, setWeekDataTotal] = useState(0);

  // const data of the nearest Month
  const [monthChartData, setMonthChartData] = useState(0);
  const [monthDataTotal, setMonthDataTotal] = useState(0);

  //const authData = JSON.parse(localStorage.getItem('authData'));
  const currentMonth = moment();
  const oneYearAgo = moment().subtract(11, 'months');

  const currentDay = moment();
  const oneWeekAgo = moment().subtract(6, 'days');
  var check = moment();
 
  //get current day
  var month = check.format('MMMM')
  var year = check.format('YYYY')
  var myDateVariable= moment().format("dddd, Do MMM, YYYY")
 
  useEffect(() => {
    getDataStatistic();
  }, [])

  const getDayList = (startDay, endDay) => {
    let days = [];
    for (let date = startDay; date <= endDay; date.add(1, 'days')) {
      days = [
        ...days,
        {
          day: date.format('DD'),
          month: date.format('MM'),
          year: date.format('YYYY'),
          weekday: date.weekday(),
        },
      ]
    }
    return days;
  }


  const getMonthList = (startMonth, endMonth) => {
    let months = [];
    for (let month = startMonth; month <= endMonth; month.add(1, 'months')) {
      months = [
        ...months,
        {
          month: month.format('MM'),
          year: month.format('YYYY'),
        },
      ]

    }
    return months;
  }

  //get Data from today to  7 days previous
  let currentWeekAgo = getDayList(oneWeekAgo, currentDay);
  let currentMonthAgo = getMonthList(oneYearAgo, currentMonth);

  //get week statistic form Firebase
  function getDataStatistic() {

    //get data form Firebase
    fire.database().ref("Data/")
      .on('value', (snapshot) => {
        let snapshotValue = snapshot.val();
        let arr = [];
        for (let obj in snapshotValue) {
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
        getWeekStatistic(arr);
        getMonthStatistic(arr);
      })
  }

  // get weekly data statistic other place
  const getMonthStatistic = (arr) => {
   
    let monthCount = 0;
    let getCountPlace = [];
    let newMonthChartData = currentMonthAgo.map((item) => {
     
      let nvl254 = 0;
      let qtr = 0;
      let nvl334 = 0;
      let hk = 0;
      let arr1 = [];
      arr.map((ob) => {

        //getCountPlace = ob.chartData[item.year].month[10].day
        getCountPlace = ((ob.chartData || {})[item.year]?.month || {})[item.month]?.day || {};

        for (let obj in getCountPlace) {

          Array.prototype.push.apply(arr1, [getCountPlace[obj]]);
        }
      

        arr1.map((ob) => {
          // ID 1: 254 Nguyen Van Linh
          // ID 2: Quang Trung
          // ID 3: 254 334 Nguyen Van Linh
          // ID 4: Hoa Khanh
          nvl254 += ob["1"];
          qtr += ob["2"];
          nvl334 += ob["3"];
          hk += ob["4"];

        })
      })

      monthCount = nvl254 + qtr + nvl334 + hk;
      return {
        "month": `${MONTH_FORMAT[item.month]}`,
        "254 NVL": nvl254,
        "03 QT": qtr,
        "334 NVL": nvl334,
        "Hoa Khanh": hk,

      }
    })
    setMonthChartData(newMonthChartData)
    setMonthDataTotal(monthCount);
  }

  // get weekly data statistic other place
  const getWeekStatistic = (arr) => {

    let weekCount = 0;
    let getCountPlace = [];
    let newWeekChartData = currentWeekAgo.map((item, index) => {
      let nvl254 = 0;
      let qtr = 0;
      let nvl334 = 0;
      let hk = 0;

      arr.map((ob) => {
        
        getCountPlace = (((ob.chartData || {})[item.year]?.month || {})[item.month]?.day || {})[2];
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


      weekCount = nvl254 + qtr + nvl334 + hk;
      return {
        "day": `${WEEKDAY_FORMAT[item.weekday]}`,
        "254 NVL": nvl254,
        "03 QT": qtr,
        "334 NVL": nvl334,
        "Hoa Khanh": hk,

      }
    })
    setWeekChartData(newWeekChartData)
    setWeekDataTotal(weekCount);
  }
  // get data from now to 7 day previous

  console.log(monthChartData);
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
                margin={{ left: -35, top: 4, right:4 }}
              >
                <XAxis dataKey="day" tick={{ fill: '#db5c00' }} />
                <YAxis dataKey="254 NVL" tick={{ fill: '#db5c00' }} />
                <Tooltip />
                <Line type="monotone" dataKey="254 NVL" stroke="#db5c00" strokeWidth={2} />
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
                margin={{ left: -35, top: 4, right:4 }}
              >
                <XAxis dataKey="day" tick={{ fill: '#6875E9' }} />
                <YAxis dataKey="03 QT" tick={{ fill: '#6875E9' }} />
                <Tooltip />
                <Line type="monotone" dataKey="03 QT" stroke="#6875E9" strokeWidth={2} />
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
                margin={{ left: -35, top: 4, right:4 }}
              >
                <XAxis dataKey="day" tick={{ fill: '#41B35D' }} />
                <YAxis dataKey="334 NVL" tick={{ fill: '#41B35D' }} />
                <Tooltip />
                <Line type="monotone" dataKey="334 NVL" stroke="#41B35D" strokeWidth={2} />
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
                margin={{ left: -35 , top: 4, right:4 }}
              >
                <XAxis dataKey="day" tick={{ fill: '#36A6CA' }} />
                <YAxis dataKey="Hoa Khanh" tick={{ fill: '#36A6CA' }} />
                <Tooltip />
                <Line type="monotone" dataKey="Hoa Khanh" stroke="#36A6CA" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="home-bottom-static">
        <div class="col-xs-8">
          <div className="home-month-chart">
            <ResponsiveContainer width="97%" height="97%" fill='white'>
              <LineChart data={monthChartData}
                margin={{ top: 35, right: 5 }} color="#fff"
                fill='white'
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="254 NVL" stroke="#8684d8" />
                <Line type="monotone" dataKey="334 NVL" stroke="#82ca9d" />
                <Line type="monotone" dataKey="03 QT" stroke="#c7b3e6" />
                <Line type="monotone" dataKey="Hoa Khanh" stroke="#db5c00" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div class="col-xs-4">
          <div className="home-revenue">
            <div className="revenue-box revenue-today">
              <div className="time">Today</div>
              <div className="revenue-block">
                <div className="cicle-icon">
                  <i style={{ color: "#db4a3a" }} class="far fa-money-bill-alt"></i>
                  {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                </div>
                <div className="revenue"> {weekDataTotal}.000 VND</div>
              </div>
              <div className="get-date">
                <div className="calendar-icon">
                  <i class="far fa-calendar-alt"></i>
                </div>
                <div className="moment-month">{myDateVariable}</div>
              </div>
            </div>

            <div className="revenue-box revenue-monthly">
              <div className="time">Monthly</div>
              <div className="revenue-block">
                <div className="cicle-icon">
                  <i style={{ color: "#3642eb" }} class="far fa-money-bill-alt"></i>
                  {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                </div>
                <div className="revenue"> {monthDataTotal}.000 VND</div>
              </div>
              <div className="get-date">
                <div className="calendar-icon">
                  <i class="far fa-calendar-alt"></i>
                </div>
                <div className="moment-month">{month}, {year}</div>
              </div>
            </div>
          </div>
          <div className="home-flow">
            <div className="flow-section">
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="cicle-icon-small icon-today">
                  <i style={{ color: "#3642eb" }} class="fa fa-motorcycle fa-2x"></i>
                </div>
              </div>
              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div className="flow-block">
                  <div className="title-flow">2.000/10.000 users/today</div>
                  <div className="flow-perc">
                    <div className="flow-bar">
                      <div className="vehicle-flow user-today"></div>
                      <div className="vehicle-flow-background"></div>
                    </div>
                    <div className="perc">20%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flow-section">
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="cicle-icon-small icon-users">
                  <i style={{ color: "#db4a3a" }} class="fa fa-motorcycle fa-2x"></i>
                </div>
              </div>

              <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div className="flow-block">
                  <div className="title-flow">10.000/20.000 users/school</div>
                  <div className="flow-perc">
                    <div className="flow-bar">
                      <div className="vehicle-flow users"></div>
                      <div className="vehicle-flow-background"></div>
                    </div>
                    <div className="perc">50%</div>
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

export default Home;