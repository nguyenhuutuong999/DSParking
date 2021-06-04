import React, { useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Statistic, Radio, Space, Progress } from 'antd';
import { LineChart, Line, ResponsiveContainer, Cell, XAxis, Legend, YAxis, Tooltip, Pie, PieChart, Label } from 'recharts';
import 'date-fns';
import moment from 'moment';
import { firebaseApp } from './../../../configs/firebase';
import { MONTH_FORMAT } from '../../../constants/common';

import { Text } from '../../../components/styles';

import * as Style from './styles';

function StatisticPage() {

  const [chartData, setchartData] = useState(0);
  // const [weekDataTotal, setWeekDataTotal] = useState(0);
  const [revenue, setRevenue] = useState({})

  const [selectedFromDate, setSelectedFromDate] = useState(
    moment().subtract(30, "days") 
  )
  const [selectedToDate, setSelectedToDate] = useState(
    moment()
  )
  const [monthFilterData, setMonthFilterData] = useState(false)

  const [yearFilterData, setYearFilterData] = useState(false)

  const [selectPlace, setSelectPlace] = useState(-1);

  // const data totp up of the nearest Month
  const [topUp, setTopUp] = useState(0);


  const handleFromDateChange = (date) => {
    setSelectedFromDate(date)
  }
  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  }

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
  const getYearList = (startYear, endYear) => {
    let years = [];
    for (let year = startYear.clone(); year <= endYear; year.add(1, 'years')) {
      years = [
        ...years,
        {
          year: year.format('YYYY'),
        },
      ]

    }
    return years;
  }

  useEffect(() => {
    //get data form Firebase
    getStatisticData(selectedFromDate, selectedToDate, (d) => {
      setchartData(d)

      getMonthData(d, (c) => {
        if (monthFilterData === true) {
          setchartData(c)
        }
        getYearData(d, (c) => {
          if (yearFilterData === true) {
            setchartData(c)
          }
        })
      })

    });
    getDataTopUpStatistic();
  }, [selectedFromDate, selectedToDate, monthFilterData, yearFilterData])


  // get all date follow sequential day
  const getStatisticData = async (selectedFromDate, selectedToDate, cb) => {
    firebaseApp.database().ref("History/parkingMan/moneyOut").on('value', (snapshot) => {
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
      //console.log(arr1)
      let currentWeekAgo = getDayList(selectedFromDate, selectedToDate);

      let revenue =
      {
        nvl254: 0,
        qtr: 0,
        nvl334: 0,
        hk: 0
      };
      let count = 0;
     
      let newWeekChartData = currentWeekAgo.map((item) => {
        let nvl254 = 0;
        let qtr = 0;
        let nvl334 = 0;
        let hk = 0;

        arr1.map((ob) => {
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

        revenue.nvl254 += nvl254;
        revenue.qtr += qtr;
        revenue.nvl334 += nvl334;
        revenue.hk += hk;
        count += nvl254 + qtr + nvl334 + hk;
        return {
          "date": item,
          "03 QT": qtr,
         "Hoa Khanh": hk,
        "254 NVL": nvl254,
        "334 NVL": nvl334,
          "name": ` ${MONTH_FORMAT[item.month]}, ${item.day}`,
        }
      })

      cb(newWeekChartData)
      setRevenue(revenue)
    }

    )
  }
  //filter Statistic in Month
  const getMonthData = (arr, cb) => {
    let filterMonthAgo = getMonthList(selectedFromDate, selectedToDate);
    let monthCount = 0;


    let newMonthChartData = filterMonthAgo.map((item) => {

      let nvl254 = 0;
      let qtr = 0;
      let nvl334 = 0;
      let hk = 0;

      arr.map((ob) => {

        if (item.month === ob.date.month && item.year === ob.date.year) {

          // ID 1: 254 Nguyen Van Linh
          // ID 2: Quang Trung
          // ID 3: 254 334 Nguyen Van Linh
          // ID 4: Hoa Khanh
          qtr += ob["03 QT"];
          hk += ob["Hoa Khanh"];
          nvl254 += ob["254 NVL"];
          nvl334 += ob["334 NVL"];
         
        }

      })
      monthCount += nvl254 + qtr + nvl334 + hk;
      return {
        "month": item.month,
        "year": item.year,
        "03 QT": qtr,
         "Hoa Khanh": hk,
        "254 NVL": nvl254,
        "334 NVL": nvl334,
        "total": monthCount,
        "name": `${MONTH_FORMAT[item.month]}, ${item.year}`
      }
    })
    cb(newMonthChartData)
  }

  //filter Statistic in Year
  const getYearData = (arr, cb) => {
    let filterYearAgo = getYearList(selectedFromDate, selectedToDate);
    let yearCount = 0;

    let newYearChartData = filterYearAgo.map((item) => {

      let nvl254 = 0;
      let qtr = 0;
      let nvl334 = 0;
      let hk = 0;

      arr.map((ob) => {

        if (item.year === ob.date.year) {

          // ID 1: 254 Nguyen Van Linh
          // ID 2: Quang Trung
          // ID 3: 254 334 Nguyen Van Linh
          // ID 4: Hoa Khanh
          nvl254 += ob["254 NVL"];
          qtr += ob["03 QT"];
          nvl334 += ob["334 NVL"];
          hk += ob["Hoa Khanh"];
        }

      })
      yearCount = nvl254 + qtr + nvl334 + hk;
      return {
        "month": item.year,
        "03 QT": qtr,
         "Hoa Khanh": hk,
        "254 NVL": nvl254,
        "334 NVL": nvl334,
        "total": yearCount,
        "name": item.year
      }
    })
    cb(newYearChartData)
  }

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

        console.log(arr1)
        getTodayTopUpStatistic(arr1);

      })
  }
  const getTodayTopUpStatistic = (arr) => {
    let filterDate = getDayList(selectedFromDate, selectedToDate);
    let count = 0;

    filterDate.map((item) => {

      arr.map((ob) => {

        let convertDay = ob.dateSend.split(/-| /, 3);

        if (item.day == convertDay[2] && item.month == convertDay[1] && item.year == convertDay[0]) {
          count += parseInt(ob.payMoney)
          console.log(count)

        }

      })

    })
    setTopUp(count)

  }

   const perc = (value) => {
    let cal = Math.round((value / (revenue.nvl254 + revenue.nvl334 + revenue.qtr + revenue.hk) * 100) * 10) / 10;
    return cal;
  }
  const data01 = [
    {
      "name": "254 NVL",
      "value": revenue.nvl254,
      "color": "#5C2BD7",
      "label": `${perc(revenue.nvl254)}%`
    },
    {
      "name": "03 Quang Trung",
      "value": revenue.qtr,
      "color": "#F21C58",
      "label": `${perc(revenue.qtr)}%`
    },
    {
      "name": "334 NVL",
      "value": revenue.nvl334,
      "color": "#37B684",
      "label": `${perc(revenue.nvl334)}%`
    },
    {
      "name": "Hoa Khanh",
      "value": revenue.hk,
      "color": "#FC591D",
      "label": `${perc(revenue.hk)}%`
    },

  ];

  function setStateOnFilterMonth() {
    setMonthFilterData(!monthFilterData);
    setYearFilterData(false);
  }
  function setStateOnFilterYear() {
    setYearFilterData(!yearFilterData);
    setMonthFilterData(false);
  }
  const formatVND = (x) => {
    return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  }
  return (
    <>
      <Style.StatisticFilterContainer>
        <Space size={32}>
          <Select
            value={selectPlace}
            onChange={(value) => setSelectPlace(value)}
            style={{ width: 180 }}
          >
            <Select.Option value={-1}>All</Select.Option>
            <Select.Option value={0}>03 Quang Trung</Select.Option>
            <Select.Option value={1}>Hòa Khánh</Select.Option>
            <Select.Option value={2}>254 Nguyễn Văn Linh</Select.Option>
            <Select.Option value={3}>334/4 Nguyễn Văn Linh</Select.Option>
          </Select>
          <DatePicker
            allowClear={false}
            defaultValue={selectedFromDate}
            format={(value) => `From: ${value.format('DD/MM/YYYY')}`}
            onChange={handleFromDateChange}
          />
          <DatePicker
            allowClear={false}
            defaultValue={selectedToDate}
            format={(value) => `To: ${value.format('DD/MM/YYYY')}`}
            onChange={handleToDateChange}
          />
          <Radio.Group
            onChange={(e) => {
              if (e.target.value === 'month') {
                setStateOnFilterMonth()
              } else {
                setStateOnFilterYear()
              }
            }}
          >
            <Radio.Button value="month">Month</Radio.Button>
            <Radio.Button value="year">Year</Radio.Button>
          </Radio.Group>
        </Space>
      </Style.StatisticFilterContainer>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Style.CardContainer>
            <Statistic
              title="Statistic"
              value={`${selectedFromDate.format('DD/MM/YYYY')} - ${selectedToDate.format('DD/MM/YYYY')}`}
              valueStyle={{ fontSize: 20 }}
            />
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}
                margin={{ left: -24, top: 32, right: 16, bottom: -8 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {selectPlace === 2 || selectPlace === -1 ? <Line type="monotone" dataKey="254 NVL" stroke="#5C2BD7" /> : <Line />}
                {selectPlace === 3 || selectPlace === -1 ? <Line type="monotone" dataKey="334 NVL" stroke="#37B684" /> : <Line />}
                {selectPlace === 1 || selectPlace === -1 ? <Line type="monotone" dataKey="Hoa Khanh" stroke="#FC591D" /> : <Line />}
                {selectPlace === 0 || selectPlace === -1 ? <Line type="monotone" dataKey="03 QT" stroke="#F21C58" /> : <Line />}
              </LineChart>
            </ResponsiveContainer>
          </Style.CardContainer>
        </Col>
        <Col xxl={6} lg={8} md={24}>
          <Style.CardContainer>
            <ResponsiveContainer width="100%" height={312} fill='white'>
              <PieChart>
                <Label position="inside" />
                <Pie data={data01} nameKey="name" label outerRadius={85} fill="#8884d8" label={(entry) => entry.label}>
                  {
                    data01.map((index) => (
                      <Cell key={index.name} fill={index.color} />
                    ))
                  }
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Style.CardContainer>
        </Col>
        <Col xxl={9} lg={16}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Style.FacilityRevenueContainer f254nvl>
                <Statistic
                  title={<Text white>Facility</Text>}
                  value="254 Nguyễn Văn Linh"
                  valueStyle={{ fontSize: 18, color: 'white' }}
                  style={{ marginBottom: 24 }}
                />
                <Statistic
                  title={<Text white>Revenue</Text>}
                  value={formatVND(parseInt(`${revenue.nvl254}000`))}
                  valueStyle={{ fontSize: 18, color: 'white' }}
                />
              </Style.FacilityRevenueContainer>
            </Col>
            <Col span={12}>
              <Style.FacilityRevenueContainer f03qtr>
                <Statistic
                  title={<Text white>Facility</Text>}
                  value="03 Quang Trung"
                  valueStyle={{ fontSize: 18, color: 'white' }}
                  style={{ marginBottom: 24 }}
                />
                <Statistic
                  title={<Text white>Revenue</Text>}
                  value={formatVND(parseInt(`${revenue.qtr}000`))}
                  valueStyle={{ fontSize: 18, color: 'white' }}
                />
              </Style.FacilityRevenueContainer>
            </Col>
            <Col span={12}>
              <Style.FacilityRevenueContainer f334nvl>
                <Statistic
                  title={<Text white>Facility</Text>}
                  value="334 Nguyễn Văn Linh"
                  valueStyle={{ fontSize: 18, color: 'white' }}
                  style={{ marginBottom: 24 }}
                />
                <Statistic
                  title={<Text white>Revenue</Text>}
                  value={formatVND(parseInt(`${revenue.nvl334}000`))}
                  valueStyle={{ fontSize: 18, color: 'white' }}
                />
              </Style.FacilityRevenueContainer>
            </Col>
            <Col span={12}>
              <Style.FacilityRevenueContainer fhk>
                <Statistic
                  title={<Text white>Facility</Text>}
                  value="Hòa Khánh"
                  valueStyle={{ fontSize: 18, color: 'white' }}
                  style={{ marginBottom: 24 }}
                />
                <Statistic
                  title={<Text white>Revenue</Text>}
                  value={formatVND(parseInt(`${revenue.hk}000`))}
                  valueStyle={{ fontSize: 18, color: 'white' }}
                />
              </Style.FacilityRevenueContainer>
            </Col>
          </Row>
        </Col>
        <Col xxl={9} md={24}>
          <Row gutter={[16, 16]}>
            <Col xxl={12} md={12}>
              <Style.TopUpContainer>
                <Text white>Top Up</Text>
                <Space style={{ margin: '8px 0' }}>
                  <i style={{ color: 'white', fontSize: 20 }} class="far fa-money-bill-alt"></i>
                  <Text white>{formatVND(parseInt(`${topUp}`))}</Text>
                </Space>
              </Style.TopUpContainer>
            </Col>
            <Col xxl={12} md={12}>
              <Style.RevenueContainer>
                <Text white>Revenue</Text>
                <Space style={{ margin: '8px 0' }}>
                  <i style={{ color: 'white', fontSize: 20 }} class="far fa-money-bill-alt"></i>
                  <Text white>{formatVND(parseInt(`${revenue.qtr + revenue.nvl254 + revenue.nvl334 + revenue.hk}000`) + parseInt(`${topUp}`))}</Text>
                </Space>
              </Style.RevenueContainer>
            </Col>
            <Col xxl={24} lg={12} md={24}>
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
            <Col xxl={24} lg={12} md={24}>
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
    </>
  )
}
export default StatisticPage;