import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Redux library

import myReducer from "./redux/reducers/index";
import * as serviceWorker from './serviceWorker';
import history from './util/history'
import 'antd/dist/antd.css';
import { Router, Switch, Route } from 'react-router-dom';
import LayoutLogin from './layouts/Login/LayoutLogin';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import HomeA from './pages/Admin/Home/index';
import AccountA from './pages/Admin/Account';
import ProfileA from './pages/Admin/Profile';
import StatisticA from './pages/Admin/Statistic';
import ManageA from './pages/Admin/Manage';

import Login from './pages/DTULogin';

import Landing from './pages/User/Landing';
import Home from './pages/User/Home';
import Profile from './pages/User/Profile';
import Account from './pages/User/Account';
import Evaluation from './pages/User/Evaluation';
import Notifications from './pages/User/Notifications';
import Statistic from './pages/User/Statistic';
import Support from './pages/User/Support';
import Setting from './pages/User/Setting';

import LayoutAdmin from "./layouts/LayoutAdmin/LayoutAdmin";
import LayoutUser from "./layouts/LayoutUser/LayoutUser";


const myStore = createStore(myReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
    <Router history={history}>
        <Switch>
          <LayoutLogin exact path="/login" component={Login}/>

          <LayoutUser exact role="3" path="/" component={Home} />
          <LayoutUser exact role="3" path="/profile" component={Profile} />
          <LayoutUser exact role="3" path="/account" component={Account} />
          <LayoutUser exact role="3" path="/evaluation" component={Evaluation} />
          <LayoutUser exact role="3" path="/notifications" component={Notifications} />
          <LayoutUser exact role="3" path="/statistic" component={Statistic} />
          <LayoutUser exact role="3" path="/support" component={Support} />
          <LayoutUser exact role="3" path="/setting" component={Setting} />
         
          <LayoutAdmin exact role="4" path="/admin" component={HomeA} />
          <LayoutAdmin exact role="4" path="/admin/account" component={AccountA} />
          <LayoutAdmin exact role="4" path="/admin/profile" component={ProfileA} />
          <LayoutAdmin exact role="4" path="/admin/statistic" component={StatisticA} />
          <LayoutAdmin exact role="4" path="/admin/management" component={ManageA} />
          {/* <LayoutAdmin exact role="2" path="/admin/payment" component={Payment} /> */}

          <Route exact role="3" path="/landing" component={Landing} />

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
