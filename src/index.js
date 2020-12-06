import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Redux library

import myReducer from "./redux/reducers/index";
import * as serviceWorker from './serviceWorker';
import history from './util/history'
import 'antd/dist/antd.css';
import { Router, Switch } from 'react-router-dom';
import LayoutLogin from './layouts/Login/LayoutLogin'
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import HomeA from './pages/Admin/Home/index';
import AccountA from './pages/Admin/Account';
import ProfileA from './pages/Admin/Profile';
import StatisticA from './pages/Admin/Statistic';
import ManageA from './pages/Admin/Manage';
import Payment from './pages/Admin/Payment';

import Login from './pages/Login';
import Profile from './pages/User/Profile';
import Home from './pages/User/Home';
import Account from './pages/User/Account';
import Evaluation from './pages/User/Evaluation';
import Notifications from './pages/User/Notifications';
import Statistic from './pages/User/Statistic';
import Support from './pages/User/Support';
import Setting from './pages/User/Setting';
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute'
import LayoutDefault2 from "./layouts/Layout2/LayoutDefault2";


const myStore = createStore(myReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
    <Router history={history}>
        <Switch>
          <LayoutLogin exact path="/login" component={Login}/>
         
          <LayoutDefault2 exact role="2" path="/admin" component={HomeA} />
          <LayoutDefault2 exact role="2" path="/admin/account" component={AccountA} />
          <LayoutDefault2 exact role="2" path="/admin/profile" component={ProfileA} />
          <LayoutDefault2 exact role="2" path="/admin/statistic" component={StatisticA} />
          <LayoutDefault2 exact role="2" path="/admin/management" component={ManageA} />
          <LayoutDefault2 exact role="2" path="/admin/payment" component={Payment} />
          <LayoutDefault2 exact role="1" path="/" component={Home} />
          <LayoutDefault2 exact role="1" path="/profile" component={Profile} />
          <LayoutDefault2 exact role="1" path="/account" component={Account} />
          <LayoutDefault2 exact role="1" path="/evaluation" component={Evaluation} />
          <LayoutDefault2 exact role="1" path="/notifications" component={Notifications} />
          <LayoutDefault2 exact role="1" path="/statistic" component={Statistic} />
          <LayoutDefault2 exact role="1" path="/support" component={Support} />
          <LayoutDefault2 exact role="1" path="/setting" component={Setting} />
        </Switch>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
