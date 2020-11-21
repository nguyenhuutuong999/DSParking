import * as types from "./../constants/index";

const initialState = [50, 60, 70, 80, 90, 100, 110];

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.GET_STATISTIC_TODAY: {
      if (action.list) {
        var state = state;
        state[state.length - 1] = action.list;
      }
      
      return [...state];
    }
    case types.UPDATE_DATA_WEEK: {
      var d = new Date();
      let s = d.getSeconds();

        var state = state;
        state.shift();
        state.push(0);
     
         console.log(state)
      return [...state];
    }

    default:
     
      return state;
  }
};
export default myReducer;
