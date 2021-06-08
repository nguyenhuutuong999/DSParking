import React, { useEffect } from "react";
import { Row, Col, Modal, Form, Input, Select, DatePicker } from "antd";
import moment from 'moment';

function EditAccountModal({
  setIsShowEditModal,
  isShowEditModal,
  modifyAccountData
}) {
  console.log('🚀 ~ file: EditAccountModal.jsx ~ line 10 ~ modifyAccountData', modifyAccountData);
  const [editAccountForm] = Form.useForm();

  useEffect(() => {
    if (modifyAccountData.id) {
      editAccountForm.resetFields();
    }
  }, [modifyAccountData.id]);

  return (
    <Modal
      title="Edit account"
      visible={isShowEditModal}
      onCancel={() => setIsShowEditModal(false)}
      okText="Save"
    >
      <Form
        name="editAccountForm"
        form={editAccountForm}
        initialValues={{
          name: modifyAccountData.name,
          email: modifyAccountData.email,
          idStudent: modifyAccountData.idStudent,
          identityCard: modifyAccountData.identityCard,
          gender: modifyAccountData.gender,
          birthday: moment(modifyAccountData.birthday, 'YYYY-MM-DD'),
          phone: modifyAccountData.phone,
          address: modifyAccountData.address,
          ward: modifyAccountData.ward,
          district: modifyAccountData.district,
          city: modifyAccountData.city,
          country: modifyAccountData.country,
        }}
        layout="vertical"
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="NAME"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="EMAIL"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input placeholder="Email" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="idStudent" label="STUDENT CODE">
              <Input placeholder="Student code" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="identityCard" label="IDENTITY CARD">
              <Input placeholder="Identity card" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="sex"
              label="GENDER"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Select placeholder="Gender">
                <Select.Option value={"Male"}>Male</Select.Option>
                <Select.Option value={"Female"}>Female</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="birthday"
              label="BIRTHDAY"
              rules={[{ required: true, message: "Required!" }]}
            >
              <DatePicker placeholder="Birthday" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phone"
              label="PHONE"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item name="address" label="ADDRESS">
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="ward" label="WARD">
              <Input placeholder="Ward" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="district" label="DISTRICT">
              <Input placeholder="District" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="city" label="CITY">
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="country" label="COUNTRY">
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default EditAccountModal;
