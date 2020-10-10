import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import './styles.css';

function Statistic() {
  const data = [
    {
      name: 'T2', uv: 8000, amt: 2400,
    },
    {
      name: 'T3', uv: 3000, amt: 2210,
    },
    {
      name: 'T3', uv: 2000, amt: 2290,
    },
    {
      name: 'T4', uv: 1000, amt: 2000,
    },
    {
      name: 'T5', uv: 2000, amt: 2181,
    },
    {
      name: 'T6', uv: 5000, amt: 2500,
    },
    {
      name: 'T7', uv: 0, amt: 2100,
    },
    {
      name: 'CN', uv: 0, amt: 2100,
    },
  ];
  return (
    <div className="statistic">
      <div className="statistic-row1">
        <div className="statistic-week">
          <div style={{height:'10%', backgroundColor:'red'}}>

          </div>
          <div  style={{height:'90%', backgroundColor:'yellow'}}>
            <BarChart
              width={500}
              height={200}
              data={data}
              margin={{
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
        <div className="statistic-month">
          month
        </div>
        <div className="statistic-balance">
          balance
        </div>
      </div>

      <div className="statistic-row2">
        <div className="statistic-year">
          statistic-year
        </div>
        <div className="total-year">
          total-year
        </div>
      </div>
      <div className="statistic-row3">
        <table>
          History
        </table>
      </div>
    </div>
  );
}

export default Statistic;