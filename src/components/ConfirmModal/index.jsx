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
        title="Delete"
        visible={isShowModal} onHide={handleHideModal}
        // footer={false}
        onOk={handleDeleteNotifications}
        onCancel={handleHideModal}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure want to delete? </p>
      </Modal>
    </>
  )
}
export default ConfirmModal;