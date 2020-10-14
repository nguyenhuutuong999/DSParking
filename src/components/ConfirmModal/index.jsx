import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function ConfirmModal({
  isShowModal,
  handleHideModal,
  handleDeleteNotifications,
  modalData
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
        <p>Bạn có chắc chắn muốn xóa thông báo này?</p>
      </Modal>
    </>
  )
}
export default ConfirmModal;