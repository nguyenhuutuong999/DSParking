import React, { useState, useEffect } from "react";
import "./styles.css";
import backgroundP from "../../../img/payment.svg";
import { Radio } from "antd";
import axios from "axios";

import Momo from "./../../../img/momo.png"
import VNPay from "./../../../img/vnpay.png"

function Payment() {
  const [order, setOrder] = useState({
    id: 2321144726,
    value: 10000,
  });

  const [isPopUp, setIsPopUp] = useState(false);
  const [amount, setAmount] = useState(0);
  const [gateway, setGateWay] = useState('momo');
  const [statusMess, setStatusMess] = useState(false);
  const onChangeValue = (e) => {
    setOrder({ ...order, value: e.target.value });
  };
  useEffect(() => {

    // get param from URL
    var url_string = window.location.href.toString();
    let url = new URL(url_string);

    //get status code from URL
    let statusCode = url.searchParams.get("status") ? url.searchParams.get("status") :  null;

    //get value from URL
    let value = url.searchParams.get("value") ? url.searchParams.get("value") :  null;

    if (statusCode) {
      setIsPopUp(true);
      setAmount(value);
      if (statusCode == '0') {
        setStatusMess(true);
      }
    }
  }, []);

  const onSubmit = () => {
    axios({
      method: 'POST',
      url: `https://gateway-dtusmartparking.herokuapp.com/payment/${gateway}`,
      data: order,
      mode: 'cors'
    })
    .then(function (response) {
      window.location.replace(response.data);
     })
     .catch(function (error) {
       console.log(error);
     });
  };
  return (

    <div className="container-payment">
      <div className="contents">
        <p className="title-payment">TOP-UP</p>
        <div className="input-payment">
          <div className="wrapper-input">
            <label className="title-input">Your ID: 2321144726</label>
          </div>
          <div className="wrapper-input">
            <input
              placeholder="Enter value"
              className="input"
              type="number"
              onwheel="this.blur()"
              value={order.value}
              onChange={(e) => setOrder({ ...order, value: e.target.value })}
              style = {{height:'36px'}}
            ></input>
          </div>
        </div>
        <div className="selector">
          <Radio.Group
            className="group-radio"
            onChange={onChangeValue}
            value={order.value}
            optionType="button"
          >
            <Radio.Button className="button-radio" value={10000}>
              10.000đ
            </Radio.Button>
            <Radio.Button className="button-radio" value={20000}>
              20.000đ
            </Radio.Button>
            <Radio.Button className="button-radio" value={30000}>
              30.000đ
            </Radio.Button>
            <Radio.Button className="button-radio" value={50000}>
              50.000đ
            </Radio.Button>
            <Radio.Button className="button-radio" value={100000}>
              100.000đ
            </Radio.Button>
            <Radio.Button className="button-radio" value={200000}>
              200.000đ
            </Radio.Button>
            <Radio.Button className="button-radio" value={300000}>
              300.000đ
            </Radio.Button>
            <Radio.Button className="button-radio" value={500000}>
              500.000đ
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="checkout-button" onChange = {(e) => setGateWay(e.target.value)}>
          <div
            className="wrapper-radio"
            style={{ display: "flex", alignItems: "center", marginBottom: '15px' }}
          >
            <input type="radio" checked = {gateway === 'momo'} value="momo" name="gateway"  />
            <div
              className="content"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <span className="checkout-title">Payment by Momo Wallet</span>
              <img
                 src={Momo}
                width="25"
                style={{ marginLeft: "10px", width:'12%'}}
              />
            </div>
          </div>
          <div
            className="wrapper-radio"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input type="radio" checked = {gateway == 'vnpay'} value="vnpay" name="gateway" />
            <div
              className="content"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <span className="checkout-title">Payment by VNPay</span>
              <img
                src={VNPay}
                width="25"
                style={{ marginLeft: "10px", width:'15%' }}
              />
            </div>
          </div>
        </div>
        <div className="wrapper-btn-payment">
          <button className="btn-payment" onClick={onSubmit}>
            Payment
          </button>
        </div>
      </div>

      <div className="background-payment">
        <img className="img-bg" src={backgroundP} />
      </div>
      {isPopUp && (
        <div className="mess-container">
          <div className="mess-wrapper">
            <div
              className="mess-title"
              style={{ color: statusMess ? "#8BC34A" : "#F15E5E" }}
            >
              {statusMess ? `Payment Successful !!!` : `Payment Failed !!!`}
            </div>
            <div className="mess-content">
              {statusMess
                ? `Your account has been added ${amount}đ`
                : `Please try again...`}
            </div>
            <button
              className="btn-successful"
              style={{ background: statusMess ? "#8BC34A" : "#F15E5E" }}
              onClick={() => setIsPopUp(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
