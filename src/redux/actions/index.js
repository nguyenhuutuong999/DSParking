import * as types from "./../constants/index";
import firebase from "../../services/firebase";
import history from "./../../util/history";

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
            alert("login success");
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

export const getMoneyOutListToday = (list) => {
  return {
    type: types.GET_STATISTIC_TODAY,
    list,
  };
};
export const getMoneyOutListTodayRequest = () => {

  var d = new Date();
  var s = d.getSeconds();
      
  
  var dateTime = "2020-10-18T23:37:16.4588769+07:00";
  const parts = dateTime.split(/[- T : +]/);
  parts.forEach((item)=>{
    //console.log(item);
  })
  return (dispatch) => {
    var getList = firebase.database().ref("History/parkingMan/moneyOut");
   
    return getList.on("value", function (snapshot) {
      let count = 0;
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach((item) => {
          if (item.val().place === "1") {
            count++;
          }
        });
      });
      dispatch(getMoneyOutListToday(count));
      
    }); 
  }
};
export const updateDateWeek = () => {
  return {
    type: types.UPDATE_DATA_WEEK,
  };
};
