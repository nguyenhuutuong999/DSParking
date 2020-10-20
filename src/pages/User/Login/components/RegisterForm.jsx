import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {
  UserOutlined,
  IdcardOutlined,
  CreditCardOutlined,
  QrcodeOutlined,
  LockOutlined,
} from '@ant-design/icons';

import history from '../../../../util/history';

import { DEFAULT_QR_PIN } from '../../../../constants/common';

import { firebaseApp } from '../../../../configs/firebase';

function RegisterForm() {
  const [registerForm] = Form.useForm();

  const handleRegisterEmailPassword = (values) => {
    console.log("handleRegisterEmailPassword -> values", values)
    const {
      email,
      name,
      studentCode,
      licensePlates,
      password,
      rePassword
    } = values
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("handleRegisterEmailPassword -> result", result)
        firebaseApp.database().ref(`/users/${result.user.uid}`).set({
          email: email,
          name: name,
          studentCode: studentCode,
          licensePlates: licensePlates,
          avatar: null,
          qrPin: '0000',
          role: 'user',
        }, (error) => {
          if (error) {

          } else {
            localStorage.setItem('authData', JSON.stringify({
              uid: result.user.uid,
              email: email,
              name: name,
              studentCode: studentCode,
              licensePlates: licensePlates,
              avatar: null,
              qrPin: '0000',
              role: 'user',
            }));
            history.push("/");
          }
        })

      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            registerForm.setFields([
              {
                name: 'email',
                errors: ['Email đã tồn tại'],
              }
            ])
            break;
        }
      })
  };

  return (
    <Form
      form={registerForm}
      wrapperCol={{ span: 24 }}
      name="registerForm"
      onFinish={(values) => handleRegisterEmailPassword(values)}
    >
      <Form.Item
        name="email"
        validateFirst
        rules={[
          { required: true, message: 'Bạn chưa nhập email' },
          { type: 'email', message: 'Email không đúng định dạng' },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email đăng ký"
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
      <Form.Item
        name="password"
        validateFirst
        rules={[
          { required: true, message: 'Bạn chưa nhập mật khẩu' },
          { min: 8, message: 'Mật khẩu không được nhỏ hơn 8 kí tự' },
          { max: 16, message: 'Mật khẩu không được lớn hơn 16 kí tự' },
        ]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Mật khẩu đăng ký"
        />
      </Form.Item>
      <Form.Item
        name="rePassword"
        validateFirst
        rules={[
          { required: true, message: 'Bạn chưa nhập xác nhận mật khẩu' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Mật khẩu xác nhận không khớp');
            },
          }),
        ]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Nhập lại mật khẩu"
        />
      </Form.Item>
      <Form.Item name="agree" valuePropName="checked">
        <Checkbox style={{ color: 'white' }}>Tôi đồng ý các điều khoảng</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  )
}
export default RegisterForm;