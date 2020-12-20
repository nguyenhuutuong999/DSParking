import {all} from 'redux-saga/effects';
import manageAccount from './manageAccount';
export default function* rootSaga(){
    yield all([
        
        manageAccount()
    
    ])
}