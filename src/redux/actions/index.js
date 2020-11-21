import * as types from "./../constants/index";
import firebase from "../../services/firebase";

export const login = (account) => {
  return {
    type: types.LOGIN,
    account,
  };
};
export const loginFail = () => {
  return {
    type: types.LOGIN_FAIL,
  };
};
export const loginSuccess = () => {
  return {
    type: types.LOGIN_SUCCESS,
  };
}; 
export const loginRequest = (account) => {
  return (dispatch) => {
    var getUser = firebase.database().ref("User/account/" + account.user);
    return getUser.on(
      "value",
      function (snapshot) {
        if (snapshot.val() !== null) {
          if (snapshot.val().pwd === account.pass) {
            localStorage.setItem("user", JSON.stringify(snapshot.val()));
            dispatch(loginSuccess());
          } else {
            //dispath action login fail
            dispatch(loginFail());
          }
        } else {
          dispatch(loginFail());
        }
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };
};
export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

export const updateDateWeek = () => {
  return {
    type: types.UPDATE_DATA_WEEK,
  };
};
