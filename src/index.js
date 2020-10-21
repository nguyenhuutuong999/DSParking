import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Router, Switch } from 'react-router-dom';

import LayoutDefault2 from './layouts/Layout2/LayoutDefault2';
import LayoutLogin from './layouts/Login/LayoutLogin'

import myReducer from './redux/reducers/index'
import history from './util/history'
import { createStore} from 'redux';
import { Provider } from 'react-redux';

import AdminHome from './pages/Admin/AdminHome';
import AdminNotifications from './pages/Admin/AdminNotifications';
import AdminProfile from './pages/Admin/AdminProfile';
import AdminStatistic from './pages/Admin/AdminStatistic';
import UsersManagement from './pages/Admin/UsersManagement';

import Login from './pages/User/Login';
import Profile from './pages/User/Profile';
import Home from './pages/User/Home';
import Account from './pages/User/Account';
import Evaluation from './pages/User/Evaluation';
import Notifications from './pages/User/Notifications';
import Statistic from './pages/User/Statistic';
import Support from './pages/User/Support';
import Setting from './pages/User/Setting';

import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
const myStore = createStore(myReducer);
console.log("myStore", myStore)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
    <Router history={history}>
        <Switch>
          <LayoutLogin exact path="/login" component={Login}/>

          <LayoutDefault2 exact role="admin" path="/admin" component={AdminHome} />
          <LayoutDefault2 exact role="admin" path="/admin/notifications" component={AdminNotifications} />
          <LayoutDefault2 exact role="admin" path="/admin/profile" component={AdminProfile} />
          <LayoutDefault2 exact role="admin" path="/admin/statistic" component={AdminStatistic} />
          <LayoutDefault2 exact role="admin" path="/admin/management" component={UsersManagement} />

          <LayoutDefault2 exact role="user" path="/profile" component={Profile} />
          <LayoutDefault2 exact role="user" path="/" component={Home} />
          <LayoutDefault2 exact role="user" path="/account" component={Account} />
          <LayoutDefault2 exact role="user" path="/evaluation" component={Evaluation} />
          <LayoutDefault2 exact role="user" path="/notifications" component={Notifications} />
          <LayoutDefault2 exact role="user" path="/statistic" component={Statistic} />
          <LayoutDefault2 exact role="user" path="/support" component={Support} />
          <LayoutDefault2 exact role="user" path="/setting" component={Setting} />
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
