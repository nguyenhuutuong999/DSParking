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

      return {
        
      }
    }
    case types.LOGIN_FAIL: {
      return {
        ...state,
        user: "",
        pass: "",
        mess: true,
      }
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        user: "",
        pass: "",
        mess: false,
      }
    }
    default:
      return state;
  }
};
export default myReducer;
 