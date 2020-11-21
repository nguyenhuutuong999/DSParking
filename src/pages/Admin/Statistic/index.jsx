import React from 'react';

import { LineChart, Line, ResponsiveContainer,Cell, XAxis, Legend, YAxis, Tooltip, Pie, PieChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid, LabelList, Label} from 'recharts';
import './styles.css'

function Statistic() {
  const data = [
    {
      "name": "Jan",
      "254 NVL": 4000,
      "334 NVL": 2400,
      "03 Quang Trung": 5400,
      "Hoa Khanh": 1400,
      "amt": 2400
    },
    {
      "name": "Feb",
      "254 NVL": 3000,
      "334 NVL": 1398,
      "03 Quang Trung": 2398,
      "Hoa Khanh": 398,
      "amt": 2210
    },
    {
      "name": "Mar",
      "254 NVL": 2000,
      "334 NVL": 4800,
      "03 Quang Trung": 5800,
      "Hoa Khanh": 3800,
      "amt": 2290
    },
    {
      "name": "Apr",
      "254 NVL": 2780,
      "334 NVL": 3908,
      "03 Quang Trung": 5908,
      "Hoa Khanh": 2908,
      "amt": 2000
    },
    {
      "name": "May",
      "254 NVL": 1890,
      "334 NVL": 4800,
      "03 Quang Trung": 2800,
      "Hoa Khanh": 3800,
      "amt": 2181
    },
    {
      "name": "June",
      "254 NVL": 2390,
      "334 NVL": 3800,
      "03 Quang Trung": 3800,
      "Hoa Khanh": 2800,
      "amt": 2500
    },
    {
      "name": "July",
      "254 NVL": 3490,
      "334 NVL": 4300,
      "03 Quang Trung": 2300,
      "Hoa Khanh": 3300,
      "amt": 2100
    },
    {
      "name": "August",
      "254 NVL": 3490,
      "334 NVL": 4300,
      "03 Quang Trung": 4300,
      "Hoa Khanh": 3300,
      "amt": 2100
    },
    {
      "name": "Sept",
      "254 NVL": 3490,
      "334 NVL": 4300,
      "03 Quang Trung": 1300,
      "Hoa Khanh": 3300,
      "amt": 2100
    },
    {
      "name": "Oct",
      "254 NVL": 3490,
      "334 NVL": 4300,
      "03 Quang Trung": 4300,
      "Hoa Khanh": 1300,
      "amt": 2100
    },
    {
      "name": "Nov",
      "254 NVL": 3490,
      "334 NVL": 4300,
      "03 Quang Trung": 1300,
      "Hoa Khanh": 3300,
      "amt": 2100
    },
    {
      "name": "Dev",
      "254 NVL": 3490,
      "334 NVL": 4300,
      "03 Quang Trung": 1300,
      "Hoa Khanh": 2300,
      "amt": 2100
    },
  ]
  const data01 = [
    {
      "name": "254 NVL",
      "value": 400,
      "color" : "#82CA9D",

    },
    {
      "name": "334 NVL",
      "value": 300,
      "color" : "#8DD1E1",
    },
    {
      "name": "03 Quang Trung",
      "value": 200,
      "color" : "#A4DE6C",
    },
    {
      "name": "Hoa Khanh",
      "value": 100,
      "color" : "#D0ED57",
    },

  ];
  return (
    <div className="statistic">

      <div class="col-xs-12">
        <div className="from-to">
          <div class="input-group input-group-sm mb-3">
            <select name="year" id="input-state" style={{ fontSize: "13px" }} className="form-control-statistic">
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
            <input type="text" class="form-control-statistic" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </div>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend" style={{ width: "40px" }}>
              <span class="input-group-text" id="inputGroup-sizing-sm">To</span>
            </div>
            <input type="text" class="form-control-statistic" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </div>


        </div>


        <div className="statistic-chart">
          <ResponsiveContainer width="98%" height="98%" fill='white'>
            <LineChart data={data}
              margin={{ left: -10, top: 20 }}
              fill='white'
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="254 NVL" stroke="#82CA9D" />
              <Line type="monotone" dataKey="334 NVL" stroke="#8DD1E1" />
              <Line type="monotone" dataKey="03 Quang Trung" stroke="#A4DE6C" />
              <Line type="monotone" dataKey="Hoa Khanh" stroke="#D0ED57" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div class="col-xs-12">
        <div class="col-xs-3">
          <div className="pie-chart">
            <ResponsiveContainer width="98%" height="98%" fill='white'>
              <PieChart>
              <Label position="inside"/>
                <Pie data={data01} nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" label={(entry) => entry.value}>
                {
                 
                  data01.map((index) => (
                    <Cell key={index.name} fill={index.color} value = {index.value} />
                  ))
                }
                </Pie>
               
               
                <Legend /><Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>



      </div>

    </div>

  )
}
export default Statistic; 