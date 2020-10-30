import React from 'react';

import { LineChart, Line, ResponsiveContainer, XAxis, Legend, YAxis, Tooltip } from 'recharts';
import './styles.css'

function Statistic() {
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
  return (
    <div className="statistic">
      <div className="row">     
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <select name="year" id="input-state" className="form-control">
            <option value={0}>Year</option>
              <option value={1999}>2019</option>
              <option value={2020}>2020</option>
            </select>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <select name="" id="input-state" className="form-control">
            <option value={0}>Month</option>
              <option value={1}>Jan</option>
              <option value={2}>Feb</option>
              <option value={3}>Mar</option>
              <option value={4}>Apr</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>Aug</option>

              <option value={9}>Sept</option>
              <option value={10}>Oct</option>
              <option value={11}>Nov</option>
              <option value={12}>Dec</option>
            </select>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <select  name="day" id="input-state" className="form-control">
            <option value={0}>Day</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
              <option value={30}>30</option>
              <option value={31}>31</option>
            </select>
          </div>
          
      
        </div>
        
        
        <div class="col-xs-12">
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
        </div>
        
       

    
   
  )
}
export default Statistic;