<<<<<<< HEAD
// export * from './infoList.action';
// export * from './statisticList.action';

/*Notification*/
export function getNotificationsList(params){
  return{
    type: 'GET_NOTIFIATIONS_LIST',
    payload: params
  }
}
export function deleteNotifications(params) {
  console.log("deleteNotifications -> params", params)
  return {
    type: 'DELETE_NOTIFICATIONS',
    payload: params,
  }
}
/* Account */
export function getTransactionsList(params){
  return{
    type: 'GET_TRANSACTIONS_LIST',
    payload: params
  }
}

export function deleteTransactions(params){
  return{
    type: 'DELETE_TRANSACTIONS',
    payload: params
  }
}

/*History*/
export function getHistoryList(params){
  return{
    type: 'GET_HISTORY_LIST',
    payload: params
  }
}

// export function getUserInfoFirebase(params){
//   return{
//     type: 'GET_USER_FIREBASE',
//     payload: params
//   }
// }
// export function getUserInfoFirebaseRequest(params){
//   return(dispatch){
//     return firebaseApp.database().ref("User/parkingMan/account/std1").on('value', (snapshot) => {
//       dispatch(getUserInfoFirebase(snapshot))
//     })
//   }
// }
/*----------------Statistic------------------- */


=======
import * as types from "./../constants/index";
import firebase from "../../services/firebase";

export const login = (account) => {
  return {
    type: types.LOGIN,
    account,
  };
};
export const loginFail = () => {
  return {
    type: types.LOGIN_FAIL,
  };
};
export const loginSuccess = () => {
  return {
    type: types.LOGIN_SUCCESS,
  };
}; 
export const loginRequest = (account) => {
  return (dispatch) => {
    var getUser = firebase.database().ref("User/account/" + account.user);
    return getUser.on(
      "value",
      function (snapshot) {
        if (snapshot.val() !== null) {
          if (snapshot.val().pwd === account.pass) {
            localStorage.setItem("user", JSON.stringify(snapshot.val()));
            dispatch(loginSuccess());
          } else {
            //dispath action login fail
            dispatch(loginFail());
          }
        } else {
          dispatch(loginFail());
        }
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };
};
export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

export const updateDateWeek = () => {
  return {
    type: types.UPDATE_DATA_WEEK,
  };
};


// const getDayList = (startDay, endDay) => {
//   let days = [];
//   for (let date = startDay.clone(); date <= endDay; date.add(1, 'days')) {
   
//     days = [
//       ...days,
//       {
//         day: date.format('DD'),
//         month: date.format('MM'),
//         year: date.format('YYYY'),
//         weekday: date.weekday(),
//       },
//     ]
//   }
//   return days;
// }

export const updateStatisticDataRequest = (selectedFromDate, selectedToDate) => {
 
  return (dispatch) => {
    var getData = firebase.database().ref("ChartStatis/");
      return getData
      .on('value', (snapshot) => {
        let snapshotValue = snapshot.val();
        let arr = [];
        for (let obj in snapshotValue) {
          Array.prototype.push.apply(arr, [snapshotValue[obj]]);
        }
        //let currentWeekAgo = getDayList(selectedFromDate, selectedToDate);
        let days = [];
        for (let date = selectedFromDate.clone(); date <= selectedToDate; date.add(1, 'days')) {
   
          days = [
            ...days,
            {
              day: date.format('DD'),
              month: date.format('MM'),
              year: date.format('YYYY'),
              weekday: date.weekday(),
            },
          ]
        }

        //console.log(currentWeekAgo)
        // let weekCount = 0;
        let getCountPlace = [];
        let newWeekChartData = days.map((item) => {
          let nvl254 = 0;
          let qtr = 0;
          let nvl334 = 0;
          let hk = 0;
    
          arr.map((ob) => {
    
            getCountPlace = (((ob.chartData || {})[item.year]?.month || {})[item.month]?.day || {})[item.day];
            getCountPlace = getCountPlace ? getCountPlace : {};
            // ID 1: 254 Nguyen Van Linh
            // ID 2: Quang Trung
            // ID 3: 254 334 Nguyen Van Linh
            // ID 4: Hoa Khanh
            nvl254 += getCountPlace["1"] ? getCountPlace["1"] : 0;
            qtr += getCountPlace["2"] ? getCountPlace["2"] : 0;
            nvl334 += getCountPlace["3"] ? getCountPlace["3"] : 0;
            hk += getCountPlace["4"] ? getCountPlace["4"] : 0;
            //console.log(getCountPlace)
          })
         
          // weekCount = nvl254 + qtr + nvl334 + hk;
          return {
            "day": item.day,
            "254 NVL": nvl254,
            "03 QT": qtr,
            "334 NVL": nvl334,
            "Hoa Khanh": hk,
          }
        })
        // setWeekChartData(newWeekChartData)
        dispatch(updateStatisticData(newWeekChartData))
      })
  
  };
};

export const updateStatisticData = (newWeekChartData) => {
  return {
    type: types.UPDATE_STATISTIC_DATA,
    newWeekChartData,
  };
};
>>>>>>> dev_tuong
