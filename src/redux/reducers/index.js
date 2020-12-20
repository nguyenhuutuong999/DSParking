import {combineReducers} from 'redux';
import requestAccount from "./requestAccount";
import getStatisticData from "./getStatisticData";
import inforPaymentRequest from "./inforPaymentRequest";
import manageAccount from "./manageAccount";
const myReducer = combineReducers({
    requestAccount,
    getStatisticData,
    inforPaymentRequest,
    manageAccount
});
export default myReducer;