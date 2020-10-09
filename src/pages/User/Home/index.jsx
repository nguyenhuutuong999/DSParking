import React from 'react';
import './styles.css'


function Account() {
  return (
    <div className="home">
      <div className="home-left">
        <div className="home-statistic">
          <div className="home-statistic-week">
            Weeks
          </div>
          <div className="home-statistic-month">
            Month
          </div>
        </div>
        <div className="home-history">
          History
        </div>
      </div>
      <div className="home-right">
        <div className="home-user">
          User Info
          </div>
        <div className="home-qrcode">
          qrcode
          </div>
      </div>
    </div>
  )
}
export default Account;