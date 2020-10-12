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