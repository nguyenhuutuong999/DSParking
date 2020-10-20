import React, { useEffect, useState } from 'react';
import { Space } from 'antd';

import {
  firebaseApp,
} from '../../../configs/firebase';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LoginGoogleUpdateModal from './components/LoginGoogleUpdateModal';

import './styles.css';

function LoginPage() {
  const [userData, setUserData] = useState(null);
  const [authType, setAuthType] = useState('login');
  const [isShowGoogleUpdateModal, setIsShowGoogleUpdateModal] = useState(false);
  const [googleUpdateModalData, setGoogleUpdateModalData] = useState({});

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    })
  }, []);

  return (
    <>
      <div className="login-container">
        <div className="login-background"></div>
        <div className="login-content">
          <div className="login-title">
            <h1 class="w6 white" style={{ fontSize: 48 }}>DSPARKING</h1>
            <Space style={{ margin: '24px 0 32px' }}>
              <p
                className={`xl login-switch-type ${authType === 'login' && 'active'}`}
                onClick={() => setAuthType('login')}
              >
                Đăng nhập
              </p>
              <p
                className={`xl login-switch-type ${authType === 'register' && 'active'}`}
                onClick={() => setAuthType('register')}
              >
                Đăng ký
              </p>
            </Space>
          </div>
          {authType === 'login'
            ? (
              <LoginForm
                setIsShowGoogleUpdateModal={setIsShowGoogleUpdateModal}
                setGoogleUpdateModalData={setGoogleUpdateModalData}
              />
            )
            : <RegisterForm />
          }
        </div>
      </div>
      <LoginGoogleUpdateModal
        isShowGoogleUpdateModal={isShowGoogleUpdateModal}
        setIsShowGoogleUpdateModal={setIsShowGoogleUpdateModal}
        googleUpdateModalData={googleUpdateModalData}
      />
    </>
  )
}
export default LoginPage;