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


