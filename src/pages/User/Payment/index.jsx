import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./styles.css";
import backgroundP from "../../../img/payment.svg";
import { Radio } from "antd";
import axios from "axios";
import history from "../../../util/history";
import { firebaseApp } from "../../../configs/firebase";

function Payment() {
  const [order, setOrder] = useState({
    id: 2321144726,
    value: 10000,
  });

  const [isPopUp, setIsPopUp] = useState(false);
  const [amount, setAmount] = useState(0);
  const [statusMess, setStatusMess] = useState(false);
  const onChangeValue = (e) => {
    setOrder({ ...order, value: e.target.value });
  };
  useEffect(() => {
    var url_string = window.location.href.toString();
    let url = new URL(url_string);
    let statusCode = url.searchParams.get("errorCode");
    let amount = url.searchParams.get("amount");

    if (statusCode) {
      setIsPopUp(true);
      setAmount(amount);
      if (statusCode == 0) {
        firebaseApp
          .database()
          .ref("User/information/parkingMan/idrootsv1")
          .once("value", (snapshot) => {
            //console.log(snapshot.val().money);
            firebaseApp
              .database()
              .ref("User/information/parkingMan/")
              .child("idrootsv1")
              .update({
                money: (
                  parseInt(snapshot.val().money) + parseInt(amount)
                ).toString(),
              });
          });

          firebaseApp
          .database()
          .ref("History/parkingMan/moneyTopUp")
          .child("idrootsv1")
          .set({
            idPay: Date.now().toString(36) + Math.random().toString(36).substr(2),
            value: parseInt(amount).toString(),
            createAt: Date.now().toLocaleString(),
            method: 1,
            isNoti: false,
            fee: 0,
          });

        setStatusMess(true);
      }
    }
  }, []);
  const onSubmit = () => {
    axios
      .post("http://localhost:3001/payment/create", order)
      .then(function (response) {
        // http://localhost:3000/?partnerCode=MOMOSDEI20201203&accessKey=ArJY3B0zEJuJlaID&requestId=ae4314c0-a731-11eb-b56f-f1d8d2e6f484&amount=50000&orderId=ae42edb0-a731-11eb-b56f-f1d8d2e6f484&orderInfo=pay%20with%20MoMo&orderType=momo_wallet&transId=2510789992&message=Success&localMessage=Th%C3%A0nh%20c%C3%B4ng&responseTime=2021-04-27%2015:26:36&errorCode=0&payType=qr&extraData=merchantName=;merchantId=&signature=c88bd277af26b20ef34c3d11eae23650738e9d48c72ee09039f6af374df65c15
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
              id="fname"
              name="fname"
              value={order.value}
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
        <div className="checkout-button">
          <div
            className="wrapper-radio"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input type="radio" value="momo" name="gateway" />
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
                src="https://developers.momo.vn/images/logo.png"
                width="25"
                style={{ marginLeft: "10px" }}
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
