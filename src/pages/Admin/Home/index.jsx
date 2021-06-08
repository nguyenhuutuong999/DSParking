import React, { useEffect, useState } from 'react';
import { Row, Col, Statistic, Space, Progress } from 'antd';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';
import { WEEKDAY_FORMAT, MONTH_FORMAT } from '../../../constants/common';
import { firebaseApp } from './../../../configs/firebase';
import { Text } from '../../../components/styles';
import * as Style from './styles';

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
        if (item.month == convertDay[1] && item.year == convertDay[0]) {

          if (ob.place == 2) {
            nvl254++;
          } else
            if (ob.place == 0) {
              qtr++;
            } else
              if (ob.place == 3) {
                nvl334++;
              } else
                if (ob.place == 1) {
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
        "03 QT": qtr,
         "Hoa Khanh": hk,
        "254 NVL": nvl254,
        "334 NVL": nvl334,
       
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

        if (item.day == convertDay[2] && item.month == convertDay[1] && item.year == convertDay[0]) {

          if (ob.place == 2) {
            nvl254++;
          } else
            if (ob.place == 0) {
              qtr++;
            } else
              if (ob.place == 3) {
                nvl334++;
              } else
                if (ob.place == 1) {
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
        "03 QT": qtr,
        "Hoa Khanh": hk,
       "254 NVL": nvl254,
       "334 NVL": nvl334,
        
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
    <Row gutter={[16, 16]}>
      <Col xl={6} md={12} xs={24}>
        <Style.CardContainer>
          <Row style={{ height: 88 }}>
            <Col span={16}>
              <Statistic
                title="Facility"
                value="254 NVL"
                valueStyle={{ fontSize: 20 }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Times"
                value={totalToday254NVL}
                suffix={<Text headerText>/ 200</Text>}
                valueStyle={{ fontSize: 20 }}
              />
            </Col>
          </Row>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={weekChartData}
              margin={{ left: -24, top: 32, right: 16, bottom: -8 }}
            >
              <XAxis dataKey="day" tick={{ fill: '#db5c00' }} />
              <YAxis dataKey="254 NVL" tick={{ fill: '#db5c00' }} />
              <Tooltip />
              <Line type="monotone" dataKey="254 NVL" stroke="#db5c00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Style.CardContainer>
      </Col>
      <Col xl={6} md={12} xs={24}>
        <Style.CardContainer>
          <Row style={{ height: 88 }}>
            <Col span={16}>
              <Statistic
                title="Facility"
                value="03 Quang Trung"
                valueStyle={{ fontSize: 20 }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Times"
                value={totalToday03qt}
                suffix={<Text headerText>/ 300</Text>}
                valueStyle={{ fontSize: 20 }}
              />
            </Col>
          </Row>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={weekChartData}
              margin={{ left: -24, top: 32, right: 16, bottom: -8 }}
            >
              <XAxis dataKey="day" tick={{ fill: '#6875E9' }} />
              <YAxis dataKey="03 QT" tick={{ fill: '#6875E9' }} />
              <Tooltip />
              <Line type="monotone" dataKey="03 QT" stroke="#6875E9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Style.CardContainer>
      </Col>
      <Col xl={6} md={12} xs={24}>
        <Style.CardContainer>
          <Row style={{ height: 88 }}>
            <Col span={16}>
              <Statistic
                title="Facility"
                value="334 NVL"
                valueStyle={{ fontSize: 20 }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Times"
                value={totalToday334nvl}
                suffix={<Text headerText>/ 100</Text>}
                valueStyle={{ fontSize: 20 }}
              />
            </Col>
          </Row>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={weekChartData}
              margin={{ left: -24, top: 32, right: 16, bottom: -8 }}
            >
              <XAxis dataKey="day" tick={{ fill: '#41B35D' }} />
              <YAxis dataKey="334 NVL" tick={{ fill: '#41B35D' }} />
              <Tooltip />
              <Line type="monotone" dataKey="334 NVL" stroke="#41B35D" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Style.CardContainer>
      </Col>
      <Col xl={6} md={12} xs={24}>
        <Style.CardContainer>
          <Row style={{ height: 88 }}>
            <Col span={16}>
              <Statistic
                title="Facility"
                value="Hòa Khánh"
                valueStyle={{ fontSize: 20 }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Times"
                value={totalTodayHK}
                suffix={<Text headerText>/ 500</Text>}
                valueStyle={{ fontSize: 20 }}
              />
            </Col>
          </Row>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={weekChartData}
              margin={{ left: -24, top: 32, right: 16, bottom: -8 }}
            >
              <XAxis dataKey="day" tick={{ fill: '#36A6CA' }} />
              <YAxis dataKey="Hoa Khanh" tick={{ fill: '#36A6CA' }} />
              <Tooltip />
              <Line type="monotone" dataKey="Hoa Khanh" stroke="#36A6CA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Style.CardContainer>
      </Col>
      <Col xxl={16} xl={14} lg={12} xs={24}>
        <Style.CardContainer>
          <Statistic
            title="General chart"
            value={`${currentMonthAgo[0].month}/${currentMonthAgo[0].year} - ${currentMonthAgo[currentMonthAgo.length - 1].month}/${currentMonthAgo[currentMonthAgo.length - 1].year}`}
            valueStyle={{ fontSize: 20 }}
          />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthChartData}
              margin={{ left: -24, top: 32, right: 16, bottom: -8 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="254 NVL" stroke="#8684d8" />
              <Line type="monotone" dataKey="334 NVL" stroke="#82ca9d" />
              <Line type="monotone" dataKey="03 QT" stroke="#c7b3e6" />
              <Line type="monotone" dataKey="Hoa Khanh" stroke="#db5c00" />
            </LineChart>
          </ResponsiveContainer>
        </Style.CardContainer>
      </Col>
      <Col xxl={8} xl={10} lg={12} xs={24}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Style.TodayRevenue>
              <Text white>Flow</Text>
              <Space style={{ margin: '8px 0' }}>
                <i style={{ color: 'white', fontSize: 20 }} class="far fa-money-bill-alt"></i>
                <Text white>{formatVND(parseInt(`${weekDataTotal}000`))}</Text>
              </Space>
              <div>
                <Space>
                  <i style={{ color: 'white', fontSize: 16 }} class="far fa-calendar-alt"></i>
                  <Text xxs white>{myDateVariable}</Text>
                </Space>
              </div>
            </Style.TodayRevenue>
          </Col>
          <Col span={12}>
            <Style.TodayRevenue>
              <Text white>Top Up</Text>
              <Space style={{ margin: '8px 0' }}>
                <i style={{ color: 'white', fontSize: 20 }} class="far fa-money-bill-alt"></i>
                <Text white>{formatVND(todayTopUp)}</Text>
              </Space>
              <div>
                <Space>
                  <i style={{ color: 'white', fontSize: 16 }} class="far fa-calendar-alt"></i>
                  <Text xxs white>{myDateVariable}</Text>
                </Space>
              </div>
            </Style.TodayRevenue>
          </Col>
          <Col span={12}>
            <Style.MonthlyRevenue>
              <Text white>Revenue</Text>
              <Space style={{ margin: '8px 0' }}>
                <i style={{ color: 'white', fontSize: 20 }} class="far fa-money-bill-alt"></i>
                <Text white>{formatVND(parseInt(`${weekDataTotal}000`) + todayTopUp)}</Text>
              </Space>
              <div>
                <Space>
                  <i style={{ color: 'white', fontSize: 16 }} class="far fa-calendar-alt"></i>
                  <Text xxs white>{myDateVariable}</Text>
                </Space>
              </div>
            </Style.MonthlyRevenue>
          </Col>
          <Col span={12}>
            <Style.MonthlyRevenue>
              <Text white>Flow</Text>
              <Space style={{ margin: '8px 0' }}>
                <i style={{ color: 'white', fontSize: 20 }} class="far fa-money-bill-alt"></i>
                <Text white>{formatVND((parseInt(`${monthDataTotal}000`) + monthTopUp))}</Text>
              </Space>
              <div>
                <Space>
                  <i style={{ color: 'white', fontSize: 16 }} class="far fa-calendar-alt"></i>
                  <Text xxs white>{month}, {year}</Text>
                </Space>
              </div>
            </Style.MonthlyRevenue>
          </Col>
          <Col span={24}>
            <Style.CardContainer>
              <Row gutter={16}>
                <Col flex="90px">
                  <Style.UserTrafficIcon>
                    <i style={{ color: "#6972FF" }} class="fas fa-users fa-2x"></i>
                  </Style.UserTrafficIcon>
                </Col>
                <Col flex="auto">
                  <Statistic
                    title="Users/Today"
                    value={2000}
                    suffix={<Text headerText>/ 10.000</Text>}
                    valueStyle={{ fontSize: 20 }}
                  />
                  <Progress percent={20} strokeColor="#6972FF" status="active" />
                </Col>
              </Row>
            </Style.CardContainer>
          </Col>
          <Col span={24}>
            <Style.CardContainer>
              <Row gutter={16}>
                <Col flex="90px">
                  <Style.UserTrafficIcon>
                    <i style={{ color: "#FF8C80" }} class="fas fa-users fa-2x"></i>
                  </Style.UserTrafficIcon>
                </Col>
                <Col flex="auto">
                  <Statistic
                    title="Users/School"
                    value={10000}
                    suffix={<Text headerText>/ 20.000</Text>}
                    valueStyle={{ fontSize: 20 }}
                  />
                  <Progress percent={50} strokeColor="#FF8C80" status="active" />
                </Col>
              </Row>
            </Style.CardContainer>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Home;