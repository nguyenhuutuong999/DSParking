import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Space,
  Button,
  Result,
  Card,
  Radio,
  Input,
  InputNumber,
  Modal,
} from "antd";

import { Text } from '../../../components/styles';

import backgroundP from "../../../img/payment.svg";
import Momo from "./../../../img/momo.png";
import VNPay from "./../../../img/vnpay.png";

import * as Style from "./styles";

const PAYMENT_VALUES = [10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000];

function Payment() {
  const [order, setOrder] = useState({
    id: 2321144726,
    value: 10000,
  });

  const [isPopUp, setIsPopUp] = useState(false);
  const [amount, setAmount] = useState(0);
  const [gateWay, setGateWay] = useState("momo");
  const [statusMess, setStatusMess] = useState(false);
  const [isPostingOrder, setIsPostingOrder] = useState(false);


  useEffect(() => {
    // get param from URL
    var url_string = window.location.href.toString();
    let url = new URL(url_string);

    //get status code from URL
    let statusCode = url.searchParams.get("status")
      ? url.searchParams.get("status")
      : null;

    //get value from URL
    let value = url.searchParams.get("value")
      ? url.searchParams.get("value")
      : null;

    if (statusCode) {
      setIsPopUp(true);
      setAmount(value);
      if (statusCode == "0") {
        setStatusMess(true);
      }
    }
  }, []);


  const onChangeValue = (value) => {
    setOrder({ ...order, value });
  };

  const onSubmit = () => {
    setIsPostingOrder(true);
    axios({
      method: "POST",
      url: `https://gateway-dtusmartparking.herokuapp.com/payment/${gateWay}`,
      data: order,
      mode: "cors",
    })
      .then(function (response) {
        window.location.replace(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setIsPostingOrder(false);
      });
  };

  const renderPaymentValue = () => {
    return PAYMENT_VALUES.map((valueItem, valueIndex) => (
      <Button
        type={order.value === valueItem ? "primary" : "default"}
        key={`value-${valueIndex}`}
        onClick={() => onChangeValue(valueItem)}
      >
        {`${valueItem.toLocaleString()}đ`}
      </Button>
    ));
  }

  return (
    <div className="container-payment">
      <Row>
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <Style.PaymentContainer>
            <Row justify="center">
              <Text xxl>TOP-UP</Text>
            </Row>
            <Input
              name="id"
              value={order.id}
              readOnly
              placeholder="Nhập ID"
              style={{ margin: '16px 0' }}
            />
            <InputNumber
              name="value"
              defaultValue={order.value}
              value={order.value}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              placeholder="Nhập số tiền"
              onChange={(value) => onChangeValue(value)}
              style={{ width: '100%' }}
            />
            <Space size={[8, 8]} wrap style={{ padding: '16px 0 24px' }}>
              {renderPaymentValue()}
            </Space>
            <Card size="small">
              <Radio.Group
                name="gateWay"
                onChange={(e) => setGateWay(e.target.value)}
                value={gateWay}
              >
                <Space direction="vertical">
                  <Radio value={"momo"}>
                    <Space>        
                      <img
                        src={Momo}
                        width="25px"
                        alt=""
                      />
                      <Text>payment by Momo wallet</Text>
                    </Space>
                  </Radio>
                  <Radio value={"vnpay"}>
                    <Space>
                      <img
                        src={VNPay}
                        height="15px"
                        alt=""
                      />
                      <Text>payment by VNPay wallet</Text>
                    </Space>
                  </Radio>
                </Space>
              </Radio.Group>
            </Card>
            <Button
              size="large"
              type="primary"
              onClick={onSubmit}
              loading={isPostingOrder}
              style={{ marginTop: 10 }}
            >
              Payment now
            </Button>
          </Style.PaymentContainer>
        </Col>
        <Col lg={{ span: 12 }} xs={{ span: 24 }} style={{ padding: "2%" }}>
          <img src={backgroundP} alt="" width="100%" />
        </Col>
        {isPopUp && (
          <Modal
            title={statusMess ? "Successfully Payment" : "500"}
            visible={isPopUp}
            onCancel={() => setIsPopUp(false)}
            footer={false}
          >
            {statusMess ? (
              <Result
                status="success"
                title="Successfully Payment"
                subTitle={"Your balance is added: " + amount}
                extra={[
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => setIsPopUp(false)}
                  >
                    Go Back
                  </Button>,
                ]}
              />
            ) : (
              <Result
                status="500"
                subTitle="Sorry, something went wrong. Please try again !!!"
                extra={[
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => setIsPopUp(false)}
                  >
                    Go Back
                  </Button>,
                ]}
              />
            )}
          </Modal>
        )}
      </Row>
    </div>
  );
}

export default Payment;
