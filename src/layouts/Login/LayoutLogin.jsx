import React from 'react'
import './styles.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import login from '../../img/login.svg'

function LayoutLogin() {
    return (
        
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={login} alt="Login" />
                        </div>

                        <form className="login100-form validate-form">
                            <span className="login100-form-title">
                                Member Login
                </span>

                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" forName="email" placeholder="Tên đăng nhập" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <FaEnvelope />
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="password" forName="pass" placeholder="Mật khẩu" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <FaLock />
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Login
                    </button>
                            </div>

                            <div className="text-center p-t-12">
                               
                                <a className="txt2" href="#">
                                Quên Tên đăng nhập / Mật khẩu?
                    </a>
                            </div>

                            <div className="text-center p-t-136">
                                <a className="txt2" href="#">
                                    Tạo tài khoản
                        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
    )
}
export default LayoutLogin;