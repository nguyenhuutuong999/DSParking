import React from 'react';
import './styles.css';

function Statistic() {
  return (
    <div className="statistic">
      <div className="statistic-row1">
        <div className="statistic-week">
            week
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