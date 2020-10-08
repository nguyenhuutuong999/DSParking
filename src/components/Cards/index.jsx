import React, { useState } from 'react';
import './styles.css';

import { FaDollarSign, FaMotorcycle, FaLocationArrow } from 'react-icons/fa';


function Cards() {
  return (
    <div>
      <div className="card-list">
        <div className="card-items">
          <div className="cards">
            <div className="card-left" style={{ backgroundColor: "#eb6709" }}>
              <FaDollarSign />
            </div>
            <div className="card-right">
              <h5>SỐ DƯ</h5>
              <h6>5000</h6>
            </div>
          </div>
        </div>

        <div className="card-items">
          <div className="cards">
            <div className="card-left" style={{ backgroundColor: "#ff4c52" }}>
              <FaMotorcycle />
            </div>
            <div className="card-right">
              <h5>LƯỢT GỬI / Tuần</h5>
              <h6>5000</h6>
            </div>
          </div>
        </div>

        <div className="card-items">
          <div className="cards">
            <div className="card-left" style={{ backgroundColor: "#11c26d" }}>
              <FaMotorcycle />
            </div>
            <div className="card-right">
              <h5>LƯỢT GỬI / Tháng</h5>
              <h6>5000</h6>
            </div>
          </div>
        </div>

        <div className="card-items">
          <div className="cards">
            <div className="card-left" style={{ backgroundColor: "#3e8ef7" }}>
              <FaLocationArrow />
            </div>
            <div className="card-right">
              <h5>LƯỢT GỬI / Tháng</h5>
              <h6>5000</h6>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Cards;