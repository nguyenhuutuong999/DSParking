import {combineReducers} from 'redux';
import requestAccount from "./requestAccount";
import getStatisticData from "./getStatisticData";
import inforPaymentRequest from "./inforPaymentRequest";
const myReducer = combineReducers({
    requestAccount,
    getStatisticData,
    inforPaymentRequest,
});
export default myReducer;