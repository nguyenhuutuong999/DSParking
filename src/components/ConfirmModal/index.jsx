import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function ConfirmModal({
  isShowModal,
  handleHideModal,
  handleDeleteNotifications,
}) {
  return (
    <>
      <Modal
        title="Xóa"
        visible={isShowModal} onHide={handleHideModal}
        // footer={false}
        onOk={handleDeleteNotifications}
        onCancel={handleHideModal}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Nộp tiền vào tài khoản !!! </p>

      </Modal>
    </>
  )
}
export default ConfirmModal;