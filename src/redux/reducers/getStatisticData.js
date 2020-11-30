import * as types from "./../constants/index";

const initialState = [];

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.UPDATE_STATISTIC_DATA: {
        //console.log(action.newWeekChartData)
      return [...action.newWeekChartData];
    }
    default:
      return state;
  }
};
export default myReducer;
