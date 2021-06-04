import React, { useState, useEffect } from "react";
import { Row, Col, Statistic, Avatar, Button, Table, Popconfirm } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { SwapOutlined } from '@ant-design/icons';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import QRCode from "qrcode.react";
import moment from "moment";

import history from "../../../util/history";

import { firebaseApp } from "../../../configs/firebase";

import {
  WEEKDAY_FORMAT,
  LOCATION,
} from "../../../constants/common";

import { Text } from '../../../components/styles';

import * as Style from './styles';

function HomePage() {
  const [userData, setUserData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const [checkInHistory, setCheckInHistory] = useState([]);
  const [weekChartData, setWeekChartData] = useState([]);
  const [monthChartData, setMonthChartData] = useState([]);

  const [totalWeekCount, setTotalWeekCount] = useState("0");
  const [totalMonthCount, setTotalMonthCount] = useState("0");
  const currentDay = moment();
  const oneWeekAgo = moment().subtract(6, "days");
  const oneMonthAgo = moment().subtract(1, "month").add(1, "days");

  const currentMonth = moment().format("MM");
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

  const columnsHistory = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "timeIn",
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "Plate License",
      dataIndex: "plateLicense",
      key: "plateLicense",
    },
  ];

  useEffect(() => {
    const currentWeekAgo = getDayList(oneWeekAgo, currentDay);
    const currentMonthAgo = getDayList(oneMonthAgo, currentDay);

    firebaseApp
      .database()
      .ref(`/User/information/parkingMan/${user.id}`)
      .on("value", (snapshot) => {
        setUserData({ ...snapshot.val() });
      });

    firebaseApp
      .database()
      .ref(`/History/parkingMan/moneyOut/${user.id}`)
      .on("value", (snapshot) => {
        let snapshotValue = snapshot.val();
        let newTotalWeekCount = 0;
        let arr = [];

        for (let obj in snapshotValue) {
          //get child object
          // Array.prototype.push.apply(arr, [snapshotValue[obj]]);
          arr = [...arr, snapshotValue[obj]];
        }
        const newWeekChartData = currentWeekAgo.map((item) => {
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
          newTotalWeekCount += weekCount;
          return {
            day: `${WEEKDAY_FORMAT[item.weekday]}`,
            count: weekCount,
          };
        });
        setTotalWeekCount(newTotalWeekCount);
        setWeekChartData([...newWeekChartData]);
      });

    //Chart Month
    firebaseApp
      .database()
      .ref(`/History/parkingMan/moneyOut/${user.id}`)
      .on("value", (snapshot) => {
        let snapshotValue = snapshot.val();
        let newTotalMonthCount = 0;
        let arr = [];

        for (let obj in snapshotValue) {
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
        const newMonthChartData = currentMonthAgo.map((item) => {
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
          newTotalMonthCount += monthCount;
          return {
            day: `${item.day}/${item.month}`,
            count: monthCount,
          };
        });
        setTotalMonthCount(newTotalMonthCount);
        setMonthChartData([...newMonthChartData]);
      });

    //History
    firebaseApp
      .database()
      .ref(`/History/parkingMan/moneyOut/${user.id}`)
      .on("value", (snapshot) => {
        let snapshotHistoryValue = snapshot.val();
        let newCheckInHistory = [];
        // for (let obj in snapshotHistoryValue) {
        //   Array.prototype.push.apply(newCheckInHistory, [snapshotHistoryValue[obj]]);
        // }
        for (let checkInId in snapshotHistoryValue) {
          // if (newCheckInHistory.length <= 3) {
          newCheckInHistory = [
            {
              date: moment(
                snapshotHistoryValue[checkInId].dateSend,
                "YYYY-MM-DD HH:mm:ss"
              ).format("DD/MM/YYYY"),
              timeIn: moment(
                snapshotHistoryValue[checkInId].dateSend,
                "YYYY-MM-DD HH:mm:ss"
              ).format("HH:mm:ss"),
              place: `${LOCATION[snapshotHistoryValue[checkInId].place]}`,
              plateLicense: snapshotHistoryValue[checkInId].plateLicense,
            },
            ...newCheckInHistory,
          ];
          // }
        }
        setCheckInHistory([...newCheckInHistory]);
      });
  }, []);

  const handleChangeQRCode = () => {
    firebaseApp
      .database()
      .ref(`/User/information/parkingMan/${user.id}`)
      .update({
        secretNum: Math.random().toString().substr(2, 4),
      });
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={18}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Style.CardContainer>
              <Statistic
                title={`Parking week (${moment(oneWeekAgo).format('DD/MM/YYYY')} - ${moment(currentDay).format('DD/MM/YYYY')})`}
                value={totalWeekCount}
                prefix={<SwapOutlined style={{ color: '#c44a8a' }} />}
                suffix="times/week"
              />
              <ResponsiveContainer height={200}>
                <LineChart
                  data={weekChartData}
                  margin={{ left: -32, top: 32, right: 16, bottom: -8 }}
                >
                  <XAxis dataKey="day" />
                  <YAxis
                    dataKey="count"
                    type="number"
                    domain={[0, (dataMax) => (dataMax <= 4 ? 4 : dataMax)]}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#c44a8a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Style.CardContainer>
          </Col>
          <Col span={12}>
            <Style.CardContainer>
              <Statistic
                title={`Parking month (${moment(oneMonthAgo).format('DD/MM/YYYY')} - ${moment(currentDay).format('DD/MM/YYYY')})`}
                value={totalMonthCount}
                prefix={<SwapOutlined style={{ color: '#c44a8a' }} />}
                suffix="times/month"
              />
              <ResponsiveContainer height={200}>
                <LineChart
                  margin={{ left: -32, top: 32, right: 16, bottom: -8 }}
                  data={monthChartData}
                >
                  <Tooltip />
                  <XAxis dataKey="day" />
                  <YAxis
                    dataKey="count"
                    type="number"
                    domain={[0, (dataMax) => (dataMax <= 4 ? 4 : dataMax)]}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#c44a8a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Style.CardContainer>
          </Col>
          <Col span={24}>
            <Style.CardContainer>
              <Text headerText xl style={{ marginBottom: 8 }}>Parking History</Text>
              <Table
                dataSource={checkInHistory}
                columns={columnsHistory}
              />
            </Style.CardContainer>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Style.ProfileCardContainer>
          <Style.ProfileCardBackground />
          <Style.ProfileAvatar>
            {userData.avatar && userData.avatar !== 'none'
              ? <img src={userData.avatar} width={150} height={150} alt="Avatar" />
              : <Avatar size={150} icon={<UserOutlined />} />
            }
          </Style.ProfileAvatar>
          <Style.ProfileCardContent>
            <Text xl headerText w6>{userData.name}</Text>
            <Text headerText>{userData.idStudent}</Text>
            <Button
              onClick={() => history.push('/profile')}
              style={{ marginTop: 16 }}
            >
              Profile
            </Button>
          </Style.ProfileCardContent>
        </Style.ProfileCardContainer>
        <Style.CardContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text headerText xl style={{ marginBottom: 8 }}>Your QrCode</Text>
          <QRCode value={`${user.id}${userData.secretNum}`} size={140} />
          <Popconfirm
            placement="topRight"
            title="Confirm the change QRCode?"
            onConfirm={() => handleChangeQRCode()}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginTop: 16 }}>
              Change QRCode
            </Button>
          </Popconfirm>
        </Style.CardContainer>
      </Col>
    </Row>
  );
}

export default HomePage;
