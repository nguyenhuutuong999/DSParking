import React, { useEffect } from 'react';
import { Modal, Form, Input, Checkbox, Button } from 'antd';
import {
  UserOutlined,
  IdcardOutlined,
  CreditCardOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';

import history from '../../../../util/history';

import { DEFAULT_QR_PIN } from '../../../../constants/common';

import {
  firebaseApp,
} from '../../../../configs/firebase';

function LoginGoogleUpdateModal({
  isShowGoogleUpdateModal,
  setIsShowGoogleUpdateModal,
  googleUpdateModalData
}) {
  const [loginGoogleUpdateForm] = Form.useForm();

  useEffect(() => {
    loginGoogleUpdateForm.resetFields();
  }, [googleUpdateModalData])

  const googleUpdateInfoInitialValues = {
    email: googleUpdateModalData.email,
    name: googleUpdateModalData.name,
  };

  const handleUpdateUserInfo = (values) => {
    const {
      name,
      studentCode,
      licensePlates,
    } = values;
    firebaseApp.database().ref(`/users/${googleUpdateModalData.uid}`).set({
      email: googleUpdateModalData.email,
      name,
      studentCode,
      licensePlates,
      avatar: googleUpdateModalData.avatar,
      qrPin: DEFAULT_QR_PIN,
      role: 'user',
      money: 0,
    }, (error) => {
      if (error) {
        // The write failed...
      } else {
        localStorage.setItem('authData', JSON.stringify({
          uid: googleUpdateModalData.uid,
          email: googleUpdateModalData.email,
          name,
          studentCode,
          licensePlates,
          avatar: googleUpdateModalData.avatar,
          qrPin: DEFAULT_QR_PIN,
          role: 'user',
          money: 0,
        }));
        history.push('/');
      }
    });
  };

  const handleCancelUpdateInfo = () => {
    firebaseApp.auth().currentUser
      .delete()
      .then(() => {
        firebaseApp.auth().signOut();
        setIsShowGoogleUpdateModal(false);
      });
  }

  return (
    <Modal
      title="Cập nhật thông tin"
      visible={isShowGoogleUpdateModal}
      centered
      width={400}
      closable={false}
      footer={false}
    >
      <Form
        form={loginGoogleUpdateForm}
        wrapperCol={{ span: 24 }}
        name="loginGoogleUpdateForm"
        initialValues={googleUpdateInfoInitialValues}
        onFinish={(values) => handleUpdateUserInfo(values)}
      >
        <Form.Item name="email">
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email đăng ký"
            disabled
          />
        </Form.Item>
        <Form.Item
          name="name"
          validateFirst
          rules={[
            { required: true, message: 'Bạn chưa nhập tên' },
            { min: 4, message: 'Tên của bạn phải lớn hơn 4 kí tự' },
            { max: 30, message: 'Tên của bạn phải nhỏ hơn 30 kí tự' },
          ]}
        >
          <Input
            size="large"
            prefix={<IdcardOutlined className="site-form-item-icon" />}
            placeholder="Họ và tên"
          />
        </Form.Item>
        <Form.Item
          name="studentCode"
          rules={[{ required: true, message: 'Bạn chưa nhập mã số sinh viên' }]}
        >
          <Input
            size="large"
            prefix={<CreditCardOutlined className="site-form-item-icon" />}
            placeholder="Mã số sinh viên"
          />
        </Form.Item>
        <Form.Item
          name="licensePlates"
          rules={[{ required: true, message: 'Bạn chưa nhập biển số xe' }]}
        >
          <Input
            size="large"
            prefix={<QrcodeOutlined className="site-form-item-icon" />}
            placeholder="Biển số xe"
          />
        </Form.Item>
        <Form.Item name="agree" valuePropName="checked">
          <Checkbox>Tôi đồng ý các điều khoảng</Checkbox>
        </Form.Item>
        <div className="google-update-action">
          <Button
            htmlType="button"
            size="large"
            danger
            onClick={() => handleCancelUpdateInfo()}
          >
            Hủy
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
          >
            Đăng ký
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
export default LoginGoogleUpdateModal;