import {call, put, takeEvery} from "redux-saga/effects";
import {firebaseApp} from './../../configs/firebase';
const apiUrl = 'https://5d3bb074552bfb00148e0402.mockapi.io/api/ManageAccount';

async function  getUser(){
    // return fetch(apiUrl,{
    //     method:"GET",
    //     headers:{
    //         "Content-Type":"application/json",
    //     }

    // }).then(response => response.json())
    // .catch((error) => {throw error})

    let arr = [];
      const a = await firebaseApp.database().ref("User/account")
      .on('value', (snapshot) => {
        let snapshotValue = snapshot.val();
        
        for (let obj in snapshotValue) {
           
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
       
     
        
      })
      return arr;
    }
     
function* fetchUsers(action){
    
    try{
        
        const users = yield call(getUser);
        console.log(users)
        yield put({type:"GET_USERS_SUCCESS", users: users});
    }catch(e){
        yield put({type:"GET_USERS_FAILED", message : e.message});
    }
}
function* userSaga(){
    yield takeEvery("GET_USERS_REQUESTED", fetchUsers)
}

export default userSaga;