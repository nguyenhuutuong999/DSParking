import React from "react";
import { Modal, Form, Input } from "antd";

function AddAccountModal({ setIsShowAddModal, isShowAddModal }) {
  return (
    <Modal
      title="Add account"
      visible={isShowAddModal}
      onCancel={() => setIsShowAddModal(false)}
      okText="Add"
    >
      <Form
        name="addAccountForm"
        initialValues={{}}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="EMAIL"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddAccountModal;
