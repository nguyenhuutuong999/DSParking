import React, { PureComponent, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../../util/history'
import * as actions from './../../../redux/actions/index';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, Legend, YAxis, Tooltip } from 'recharts';
import './styles.css'

function Home(props) {
  let nvl1 = props.getList
  const [nvl, setnvl] = useState([0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    props.getMoneyOutListTodayRequest();
    setnvl(props.getList);
    console.log(props.getList)
    return () => {

    }
  }, [])
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
      "254 NVL": 2780,
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

  const dataMonth = [
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


  function updateStatistic() {
    props.updateDateWeek()
  }
  return (
    <div className="home">

      <div className="home-week-static">
        <div className="home-week-items">
          <div className="home-week-info">
            <div className="icon-title-statistics">

              <div className="local">254 Nguyen Van Linh</div>
              <div className="number">{nvl1[0]}/300</div>
            </div>

          </div>
          <div className="home-week-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={dataWeek}>



                <Line type="monotone" dataKey="254NVL" stroke="#db5c00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="home-week-items">
          <div className="home-week-info">
            <div className="icon-title-statistics">

              <div className="local">254 Nguyen Van Linh</div>
              <div className="number">{nvl1[0]}/300</div>
            </div>

          </div>
          <div className="home-week-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={dataWeek}>



                <Line type="monotone" dataKey="254NVL" stroke="#db5c00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="home-week-items">
          <div className="home-week-info">
            <div className="icon-title-statistics">

              <div className="local">254 Nguyen Van Linh</div>
              <div className="number">{nvl1[0]}/300</div>
            </div>

          </div>
          <div className="home-week-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={dataWeek}>



                <Line type="monotone" dataKey="254NVL" stroke="#db5c00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="home-week-items">
          <div className="home-week-info">
            <div className="icon-title-statistics">

              <div className="local">254 Nguyen Van Linh</div>
              <div className="number">{nvl1[0]}/300</div>
            </div>

          </div>
          <div className="home-week-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={dataWeek}>



                <Line type="monotone" dataKey="254NVL" stroke="#db5c00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="home-bottom-static">

        <div class="col-xs-8">
          <div className="home-month-chart">
            <ResponsiveContainer width="100%" height="100%" fill='white'>
              <LineChart data={data}
                margin={{ top: 35, right: 5 }}
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

      {/* <button type="button" className="btn btn-info" onClick={updateStatistic}>Update</button> */}

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
    updateDateWeek: () => {
      dispatch(actions.updateDateWeek())
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);