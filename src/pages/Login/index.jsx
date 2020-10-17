import React, { Component, useEffect, useState } from 'react'
import './styles.css'
import { FaEnvelope, FaLock } from 'react-icons/fa';

import history from './../../util/history';
import { connect } from "react-redux";
import * as actions from "./../../redux/actions/index";

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: "a",
//       pass: "b",
//       mess: false,
//     };
//   }
//   componentDidMount() {
//   //   console.log(this.state.mess);
//   //  if(this.props.manageAccount){

//   //    this.setState({
//   //     user: this.props.manageAccount.user,
//   //     pass: this.props.manageAccount.pass,
//   //     mess: this.props.manageAccount.mess,
//   //    })
//   //  }
//   //  console.log(this.state.mess);
//   }
//   handleChange = (event) =>{
//         var target = event.target;
//         var name = target.name;
//         var value = target.value;
//        this.setState({
//         [name]: value,
//        })

//   }
//   onSubmit = (event) =>{
//         event.preventDefault();
//         this.props.login(this.state);
//       }

function Login(props) {
  const [account, setAccount] = useState({ user: "std1", pass: 123, mess: false });


  function handleChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    setAccount({ ...account, [name]: value });

  }
  function onSubmit(event) {
    event.preventDefault();
    props.login(account);
    
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     setAccount({ ...account, mess: props.manageAccount.mess });
  //     console.log(props.manageAccount.mess);
  //   }

  //   fetchData()
  // }, []);

  var { manageAccount } = props.manageAccount;
 
  return (

    <div className="limiter">
      <div className="container-login100">
        <div className="custom-shape-divider-bottom-1601955910">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
        <img src="./../../img/login1.svg" alt="Login" className="img-login" />

        <p className="text-dsparking">DSParking</p>
        <div className="form-login">
          <p>Login</p>
          <form className="login100-form" onSubmit={onSubmit}>
            <div className="wrap-input100">
              <input className="input100" type="text" value={account.user} name="user" onChange={handleChange} placeholder="Tên đăng nhập" />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FaEnvelope />
              </span>
            </div>

            <div className="wrap-input100">
              <input className="input100" type="password" value={account.pass} name="pass" onChange={handleChange} />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FaLock />
              </span>
            </div>
            <h5 className="text-light">{manageAccount.mess ? "Username/Password invalid !" : ""}</h5>
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
              {!manageAccount.mess &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
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
    manageAccount: state,
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (account) => {
      dispatch(actions.login(account));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);