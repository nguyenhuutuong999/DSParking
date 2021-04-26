import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import backgroundP from "../../../img/payment.svg";
import { Radio } from "antd";

function Payment() {
  const [value, setValue] = useState(10000);

  const onChangeValue = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="container">
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
              id="fname"
              name="fname"
              value={value}
            ></input>
          </div>
        </div>
        <div className="selector">
          <Radio.Group
            className="group-radio"
            onChange={onChangeValue}
            value={value}
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
        <div className="checkout-button">
          <div
            className="wrapper-radio"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input type="radio" value="momo" name="gateway" />
            <div
              class="content"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <span class="checkout-title">Payment by Momo Wallet</span>
              <img
                src="https://developers.momo.vn/images/logo.png"
                width="25"
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
          <div
            className="wrapper-radio"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input type="radio" value="momo" name="gateway" />
            <div
              class="content"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <span class="checkout-title">Payment by Momo Wallet</span>
              <img
                src="https://developers.momo.vn/images/logo.png"
                width="25"
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
        </div>
        <button className="btn-payment">Payment</button>
      </div>

      <div className="background-payment">
        <img className="img-bg" src={backgroundP} />
      </div>
    </div>
  );
}

export default Payment;
