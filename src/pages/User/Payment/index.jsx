import React, { useState, useEffect } from "react";
import "./styles.css";
import backgroundP from "../../../img/payment.svg";
import axios from "axios";
import { Row, Col, Radio, Button, Result, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Momo from "./../../../img/momo.png";
import VNPay from "./../../../img/vnpay.png";

function Payment() {
  const [order, setOrder] = useState({
    id: 2321144726,
    value: 10000,
  });

  const [isPopUp, setIsPopUp] = useState(false);
  const [amount, setAmount] = useState(0);
  const [gateway, setGateWay] = useState('momo');
  const [statusMess, setStatusMess] = useState(false);
  const [isPostingOrder, setIsPostingOrder] = useState(false)
  const onChangeValue = (e) => {
    setOrder({ ...order, value: e.target.value });
  };
  useEffect(() => {
    // get param from URL
    var url_string = window.location.href.toString();
    let url = new URL(url_string);

    //get status code from URL
    let statusCode = url.searchParams.get("status") ? url.searchParams.get("status") : null;

    //get value from URL
    let value = url.searchParams.get("value") ? url.searchParams.get("value") : null;

    if (statusCode) {
      setIsPopUp(true);
      setAmount(value);
      if (statusCode == '0') {
        setStatusMess(true);
      }
    }
  }, []);

  const onSubmit = () => {

    setIsPostingOrder(true)
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
      }).finally(() => {
        setIsPostingOrder(false)
      })

  };
  return (
    <div className="container-payment">
      <Row justify="center" align="middle">
        <Col justify="center" align="middle" span={12} style={{ background: 'white', padding: 30 }}>
          <p className="title-payment">TOP-UP</p>
          <div className="input-payment">
            <input
              placeholder="ID"
              className="input"
              type="number"
              onwheel="this.blur()"
              value="2321144726"
              //onChange={(e) => setOrder({ ...order, value: e.target.value })}
              style={{ height: '35px' }}
            />

            <input
              placeholder="Enter value"
              className="input"
              type="number"
              onwheel="this.blur()"
              value={order.value}
              onChange={(e) => setOrder({ ...order, value: e.target.value })}
              style={{ height: '35px' }}
            />

          </div>

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

          <div className="checkout-button" onChange={(e) => setGateWay(e.target.value)}>
            <div
              className="wrapper-radio"
              style={{ display: "flex", alignItems: "center", marginBottom: '15px' }}
            >
              <input type="radio" checked={gateway === 'momo'} value="momo" name="gateway" />
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
                  style={{ marginLeft: "10px", width: '12%' }}
                />
              </div>
            </div>
            <div
              className="wrapper-radio"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input type="radio" checked={gateway == 'vnpay'} value="vnpay" name="gateway" />
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
                  style={{ marginLeft: "10px", width: '15%' }}
                />
              </div>
            </div>
          </div>

          <Button type="primary" onClick={onSubmit} style={{ borderRadius: 5, marginTop: 10 }} >
            Payment
          {isPostingOrder && <LoadingOutlined />}

          </Button>

        </Col>
        <Col span={12} style={{ padding: '2%' }}>
          <img className="img-bg" src={backgroundP} />
        </Col>
        {isPopUp && (
          <div className="mess-container">

            {statusMess ?
              <Result
                status="success"
                title="Successfully Payment"
                subTitle={"Your balance is added: " + amount}
                extra={[
                  <Button type="primary" key="console" onClick={() => setIsPopUp(false)}>
                    Go Back
               </Button>
                ]}
              /> :
              <Result
                status="500"

                subTitle="Sorry, something went wrong. Please try again !!!"
                extra={[
                  <Button type="primary" key="console" onClick={() => setIsPopUp(false)}>
                    Go Back
                  </Button>
                ]}
              />
            }
          </div>
        )}
      </Row>
    </div>
  );
}

export default Payment;
