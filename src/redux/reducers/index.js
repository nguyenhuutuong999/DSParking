import {combineReducers} from 'redux';
import manageAccount from "./manageAccount";
import getList from "./getList";

const myReducer = combineReducers({
    manageAccount,
    getList,
});
export default myReducer;