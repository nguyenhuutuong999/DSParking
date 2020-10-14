import {combineReducers} from 'redux';
import manageAccount from "./manageAccount";

const myReducer = combineReducers({
    manageAccount,
});
export default myReducer;