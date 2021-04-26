import React from "react";
import styled from "styled-components";
import './styles.css';
import backgroundP from "../../../img/payment.svg";

function Payment() {
  return (
    <div className = "container">
      <div className = "contents">
        <p className = 'title-paymentaaaa'>Top-Up Card</p>
        <div className = "selector">
          <div className = "section-option">
            
          </div>
        </div>
      </div>
      <div className = "background-payment">
      <img className="img-bg" src={backgroundP} />
      </div>
    </div>

  )

}

export default Payment;