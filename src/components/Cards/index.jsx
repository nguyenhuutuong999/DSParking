import React, { useState } from 'react';
import './styles.css';

import { FaDollarSign, FaMotorcycle, FaLocationArrow } from 'react-icons/fa';


function Cards() {
  return (
    <div>
      <div className="card-list">
        <div className="card-items">
          <div className="cards">
            <div className="card-left" style={{ backgroundColor: "#e2a03f" }}>
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
            <div className="card-left" style={{ backgroundColor: "#e7515a" }}>
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
            <div className="card-left" style={{ backgroundColor: "rgb(89 50 151 / 87%)" }}>
              <FaMotorcycle />
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