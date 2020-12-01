import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Cell, XAxis, Legend, YAxis, Tooltip, Pie, PieChart, Label } from 'recharts';
import './styles.css'
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import fire from './../../../services/firebase';
import { WEEKDAY_FORMAT, MONTH_FORMAT } from '../../../constants/common';

function Statistic() {

  const [chartData, setchartData] = useState(0);
  // const [weekDataTotal, setWeekDataTotal] = useState(0);
  const [revenue, setRevenue] = useState({})

  const [selectedFromDate, setSelectedFromDate] = useState(
    moment("11/1/2020")
  )
  const [selectedToDate, setSelectedToDate] = useState(
    moment()
  )
  const [monthFilterData, setMonthFilterData] = useState(false)

  const [yearFilterData, setYearFilterData] = useState(false)

  const [selectPlace, setSelectPlace] = useState(0)

  const handleFromDateChange = (date) => {
    setSelectedFromDate(moment(date))
  }
  const handleToDateChange = (date) => {
    setSelectedToDate(moment(date));
  }
  function onSelector(event) {
    setSelectPlace(event.target.value);
  }

  const getDayList = (startDay, endDay) => {
    let days = [];
    for (let date = startDay.clone(); date <= endDay; date.add(1, 'days')) {

      days = [
        ...days,
        {
          day: date.format('D'),
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

  }, [selectedFromDate, selectedToDate, monthFilterData, yearFilterData])


  // get all date follow sequential day
  const getStatisticData = async (selectedFromDate, selectedToDate, cb) => {
    fire.database().ref("ChartStatis/").on('value', (snapshot) => {
      let snapshotValue = snapshot.val();
      let arr = [];
      for (let obj in snapshotValue) {
        Array.prototype.push.apply(arr, [snapshotValue[obj]]);
      }
      let currentWeekAgo = getDayList(selectedFromDate, selectedToDate);

     let revenue = 
       {
         nvl254 : 0,
         qtr : 0,
         nvl334 : 0,
         hk : 0
       };
       let count = 0;
      let getCountPlace = [];
      let newWeekChartData = currentWeekAgo.map((item) => {
        let nvl254 = 0;
        let qtr = 0;
        let nvl334 = 0;
        let hk = 0;

        arr.map((ob) => {

          getCountPlace = (((ob.chartData || {})[item.year]?.month || {})[item.month]?.day || {})[item.day];
          getCountPlace = getCountPlace ? getCountPlace : {};
          // ID 1: 254 Nguyen Van Linh
          // ID 2: Quang Trung
          // ID 3: 254 334 Nguyen Van Linh
          // ID 4: Hoa Khanh
          nvl254 += getCountPlace["1"] ? getCountPlace["1"] : 0;
          qtr += getCountPlace["2"] ? getCountPlace["2"] : 0;
          nvl334 += getCountPlace["3"] ? getCountPlace["3"] : 0;
          hk += getCountPlace["4"] ? getCountPlace["4"] : 0;
          // nvl254 += getCountPlace["1"];
          // qtr += getCountPlace["2"];
          // nvl334 += getCountPlace["3"];
          // hk += getCountPlace["4"];
        })
        revenue.nvl254 +=  nvl254;
        revenue.qtr += qtr;
        revenue.nvl334 += nvl334;
        revenue.hk += hk;
        count += nvl254 + qtr + nvl334 + hk;
        return {
          "date": item,
          "254 NVL": nvl254,
          "03 QT": qtr,
          "334 NVL": nvl334,
          "Hoa Khanh": hk,
          "name": ` ${MONTH_FORMAT[item.month]}, ${item.day}`,
        }
      })
      cb(newWeekChartData)
      setRevenue(revenue)
    }
    
    )
  }
console.log(revenue)
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
          nvl254 += ob["254 NVL"];
          qtr += ob["03 QT"];
          nvl334 += ob["334 NVL"];
          hk += ob["Hoa Khanh"];
        }

      })
      monthCount += nvl254 + qtr + nvl334 + hk;
      return {
        "month": item.month,
        "year": item.year,
        "254 NVL": nvl254,
        "03 QT": qtr,
        "334 NVL": nvl334,
        "Hoa Khanh": hk,
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
        "254 NVL": nvl254,
        "03 QT": qtr,
        "334 NVL": nvl334,
        "Hoa Khanh": hk,
        "total": yearCount,
        "name": item.year
      }
    })
    cb(newYearChartData)
  }

  const perc = (value) =>{
    return Math.round((value/(revenue.nvl254+ revenue.nvl334+revenue.qtr+revenue.hk)*100)*10)/10;
  }
  const data01 = [
    {
      "name": "254 NVL",
      "value": revenue.nvl254,
      "color": "#82CA9D",
      "label" :`${perc(revenue.nvl254)}%`

    },
    {
      "name": "334 NVL",
      "value": revenue.nvl334,
      "color": "#8DD1E1",
      "label" :`${perc(revenue.nvl334)}%`
    },
    {
      "name": "03 Quang Trung",
      "value": revenue.qtr,
      "color": "#A4DE6C",
      "label" :`${perc(revenue.qtr)}%`
    },
    {
      "name": "Hoa Khanh",
      "value": revenue.hk,
      "color": "#D0ED57",
      "label" :`${perc(revenue.hk)}%`
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

  return (

    <div className="statistic">

      <div className="col-xs-12">
        <div className="from-to">
          <div class="input-group input-group-sm mb-3">
            <select onChange={onSelector} value={selectPlace} name="place" id="input-state" style={{ fontSize: "13px" }} className="form-control-statistic">
              <option value={0}>All</option>
              <option value={1}>254 Nguyễn Văn Linh</option>
              <option value={2}>03 Quang Trung</option>
              <option value={3}>Hòa Khánh</option>
              <option value={4}>334/4 Nguyễn Văn Linh</option>
            </select>
          </div>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend" style={{ width: "70px" }}>
              <span class="input-group-text" id="inputGroup-sizing-sm">From</span>
            </div>
            {/* <input type="text" class="form-control-statistic" aria-label="Small" aria-describedby="inputGroup-sizing-sm" /> */}
            <div class="form-control-statistic" >

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  //disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  padding="0"
                  id="date-picker"
                  name="fromDate"
                  value={selectedFromDate}
                  onChange={handleFromDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>

          </div>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend" style={{ width: "40px" }}>
              <span class="input-group-text" id="inputGroup-sizing-sm">To</span>
            </div>
            <div class="form-control-statistic" >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                  //disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  padding="0"
                  id="date-picker"
                  name="toDate"
                  value={selectedToDate}
                  onChange={handleToDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />

              </MuiPickersUtilsProvider>
            </div>

          </div>


        </div>
        <div className="from-to">

          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend" style={{ width: "70px" }}>
              <button class="input-group-text filter filter-month" onClick={() => setStateOnFilterMonth()} id="">Month</button>
            </div>
            {/* <input type="text" class="form-control-statistic" aria-label="Small" aria-describedby="inputGroup-sizing-sm" /> */}

          </div>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend" style={{ width: "70px" }}>
              <button class="input-group-text filter filter-year" onClick={() => setStateOnFilterYear()} id="">Year</button>
            </div>

          </div>


        </div>

        <div className="statistic-chart">
          <ResponsiveContainer width="98%" height="98%" fill='white'>
            <LineChart data={chartData}
              margin={{ left: -10, top: 20 }}
              fill='white'
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              {selectPlace == 1 || selectPlace == 0 ? <Line type="monotone" dataKey="254 NVL" stroke="#82CA9D" /> : <Line />}
              {selectPlace == 2 || selectPlace == 0 ? <Line type="monotone" dataKey="334 NVL" stroke="#8DD1E1" /> : <Line />}
              {selectPlace == 3 || selectPlace == 0 ? <Line type="monotone" dataKey="03 QT" stroke="#A4DE6C" /> : <Line />}
              {selectPlace == 4 || selectPlace == 0 ? <Line type="monotone" dataKey="Hoa Khanh" stroke="#D0ED57" /> : <Line />}

            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-xs-12">
        <div className="col-xs-3">
          <div className="pie-chart">
            <ResponsiveContainer width="98%" height="98%" fill='white'>
              <PieChart>
                <Label position="inside" />
                <Pie data={data01} nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" label={(entry) => entry.label}>
                  {

                    data01.map((index) => (
                      <Cell key={index.name} fill={index.color} value={index.value} />
                    ))
                  }
                </Pie>
                <Legend /><Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-xs-9 statistic-9">
          <div className="col-xs-6"> 
            <div className="home-revenue">
              <div className="revenue-box revenue-today">
                <div className="time">Today</div>
                <div className="revenue-block">
                  <div className="cicle-icon">
                    <i style={{ color: "#db4a3a" }} class="far fa-money-bill-alt"></i>
                    {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                  </div>
                  <div className="revenue">{revenue.nvl254}.000 VND</div>
                </div>
                <div className="get-date">
                  <div className="calendar-icon">
                    <i class="far fa-calendar-alt"></i>
                  </div>
                  <div className="moment-month"></div>
                </div>
              </div>

              <div className="revenue-box revenue-monthly">
                <div className="time">Monthly</div>
                <div className="revenue-block">
                  <div className="cicle-icon">
                    <i style={{ color: "#3642eb" }} class="far fa-money-bill-alt"></i>
                    {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                  </div>
                  <div className="revenue"> {revenue.qtr}.000 VND</div>
                </div>
                <div className="get-date">
                  <div className="calendar-icon">
                    <i class="far fa-calendar-alt"></i>
                  </div>
                  <div className="moment-month"></div>
                </div>
              </div>
              <div className="revenue-box revenue-monthly">
                <div className="time">Monthly</div>
                <div className="revenue-block">
                  <div className="cicle-icon">
                    <i style={{ color: "#3642eb" }} class="far fa-money-bill-alt"></i>
                    {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                  </div>
                  <div className="revenue"> {revenue.nvl334}.000 VND</div>
                </div>
                <div className="get-date">
                  <div className="calendar-icon">
                    <i class="far fa-calendar-alt"></i>
                  </div>
                  <div className="moment-month"></div>
                </div>
              </div>
              <div className="revenue-box revenue-monthly">
                <div className="time">Monthly</div>
                <div className="revenue-block">
                  <div className="cicle-icon">
                    <i style={{ color: "#3642eb" }} class="far fa-money-bill-alt"></i>
                    {/* <img className="img-coin" src="./../coin.png" alt="#coin" /> */}
                  </div>
                  <div className="revenue"> {revenue.hk}.000 VND</div>
                </div>
                <div className="get-date">
                  <div className="calendar-icon">
                    <i class="far fa-calendar-alt"></i>
                  </div>
                  <div className="moment-month"></div>
                </div>
              </div>
            
            </div>
          </div>
          <div className="col-xs-6">  
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

    </div>

  )
}
export default Statistic;