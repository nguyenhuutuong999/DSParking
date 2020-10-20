import React from "react";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import history from "../../../../util/history";

import { firebaseApp, firebaseProviders } from "../../../../configs/firebase";

function LoginForm({
  setIsShowGoogleUpdateModal,
  setGoogleUpdateModalData,
}) {
  const [loginForm] = Form.useForm();

  const handleLoginEmailPassword = (values) => {
    const { email, password } = values;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        firebaseApp.database().ref(`/users/${result.user.uid}`).once('value')
        .then((snapshot) => {
          console.log(snapshot.val())
          const snapshotValue = snapshot.val();
          localStorage.setItem('authData', JSON.stringify({
              uid: result.user.uid,
              email: snapshotValue.email,
              name: snapshotValue.name,
              studentCode: snapshotValue.studentCode,
              licensePlates: snapshotValue.licensePlates,
              avatar: snapshotValue.avatar,
              qrPin: snapshotValue.qrPin,
              role: snapshotValue.role,
          }))
          history.push("/")
          })
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const handleLoginWithGoogle = () => {
    firebaseApp
      .auth()
      .signInWithPopup(firebaseProviders.googleProvider)
      .then((result) => {
        const { uid, email, displayName, photoURL } = result.user;
        if (result.additionalUserInfo.isNewUser) {
          setIsShowGoogleUpdateModal(true);
          setGoogleUpdateModalData({
            uid,
            email,
            name: displayName,
            avatar: photoURL,
          });
        } else {
          firebaseApp.database().ref(`/users/${result.user.uid}`)
            .once("value")
            .then((snapshot) => {
              const snapshotValue = snapshot.val();
              const { email, name, avatar, studentCode, licensePlates, qrPin, role } = snapshotValue;
              localStorage.setItem("authData", JSON.stringify({
                uid: result.user.uid,
                email,
                name,
                studentCode,
                licensePlates,
                avatar,
                qrPin,
                role,
              }));
              history.push("/");
            });
        }
      });
  };

  return (
    <Form
      form={loginForm}
      wrapperCol={{ span: 24 }}
      colon={false}
      name="loginForm"
      onFinish={(values) => handleLoginEmailPassword(values)}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Bạn chưa nhập email" }]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Bạn chưa nhập mật khẩu" }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" size="large" block>
          Đăng nhập
        </Button>
        <p className="white" style={{ margin: "8px 0", textAlign: "center" }}>
          Hoặc
        </p>
        <Button
          htmlType="button"
          size="large"
          onClick={() => handleLoginWithGoogle()}
          icon={<GoogleOutlined />}
          block
        >
          Đăng nhập bằng Google
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
