import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, Tabs, Form, Input, Select, DatePicker, Button, Space } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { firebaseApp } from './../../../configs/firebase';
import moment from 'moment';

import { Text } from '../../../components/styles';

import * as Style from './styles';

function ProfilePage() {
  const [userInfo, setUserInfo] = useState({});
  const [profileForm] = Form.useForm();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    firebaseApp.database().ref(`User/information/admin/${user.id}`)
    .on('value', (snapshot) => {
      setUserInfo(snapshot.val());
    })
  }, []);

  useEffect(() => {
    profileForm.resetFields();
  }, [userInfo.idA]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Style.ProfileCardContainer>
          <Style.ProfileCardBackground />
          <Style.ProfileAvatar>
            {userInfo.avatar && userInfo.avatar !== 'none'
              ? <img src={userInfo.avatar} width={150} height={150} alt="Avatar" />
              : <Avatar size={150} icon={<UserOutlined />} />
            }
            <Style.ChangeAvatarContainer>
              <EditOutlined style={{ fontSize: 28, color: 'white' }} />
            </Style.ChangeAvatarContainer>
          </Style.ProfileAvatar>
          <Style.ProfileCardContent>
            <Text xl headerText w6>{userInfo.name}</Text>
            <Text headerText>{userInfo.idA}</Text>
          </Style.ProfileCardContent>
        </Style.ProfileCardContainer>
      </Col>
      <Col span={18}>
        <Style.ProfileDetailContainer>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Detail" key="1">
              <Style.ProfileDetailContent>
                <Form
                  name="profileForm"
                  form={profileForm}
                  initialValues={{
                    name: userInfo.name,
                    email: userInfo.email,
                    sex: userInfo.sex,
                    birthday: moment(userInfo.birthday, 'YYYY-MM-DD'),
                    phone: userInfo.phone,
                    address: userInfo.adress,
                  }}
                  layout="vertical"
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label="NAME"
                        rules={[
                          { required: true, message: 'Required!'},
                        ]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="EMAIL"
                        rules={[
                          { required: true, message: 'Required!'},
                        ]}
                      >
                        <Input placeholder="Email" disabled />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="sex"
                        label="GENDER"
                        rules={[
                          { required: true, message: 'Required!'},
                        ]}
                      >
                        <Select placeholder="Gender">
                          <Select.Option value={1}>Male</Select.Option>
                          <Select.Option value={0}>Female</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="birthday"
                        label="BIRTHDAY"
                        rules={[
                          { required: true, message: 'Required!'},
                        ]}
                      >
                        <DatePicker placeholder="Birthday" style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="phone"
                        label="PHONE"
                        rules={[
                          { required: true, message: 'Required!'},
                        ]}
                      >
                        <Input placeholder="Phone" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="address"
                        label="ADDRESS"
                      >
                        <Input.TextArea
                          autoSize={{ minRows: 2, maxRows: 6 }}
                          placeholder="Address"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Space>
                      <Button type="primary" htmlType="submit">Save</Button>
                      <Button htmlType="reset">Reset</Button>
                    </Space>
                  </Row>
                </Form>
              </Style.ProfileDetailContent>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Setting" key="2">
              <Style.ProfileDetailContent>
                Update late
              </Style.ProfileDetailContent>
            </Tabs.TabPane>
          </Tabs>
        </Style.ProfileDetailContainer>
      </Col>
    </Row>
  );
}

export default ProfilePage;