import React, { useEffect } from 'react'
import './styles.css'

import withFirebaseAuth from 'react-with-firebase-auth';

import { FaEnvelope, FaLock } from 'react-icons/fa';

import login1 from '../../../img/login1.svg'
import history from '../../../util/history'

import {
  firebaseApp,
  firebaseAppAuth,
  firebaseAppProviders,
} from '../../../configs/firebase'

function Login({
  user,
  signOut,
  signInWithGoogle,
}) {
  console.log("Login -> user", user)

  useEffect(() => {
    if (user) {
      const {
        uid,
        displayName: name,
        email,
        photoURL: avatar,
      } = user;
      firebaseApp.database().ref(`/users/${uid}`).on('value', (snapshot) => {
        if (!snapshot.val()) {
          if (window.confirm('Tai khoan moi ?')) {
            firebaseApp.database().ref(`/users/${uid}`).set({
              email,
            })
          } else {
            signOut();
          }
        } else {
          localStorage.setItem('authData', JSON.stringify({
            uid,
            name,
            email,
            avatar,
          }));
          history.push('/');
        }
        console.log(snapshot.val());
      })
    }
  }, [user]);

  const handleLogin = () => {
    signInWithGoogle();
  }
  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div class="custom-shape-divider-bottom-1601955910">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
          </div>
          <img src={login1} alt="Login" className="img-login" />

          <p className="text-dsparking">DSPARKING</p>

          <div className="form-login">

            <p>Remember Login </p>

            <form className="login100-form validate-form">
              <div className="wrap-input100 validate-input">
                <input className="input100" type="text" forName="email" placeholder="Tên đăng nhập" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <FaEnvelope />
                </span>
              </div>

              <div className="wrap-input100 validate-input">
                <input className="input100" type="password" forName="pass" placeholder="Gmail" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <FaLock />
                  {/* <img src={gmail}/> */}
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="button" onClick={() => handleLogin()}>
                  Login
                    </button>
              </div>
              <div className="login-text">
                <div>
                  <span className="txt1">
                    Quên 
                  </span>
                  <a className="txt2" href="#">
                    Tên đăng nhập / Mật khẩu?
                        </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default withFirebaseAuth({
  providers: firebaseAppProviders,
  firebaseAppAuth,
})(Login);