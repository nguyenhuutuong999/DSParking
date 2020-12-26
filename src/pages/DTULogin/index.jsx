import React, {useState} from "react";
import { connect } from "react-redux";
import * as actions from "./../../redux/actions/index";

import "./styles.css";

function DTULoginPage(props) {
  const [account, setAccount] = useState({
    user: "luongpthanhdat",
    pass: "matkhau123",
    mess: true,
  });

  function handleChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    setAccount({ ...account, [name]: value });
  }
  function onSubmit(event) {
    event.preventDefault();
    props.loginRequest(account);
  }
  return (
    <div id="main-panel">
      <div id="updProgress" className="clickSignIn" style={{ display: "none" }}>
        <img src="../images/ajax-loader-1.gif" />
        Đang đăng nhập...
      </div>
      <div id="UpdatePassUpdatePanel">
        <div id="panel">
          <div className="screen">
            <img
              src="MasterPages/images/phone-screen.png"
              className="mobile"
              alt=""
              title="View Mobile Devices Screen"
            />
            <img
              src="MasterPages/images/desktop_screen3.png"
              className="desktop"
              alt=""
              title="View Desktop Screen"
            />
          </div>
          <div id="login">
            <div id="top">
              <div id="logo">
                <a href="#">Đại học Duy Tân</a>
              </div>
              <div id="language">
                <a
                  className="forgotpass"
                  href="Modules/portal/ForgotPassword.aspx"
                  target="_blank"
                  title="Quên Mật khẩu?"
                >
                  Quên Mật khẩu?
                </a>{" "}
                <a
                  className="feedback"
                  href="Modules/portal/Feedback.aspx"
                  target="_blank"
                  title="Gửi Góp ý"
                >
                  Góp ý
                </a>
                <a
                  className="vn active"
                  href="/signin.aspx?lang=vn"
                  title="Tiếng Việt"
                >
                  Tiếng Việt
                </a>
                <a
                  className="en "
                  href="/signin.aspx?lang=en"
                  title="English language"
                >
                  English
                </a>
              </div>
            </div>
            <div id="main">
              <div id="application">
                <ul>
                  <li className="title">Đăng nhập với:</li>
                  <li className="portal">
                    <input
                      value="1"
                      name="radType"
                      type="radio"
                      id="Radio1"
                      checked="checked"
                    />
                    <span id="Span1">Portal</span>
                  </li>
                  <li className="gmail">
                    <input value="2" name="radType" type="radio" id="Radio2" />
                    <span id="Span2">Gmail</span>
                  </li>
                  <li className="elearning">
                    <input value="3" name="radType" type="radio" id="Radio3" />
                    <span id="Span3">Learning</span>
                  </li>
                  <li className="forum">
                    <input value="4" name="radType" type="radio" id="Radio4" />
                    <span id="Span4">Diễn đàn</span>
                  </li>
                  <li className="elib">
                    <input value="5" name="radType" type="radio" id="Radio5" />
                    <span id="Span5">Thư viện</span>
                  </li>
                </ul>
              </div>
              <div id="option">
                <ul>
                  <li className="fixed1">
                    <span className="gmail"></span>
                    @dtu.edu.vn
                  </li>
                  <li className="fixed">
                    <span className="elearning"></span>
                    Learning
                  </li>
                  <li>
                    <span className="dangky"></span>
                    Đăng ký Môn học
                  </li>
                  <li className="fixed1">
                    <span className="thongbao"></span>
                    Thông báo
                  </li>
                  <li className="fixed">
                    <span className="tuvanhoctap"></span>
                    Thư viện
                  </li>
                  <li>
                    <span className="hocphi"></span>
                    Học phí
                  </li>
                  <li className="fixed1">
                    <span className="lichhoc"></span>
                    Lịch Cá nhân
                  </li>
                  <li className="fixed">
                    <span className="forum"></span>
                    Diễn đàn
                  </li>
                  <li>
                    <span className="bangdiem"></span>
                    Bảng điểm
                  </li>
                </ul>
              </div>
              <div id="form">
                <div className="username">
                  <span>Tên Đăng nhập:</span>
                  <input
                    name="user"
                    type="text"
                    maxlength="50"
                    id="txtUser"
                    tabindex="1"
                    className="txt"
                    autocomplete="off"
                    placeholder="Nhập Tên đăng nhập"
                    value={account.user}
                    onChange={handleChange}
                  />
                  <input type="hidden" name="hdPass" id="hdPass" />
                  <input type="hidden" name="valChecked" id="valChecked" />
                </div>
                <div className="pass">
                  <span>Mật khẩu:</span>
                  <input
                    name="pass"
                    type="password"
                    id="txtPass"
                    tabindex="2"
                    className="txt"
                    autocomplete="off"
                    placeholder="Nhập Mật khẩu"
                    value={account.pass}
                    onChange={handleChange}
                  />
                </div>

                <div className="forgetpass">
                  <div className="button">
                    <input
                      type="button"
                      name="btnLogin1"
                      value=""
                      id="btnLogin1"
                      tabindex="4"
                      className="btn vn"
                      title="Nhấn Enter để tiếp tục"
                      onClick={onSubmit}
                    />

                    <span className="btn-responsive"></span>
                  </div>

                  <div id="box-captcha" className="pass">
                    <span>Mã xác nhận:</span>
                    <input
                      name="txtCaptcha"
                      type="text"
                      maxlength="4"
                      id="txtCaptcha"
                      tabindex="3"
                      className="txt captcha txtcaptcha"
                      autocomplete="off"
                      style={{ width: "50px", float: "left" }}
                    />
                    <div id="Container">
                      <div id="UpdatePanel1">
                        <div style={{ backgroundColor: "white" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div id="copyright">
                <span>
                  Copyright&copy; 2020{" "}
                  <a href="http://duytan.edu.vn" target="_blank" style={{}}>
                    Đại học Duy Tân
                  </a>
                  .
                </span>
                <span
                  id="lbMessage"
                  style={{ color: "red", float: "right", marginRight: "30px" }}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    requestAccount: state,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    loginRequest: (account) => {
      dispatch(actions.loginRequest(account));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DTULoginPage);

