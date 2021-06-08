import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Tabs,
} from "antd";
import { UserOutlined } from '@ant-design/icons';

import { Text } from '../../../components/styles';

import * as Style from "./styles";

const { TextArea } = Input;
function Support() {
  return (
    <Style.SupportContainer>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="User manual" key="1">
          <Style.SupportContent>
            <Text lg w6>1. Log in:</Text>
            <Text style={{ marginBottom: 16 }}>User uses an existing myDTU account to log into DSParking system.</Text>
            <Text lg w6>2. Function to change / get QR Code:</Text>
            <Text style={{ marginBottom: 16 }}>In the menu bar, click <UserOutlined /> ‘Profile’ to get the code (for first use) / change the code (for subsequent uses).</Text>
            <Text lg w6>3. Top up / Link bank accounts:</Text>
            <Text>To do this you need to go to the ticket counter at the security gate to deposit moneyinto your account.</Text>
          </Style.SupportContent>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Report problem" key="2">
          <Style.SupportContent>
            <Form
              colon={false}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 11 }}
            >
              <Form.Item
                name="name"
                label="Name of the problem"
                rules={[{ required: true, message: 'Name of the problem is required!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="time"
                label="The period of time it happened"
                rules={[{ required: true, message: 'Time of the problem is required!' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="description"
                label="Detailed description"
                rules={[{ required: true, message: 'Description is required!' }]}
              >
                <TextArea style={{ height: "100px" }} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 9, span: 11 }}>
                <Button htmlType="submit" type="primary">Send</Button>
              </Form.Item>
            </Form>
          </Style.SupportContent>
        </Tabs.TabPane>
      </Tabs>
      <Style.SupportFooter>
        <Row>
          <Col flex="130px">
            <Text lg w6 primaryColor>Urgent contact:</Text>
          </Col>
          <Col flex="auto">
            <Text><strong>0905264265</strong> - htsung@duytan.edu.vn (Mr.Sung)</Text>
            <Text><strong>0935009473</strong> - nguyentanphat@duytan.edu.vn (Mr.Phat)</Text>
          </Col>
        </Row>
      </Style.SupportFooter>
    </Style.SupportContainer>
  );
}

export default Support;
