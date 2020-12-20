import * as types from "./../constants/index";

const initialState = {
    users : [],
    loading: false,
    error: null,
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.GET_USERS_REQUESTED:{
            return{
                ...state,
                loading: true,
            }
        }
        case types.GET_USERS_SUCCESS:{
           console.log(action.users)
            return{
                 ...state,
                 loading: false,
                 users: action.users
            }
        }
        case types.GET_USERS_FAILED:{
            return{
                 ...state,
                 loading: false,
                error: action.message
            }
        }
        default: return {...state};
    }
}
export default myReducer;