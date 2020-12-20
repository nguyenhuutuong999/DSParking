import React, {useState} from 'react'
import './styles.css'
import { connect } from "react-redux";
import * as actions from "./../../redux/actions/index";

function Login(props) {
  const [account, setAccount] = useState({ user: "std1", pass: 123, mess: true });

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
  var {requestAccount} = props.requestAccount;
  return (

    <div className="page">
      
      <div className="app-container-login">
       
        <div className="form-login">
        <img src="./../../logo.png" className="img-fluid-logo" alt="logo" />
          <form className="login100-form" onSubmit={onSubmit}>
            <div className="wrap-input100">
              <input className="input100" type="text" value={account.user} name="user" onChange={handleChange} placeholder="Tên đăng nhập" />
              <span className="focus-input100"></span>
              
            </div>

            <div className="wrap-input100">
              <input className="input100" type="password" value={account.pass} name="pass" onChange={handleChange} />
              <span className="focus-input100"></span>
             
            </div>
            <h5 className="text-light">{requestAccount.mess ? "Username/Password invalid !" : ""}</h5>
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
              
            </div>
            <div className="login-text">
              <div>
                <a className="txt2" href="#a">
                  Quên Tên đăng nhập / Mật khẩu?
                </a>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>

   )
}

const mapStateToProps = (state) => {
  return {
    requestAccount: state,
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    loginRequest: (account) => {
      dispatch(actions.loginRequest(account));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
