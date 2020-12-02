import {combineReducers} from 'redux';
import requestAccount from "./requestAccount";
import getStatisticData from "./getStatisticData";

const myReducer = combineReducers({
    requestAccount,
    getStatisticData,
});
export default myReducer;