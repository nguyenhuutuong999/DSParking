import * as types from "../constants/index";

const initialState = {};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INFOR_PAYMENT: {
        console.log(action.infor)
      return action.infor;
    }
    default:
      return state;
  }
};
export default myReducer;
