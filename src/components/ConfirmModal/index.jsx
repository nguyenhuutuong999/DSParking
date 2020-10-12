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
      >
        <p>Bạn có chắc chắn muốn xóa thông báo này?</p>
        <Button type="primary" ghost onClick={() => handleHideModal()}>
          Hủy
        </Button>
        <Button type="submit" type="primary" danger onClick={() => handleDeleteNotifications(modalData.index)} >
          Xác nhận
        </Button>
      </Modal>
    </>
  )
}
export default ConfirmModal;