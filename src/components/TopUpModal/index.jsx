import React from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';

function TopUpModal({
  isShowModal,
  handleHideModal,
  handleTopUp,
  topUpForm
}) 
{
  return (
    <>
      <Modal
        title="Nạp tiền"
        visible={isShowModal} onHide={handleHideModal}
        footer={null}
      >
        <Form
           form={topUpForm}
        >
          <Form.Item
            label="Số Seri:"
            name="seriNumber"
            rules={[{ required: true, message: 'Vui lòng nhập số Seri!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số tiền:"
            name="money"
            rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                onClick={(value) => {handleTopUp()}}
                >
                  Nạp
              </Button>
              <Button type="danger" onClick={() => {handleHideModal()}}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default TopUpModal;