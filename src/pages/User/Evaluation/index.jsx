import React from "react";
import {
  Row,
  Radio,
  Button,
  Input,
  Tabs,
  Collapse,
  Space,
} from "antd";

import { Text } from '../../../components/styles';

import * as Style from './styles'

function Evaluation() {
  return (
    <Style.EvaluationContainer>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="System Evaluation" key="1">
          <Style.EvaluationContent>
            <Text lg w6>FEEDBACK OF USER ON THE SYSTEM</Text>
            <Text>In order to improve the quality more and better, we want you to
              evaluate the system, and if you have any comments, please fill
              out and rate according to the form below:</Text>
            <Collapse
              defaultActiveKey={['1', '2', '3', '4', '5']}
              style={{ margin: '16px 0' }}
            >
              <Collapse.Panel
                header="QRCode scanning speed when come in / come out the port:"
                key="1"
              >
                <Radio.Group>
                  <Space size={48}>
                    <Radio value={1}>Poor</Radio>
                    <Radio value={2}>Average</Radio>
                    <Radio value={3}>Good</Radio>
                    <Radio value={4}>Very good</Radio>
                  </Space>
                </Radio.Group>
              </Collapse.Panel>
              <Collapse.Panel header="Web response speed of DSParking:" key="2">
                <Radio.Group>
                  <Space size={48}>
                    <Radio value={1}>Poor</Radio>
                    <Radio value={2}>Average</Radio>
                    <Radio value={3}>Good</Radio>
                    <Radio value={4}>Very good</Radio>
                  </Space>
                </Radio.Group>
              </Collapse.Panel>
              <Collapse.Panel header="The response speed of the DSParking app:" key="3">
                <Radio.Group>
                  <Space size={48}>
                    <Radio value={1}>Poor</Radio>
                    <Radio value={2}>Average</Radio>
                    <Radio value={3}>Good</Radio>
                    <Radio value={4}>Very good</Radio>
                  </Space>
                </Radio.Group>
              </Collapse.Panel>
              <Collapse.Panel header="User-friendly app interface:" key="4">
                <Radio.Group>
                  <Space size={48}>
                    <Radio value={1}>Poor</Radio>
                    <Radio value={2}>Average</Radio>
                    <Radio value={3}>Good</Radio>
                    <Radio value={4}>Very good</Radio>
                  </Space>
                </Radio.Group>
              </Collapse.Panel>
              <Collapse.Panel header="Your comment" key="5">
                <Input size="large" bordered={false} placeholder="Your comment" />
              </Collapse.Panel>
            </Collapse>
            <Row justify="center">
              <Button type="primary" size="large">Send</Button>
            </Row>
          </Style.EvaluationContent>
        </Tabs.TabPane>
      </Tabs>
    </Style.EvaluationContainer>
  );
}
export default Evaluation;
