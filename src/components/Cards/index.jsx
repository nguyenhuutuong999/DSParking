<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> dev_tuong
import './styles.css';

import { FaDollarSign, FaMotorcycle } from 'react-icons/fa';

import {
  firebaseApp,
} from '../../configs/firebase';

function Cards() {
  const [balance, setBalance] = useState({});

  useEffect(() => {
    firebaseApp.database().ref("User/parkingMan/information/idrootsv1/treasury").on('value', (snapshot) => {
      setBalance({
        ...snapshot.val(),
      })
    })
  }, [])


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
              <h6>{balance.money}</h6>
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