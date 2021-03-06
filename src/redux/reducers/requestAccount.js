import * as types from "./../constants/index";
import history from "./../../util/history";

var user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? user
  : {
      user: "",
      pass: "",
      mess: false,
    };
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return {};
    }
    case types.LOGIN_FAIL: {
      return {
        ...state,
        user: "",
        pass: "",
        mess: true,
      };
    }
    case types.LOGIN_SUCCESS: {
      var local = JSON.parse(localStorage.getItem("user"));
      if(local.position == "3" || local.position == "2"){
        history.push("/landing");
      }
      else{
        history.push("/");
      }
      // return {
      //   ...state,
      //   user: "",
      //   pass: "",
      //   mess: false,
      // }
    }
    default:
      return state;
  }
};
export default myReducer;
