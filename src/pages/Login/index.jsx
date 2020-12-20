import React, { useState } from "react";
import "./styles2.css";
import { connect } from "react-redux";
import * as actions from "./../../redux/actions/index";

function Login(props) {
  const [account, setAccount] = useState({
    user: "std1",
    pass: 123,
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
  var { requestAccount } = props.requestAccount;
  return (
    // <div className="page">
    //   <div className="app-container-login">
    //     <div className="form-login">
    //       <img src="./../../logo.png" className="img-fluid-logo" alt="logo" />
    //       <form className="login100-form" onSubmit={onSubmit}>
    //         <div className="wrap-input100">
    //           <input
    //             className="input100"
    //             type="text"
    //             value={account.user}
    //             name="user"
    //             onChange={handleChange}
    //             placeholder="Tên đăng nhập"
    //           />
    //           <span className="focus-input100"></span>
    //           <span className="symbol-input100">
    //             <FaEnvelope />
    //           </span>
    //         </div>

    //         <div className="wrap-input100">
    //           <input
    //             className="input100"
    //             type="password"
    //             value={account.pass}
    //             name="pass"
    //             onChange={handleChange}
    //           />
    //           <span className="focus-input100"></span>
    //           <span className="symbol-input100">
    //             <FaLock />
    //           </span>
    //         </div>
    //         <h5 className="text-light">
    //           {requestAccount.mess ? "Username/Password invalid !" : ""}
    //         </h5>
    //         <div className="container-login100-form-btn">
    //           <button type="submit" className="login100-form-btn">
    //             Login
    //           </button>
    //           {/* {account.mess &&
    //             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt='waiting'/>
    //           } */}
    //         </div>
    //         <div className="login-text">
    //           <div>
    //             <a className="txt2" href="#a">
    //               Quên Tên đăng nhập / Mật khẩu?
    //             </a>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="login100-more"></div>

          <div className="wrap-login100 p-l-50 p-r-50 p-t-20 p-b-50">
            <div className="logo"></div>
            <form className="login100-form validate-form" onSubmit={onSubmit}>
              <span className="login100-form-title p-b-30">Sign In</span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Username is required"
              >
                <span className="label-input100">Username</span>
                <input
                  className="input100"
                  type="text"
                  value={account.user}
                  name="user"
                  onChange={handleChange}
                  placeholder="User Name"
                />
                <span className="focus-input100"></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
                  value={account.pass}
                  name="pass"
                  onChange={handleChange}
                  placeholder="Password"
                />
                <span className="focus-input100"></span>

              </div>

              <div className="flex-m w-full p-b-33">
                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />
                  <label className="label-checkbox100" for="ckb1">
                    <span className="txt1">
                      I agree to the
                      <a href="#" className="txt2 hov1">
                        Terms of User
                      </a>
                    </span>
                  </label>
                </div>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn">Sign In</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
