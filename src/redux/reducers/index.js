const initialState = {
  noticeListData: [
    {
      id: '001',
      // level: () => <div className="level" style={{ backgroundColor: '#f5222d' }}></div>,
      level: 'cao',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo nemo totam dolore quae commodi. Aliquam quasi placeat rerum aut.',
      date: '05/10/2020'
    },
    {
      id: '002',
      // level: () => <div className="level" style={{ backgroundColor: 'green' }}></div>,
      level: 'cao',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      description: 'Ahihi',
      date: '05/10/2020'
    },
    {
      id: '003',
      // level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
      level: 'cao',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      description: 'Ahihi',
      date: '05/10/2020'
    },
    {
      id: '004',
      // level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
      level: 'cao',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      description: 'Ahihi',
      date: '05/10/2020'
    },
  ],
  transactionsList: [
    {
      no:'001',
      id:'GD10112020',
      time:'10/11/2020',
      money: '2000',
      title: 'Top Up to DSParking',
      balance:'4000',
    },
  ]
};
function myReducer(state = initialState, action) {
  switch (action.style) {
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
    case 'GET_TRANSACTIONS_LIST':{
      return {
        ...state,
        transactionsList: [
          ...action.payload,
        ]
      };
    }
    default: {
      return state;
    }
  }
}
export default myReducer;