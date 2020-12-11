import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, Legend, YAxis, Tooltip } from 'recharts';
import './styles.css';
import moment from 'moment';
import { WEEKDAY_FORMAT, MONTH_FORMAT } from '../../../constants/common';
import {firebaseApp} from './../../../configs/firebase';
///tuong ne

function Home() {

  // const data of the nearest week
  const [totalToday254NVL, setTotalToday254NVL] = useState(0);
  const [totalToday03qt, setTotalToday03qt] = useState(0);
  const [totalToday334nvl, setTotalToday334nvl] = useState(0);
  const [totalTodayHK, setTotalTodayHK] = useState(0);
  const [weekChartData, setWeekChartData] = useState(0);
  const [weekDataTotal, setWeekDataTotal] = useState(0);

  // const data flow of the nearest Month
  const [monthChartData, setMonthChartData] = useState(0);
  const [monthDataTotal, setMonthDataTotal] = useState(0);
  // const data totp up of the nearest Month
  const [todayTopUp, setTodayTopUp] = useState(0);
  const [monthTopUp, setMonthTopUp] = useState(0);

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
    getDataFolowStatistic();
    getDataTopUpStatistic();
  }, [])

  const getDayList = (startDay, endDay) => {
    let days = [];
    for (let date = startDay.clone(); date <= endDay; date.add(1, 'days')) {
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
    for (let month = startMonth.clone(); month <= endMonth; month.add(1, 'months')) {
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
  function getDataFolowStatistic() {

    //get data form Firebase
    firebaseApp.database().ref("History/parkingMan/moneyOut/")
      .on('value', (snapshot) => {
        let snapshotValue = snapshot.val();
        let arr = [];
        for (let obj in snapshotValue) {
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
       
        let arr1 = [];
        arr.map((obj) => {
          for (let ob in obj) {
            Array.prototype.push.apply(arr1, [obj[ob]]);
          }
        })
         // console.log(convertDay[0])
        getWeekFolowStatistic(arr1);
        getMonthFolowStatistic(arr1);
      })
  }

  // get weekly data statistic other place
  const getWeekFolowStatistic = (arr) => {
    let revenue =
    {
      nvl254: 0,
      qtr: 0,
      nvl334: 0,
      hk: 0
    };
    let count = 0;
   
    let newWeekChartData = currentMonthAgo.map((item) => {
      let nvl254 = 0;
      let qtr = 0;
      let nvl334 = 0;
      let hk = 0;


      arr.map((ob) => {
        let convertDay = ob.dateGet.split(/-| /, 3);
        // console.log(convertDay[0])
        // console.log(convertDay[1])


        if (item.month == convertDay[1] && item.year == convertDay[0]) {

          if (ob.place == 1) {
            nvl254++;
          } else
            if (ob.place == 2) {
              qtr++;
            } else
              if (ob.place == 3) {
                nvl334++;
              } else
                if (ob.place == 4) {
                  hk++;
                }
        }
       
      })

      revenue.nvl254 += nvl254;
      revenue.qtr += qtr;
      revenue.nvl334 += nvl334;
      revenue.hk += hk;
      count = nvl254 + qtr + nvl334 + hk;

      return {
        "date": item,
        "254 NVL": nvl254,
        "03 QT": qtr,
        "334 NVL": nvl334,
        "Hoa Khanh": hk,
        "name": `${MONTH_FORMAT[item.month]}`,
      }
    })
   
    setMonthChartData(newWeekChartData)
    setMonthDataTotal(count)
  }

  // get weekly data statistic other place
  const getMonthFolowStatistic = (arr) => {

    let weekCount = 0;
    
    let newWeekChartData = currentWeekAgo.map((item, index) => {
      let nvl254 = 0;
      let qtr = 0;
      let nvl334 = 0;
      let hk = 0;

      arr.map((ob) => {
        let convertDay = ob.dateGet.split(/-| /, 3);
        // console.log(convertDay[0])
        // console.log(convertDay[1])


        if (item.day == convertDay[2] && item.month == convertDay[1] && item.year == convertDay[0]) {

          if (ob.place == 1) {
            nvl254++;
          } else
            if (ob.place == 2) {
              qtr++;
            } else
              if (ob.place == 3) {
                nvl334++;
              } else
                if (ob.place == 4) {
                  hk++;
                }
        }
       
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
 
  //get week statistic form Firebase
  function getDataTopUpStatistic() {

    //get data form Firebase
    firebaseApp.database().ref("History/parkingMan/moneyIn/")
      .on('value', (snapshot) => {
        let snapshotValue = snapshot.val();
        let arr = [];
        for (let obj in snapshotValue) {
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
       
        let arr1 = [];
        arr.map((obj) => {
          for (let ob in obj) {
            Array.prototype.push.apply(arr1, [obj[ob]]);
          }
        })
        
         // console.log(convertDay[0])
         getTodayTopUpStatistic(arr1);
         
      })
  }

  // get weekly data statistic other place
  const getTodayTopUpStatistic = (arr) => {
    
    let todayCount = 0;
    let monthCount = 0;
      arr.map((ob) => {
        let convertDay = ob.dateSend.split(/-| /, 3);
     
        if (moment().format("MM") == convertDay[1] && moment().format("YYYY") == convertDay[0]) {
          if (moment().format("DD") == convertDay[2]){
            todayCount += parseInt(ob.payMoney)
          }
          monthCount += parseInt(ob.payMoney)
          
        }
      })
      setTodayTopUp(todayCount)
      setMonthTopUp(monthCount)
  }
const formatVND = (x) =>{
  return x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
}
 
  return (
    <div className="home-admin">
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
                <XAxis dataKey="name" />
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
              <div className="time">Flow</div>
              <div className="revenue-block">
                <div className="cicle-icon">
                  <i style={{ color: "#db4a3a" }} class="far fa-money-bill-alt"></i>
                  {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                </div>
                <div className="revenue"> {formatVND(parseInt(`${weekDataTotal}000`))} </div>
              </div>
              <div className="get-date">
                <div className="calendar-icon">
                  <i class="far fa-calendar-alt"></i>
                </div>
                <div className="moment-month">{myDateVariable}</div>
              </div>
            </div>

            <div className="revenue-box revenue-today">
              <div className="time">Top Up</div>
              <div className="revenue-block">
                <div className="cicle-icon">
                  <i style={{ color: "#db4a3a" }} class="far fa-money-bill-alt"></i>
                  {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                </div>
                <div className="revenue"> {formatVND(todayTopUp)} </div>
              </div>
              <div className="get-date">
                <div className="calendar-icon">
                  <i class="far fa-calendar-alt"></i>
                </div>
                <div className="moment-month">{myDateVariable}</div>
              </div>
            </div>
          
          </div>
          <div className="home-revenue">
          <div className="revenue-box revenue-monthly">
              <div className="time">Revenue</div>
              <div className="revenue-block">
                <div className="cicle-icon">
                  <i style={{ color: "#db4a3a" }} class="far fa-money-bill-alt"></i>
                  {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                </div>
                <div className="revenue"> {formatVND(parseInt(`${weekDataTotal}000`)+todayTopUp)}</div>
              </div>
              <div className="get-date">
                <div className="calendar-icon">
                  <i class="far fa-calendar-alt"></i>
                </div>
                <div className="moment-month">{myDateVariable}</div>
              </div>
            </div>

            <div className="revenue-box revenue-monthly">
              <div className="time">Revenue</div>
              <div className="revenue-block">
                <div className="cicle-icon">
                  <i style={{ color: "#3642eb" }} class="far fa-money-bill-alt"></i>
                  {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                </div>
                <div className="revenue">{formatVND((parseInt(`${monthDataTotal}000`)+monthTopUp))}</div>
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