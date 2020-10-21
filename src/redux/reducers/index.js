// import { combineReducers } from 'redux';
// import infoListReducers from './infoList.reducers';
// import statisticListReducer from './statisticList.reducers';

// export default combineReducers({
//   infoListReducers,
//   statisticListReducer,
// })

const initialState = {
  //notice
  noticeListData: [
    {
      id: '1',
      level: '#fadb14',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo nemo totam dolore quae commodi. Aliquam quasi placeat rerum aut.',
      date: '05/10/2020'
    },
    {
      id: '2',
      // level: () => <div className="level" style={{ backgroundColor: 'green' }}></div>,
      level: ' #52c41a',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      description: 'Ahihi',
      date: '05/10/2020'
    },
    {
      id: '3',
      // level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
      level: '#cf1322',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      description: 'Ahihi',
      date: '05/10/2020'
    },
    {
      id: '4',
      // level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
      level: '#fa8c16',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      description: 'Ahihi',
      date: '05/10/2020'
    },
  ],
  //Transaction
  transactionsList: [
    {
      key: '1',
      no: '001',
      id: 'GD10112020',
      time: '10/11/2020',
      money: '2000',
      title: 'Top Up to DSParking',
      balance: '4000',
    },
    {
      key: '2',
      no: '001',
      id: 'GD10112020',
      time: '10/11/2020',
      money: '2000',
      title: 'Top Up to DSParking',
      balance: '4000',
    },
    {
      key: '3',
      no: '001',
      id: 'GD10112020',
      time: '10/11/2020',
      money: '2000',
      title: 'Top Up to DSParking',
      balance: '4000',
    },
    {
      key: '4',
      no: '001',
      id: 'GD10112020',
      time: '10/11/2020',
      money: '4000',
      title: 'Top Up to DSParking',
      balance: '4000',
    },
    
  ],
  //History
  historyList: [
    {
      key: '1',
      stt: '001',
      id: '10112020',
      date: '10/11/2020',
      place: '254 Nguyễn Văn Linh',
      timeIn: '6:45',
      timeOut: '10:05',
    },
    {
      key: '2',
      stt: '002',
      id: '10112020',
      date: '10/11/2020',
      place: '254 Nguyễn Văn Linh',
      timeIn: '6:45',
      timeOut: '10:05',
    },
    {
      key: '3',
      stt: '003',
      id: '10112020',
      date: '10/11/2020',
      place: '254 Nguyễn Văn Linh',
      timeIn: '6:45',
      timeOut: '10:05',
    },
  ],
  /*----------------Statistic------------------- */
  dataWeek :[
    {
      name: 'T2', CP: 8000
    },
    {
      name: 'T3', CP: 3000
    },
    {
      name: 'T4', CP: 2000
    },
    {
      name: 'T5', CP: 5000
    },
    {
      name: 'T6', CP: 1000
    },
    {
      name: 'T7', CP: 2000
    },
    {
      name: 'CN', CP: 3000
    },
  ],
  dataMonth :[
    {
      name: 'Tuần 1', CP: 40000
    },
    {
      name: 'Tuần 2', CP: 30000
    },
    {
      name: 'Tuần 3', CP: 20000
    },
    {
      name: 'Tuần 4', CP: 15000
    },
  ],
  dataYear: [
    {
      name: 'Thg 1', CP: 20000
    },
    {
      name: 'Thg 2', CP: 40000
    },
    {
      name: 'Thg 3', CP: 25000
    },
    {
      name: 'Thg 4', CP: 10000
    },
    {
      name: 'Thg 5', CP: 50000
    },
    {
      name: 'Thg 6', CP: 35000
    },
    {
      name: 'Thg 7', CP: 29000
    },
    {
      name: 'Thg 8', CP: 30000
    },
    {
      name: 'Thg 9', CP: 20000
    },
    {
      name: 'Thg 10', CP: 56000
    },
    {
      name: 'Thg 11', CP: 17000
    },
    {
      name: 'Thg 12', CP: 23000
    },
  ],
  dataCampus : [
    { name: 'NVL', value: 400 },
    { name: 'QT', value: 300 },
    { name: 'HK', value: 300 },
    { name: 'PCT', value: 200 },
  ],
};
function myReducer(state = initialState, action) {
  console.log("myReducer -> action", action)
  switch (action.type) {
    case 'GET_NOTIFIATIONS_LIST': {
      return {
        ...state,
        noticeListData: [
          ...action.payload,
        ]
      };
    }
    case 'DELETE_NOTIFICATIONS': {
      const { id } = action.payload;
      const newNotificationListData = state.noticeListData;
      const notificationIndex = state.noticeListData.findIndex((item) => item.id === id);
      newNotificationListData.splice(notificationIndex, 1);
      return {
        ...state,
        noticeListData: [
          ...newNotificationListData,
        ],
      }
    }
    case 'GET_TRANSACTIONS_LIST': {
      return {
        ...state,
        transactionsList: [
          ...action.payload,
        ]
      };
    }
    case 'GET_HISTORY_LIST': {
      return {
        ...state,
        historyList: [
          ...action.payload,
        ]
      };
    }
    /*----------------Statistic------------------- */
    default: {
      return state;
    }
  }
}
export default myReducer;