import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./styles.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import moment from "moment";
import { WEEKDAY_FORMAT } from "../../../constants/common";

import { firebaseApp } from "../../../configs/firebase";

function Statistic({ dataYear }) {
  console.log("🚀 ~ file: index.jsx ~ line 26 ~ Statistic ~ dataYear", dataYear)
  const user = JSON.parse(localStorage.getItem("user"));

  const [weekChartData, setWeekChartData] = useState([]);
  const [monthChartData, setMonthChartData] = useState([]);
  const [yearChartData, setYearChartData] = useState([
    {
      name: "Thg 1",
      CP: 20000,
    },
    {
      name: "Thg 2",
      CP: 40000,
    },
    {
      name: "Thg 3",
      CP: 25000,
    },
    {
      name: "Thg 4",
      CP: 10000,
    },
    {
      name: "Thg 5",
      CP: 50000,
    },
    {
      name: "Thg 6",
      CP: 35000,
    },
    {
      name: "Thg 7",
      CP: 29000,
    },
    {
      name: "Thg 8",
      CP: 30000,
    },
    {
      name: "Thg 9",
      CP: 20000,
    },
    {
      name: "Thg 10",
      CP: 56000,
    },
    {
      name: "Thg 11",
      CP: 17000,
    },
    {
      name: "Thg 12",
      CP: 23000,
    },
  ]);

  const currentDay = moment();
  const startWeekDay = moment().startOf("isoWeek");
  const endWeekDay = moment().endOf("isoWeek");

  const startMonth = moment().startOf("month");
  const endMonth = moment().endOf("month");

  // const currentMonth = moment().format('MM');
  const currentYear = moment().format("YYYY");

  const getDayList = (startDay, endDay) => {
    let days = [];
    for (let date = startDay; date <= endDay; date.add(1, "days")) {
      days = [
        ...days,
        {
          day: date.format("DD"),
          month: date.format("MM"),
          year: date.format("YYYY"),
          weekday: date.weekday(),
        },
      ];
    }
    return days;
  };

  useEffect(() => {
    const currentWeek = getDayList(startWeekDay, endWeekDay);
    const currentMonth = getDayList(startMonth, endMonth);

    firebaseApp
      .database()
      .ref(`/History/parkingMan/moneyOut/${user.id}`)
      .on("value", (snapshot) => {
        let snapshotValue = snapshot.val();
        let arr = [];
        for (let obj in snapshotValue) {
          //get child object
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
        const newWeekChartData = currentWeek.map((item) => {
          let weekCount = 0;
          arr.map((ob) => {
            let convertDay = ob.dateGet.split(/-| /, 3);
            if (
              item.day == convertDay[2] &&
              item.month == convertDay[1] &&
              item.year == convertDay[0]
            ) {
              weekCount++;
            }
          });
          return {
            day: `${WEEKDAY_FORMAT[item.weekday]}`,
            count: weekCount,
          };
        });
        setWeekChartData([...newWeekChartData]);
      });

    firebaseApp
      .database()
      .ref(`/History/parkingMan/moneyOut/${user.id}`)
      .on("value", (snapshot) => {
        let snapshotValue = snapshot.val();
        let arr = [];
        for (let obj in snapshotValue) {
          //get child object
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
        const newMonthChartData = currentMonth.map((item) => {
          let monthCount = 0;
          arr.map((ob) => {
            let convertDay = ob.dateGet.split(/-| /, 3);
            if (
              item.day == convertDay[2] &&
              item.month == convertDay[1] &&
              item.year == convertDay[0]
            ) {
              monthCount++;
            }
          });
          return {
            day: `${item.day}/${item.month}`,
            count: monthCount,
          };
        });
        setMonthChartData([...newMonthChartData]);
      });
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className="statistic">
      <div className="statistic-row1">
        <div className="statistic-week">
          <div className="div-statistic-head">
            <h3>Lượt gửi/ Tuần</h3>
          </div>
          <div style={{ height: "83%", padding: "20px" }}>
            <ResponsiveContainer>
              <BarChart
                width={600}
                height={300}
                data={weekChartData}
                barSize={20}
                margin={{
                  right: 30,
                }}
              >
                <XAxis
                  dataKey="day"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis dataKey="count" />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="count"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="statistic-month">
          <div className="div-statistic-head">
            <h3>Lượt gửi/ Tháng</h3>
          </div>
          <div style={{ height: "83%", padding: "20px" }}>
            <ResponsiveContainer>
              <AreaChart
                data={monthChartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis dataKey="count" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
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
          <div style={{ height: "83%", padding: "20px" }}>
            <ResponsiveContainer>
              <LineChart
                width={800}
                height={200}
                data={yearChartData}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="CP"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { dataYear } = state;
  return {
    dataYear,
  };
};

export default connect(mapStateToProps)(Statistic);
