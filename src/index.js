import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Router, Switch } from 'react-router-dom';
//Router to Home
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute';
//router to User
import LayoutLogin from './layouts/Login/LayoutLogin'
import Login from './pages/Login/index'
import Profile from './pages/Admin/Profile/index'
import Home from './pages/Admin/Home/index'
import Account from './pages/Admin/Account/index'
// import Evaluation from './pages/Admin/Evaluation/index'
// import Notifications from './pages/Admin/Notifications/index'
import Statistic from './pages/Admin/Statistic/index'
import Manage from './pages/Admin/Manage/index';
// import Support from './pages/Admin/Support/index'
import Setting from './pages/Admin/Setting/index'

//router to Admin


//import Redux library
import {createStore} from "redux";
import {Provider} from 'react-redux';
import myReducer from "./redux/reducers/index";
import * as serviceWorker from './serviceWorker';
import history from './util/history'
import 'antd/dist/antd.css';


import thunk from "redux-thunk";
import {applyMiddleware} from 'redux';

// add REDUX DEVTOOL TO TEST
const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(
  myReducer,
  composeEnhancer(applyMiddleware(thunk)),
  )
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <LayoutLogin  path="/login" component={Login}/>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/account" component={Account} />
          {/* <PrivateRoute path="/evaluation" component={Evaluation} /> */}
          {/* <PrivateRoute path="/notifications" component={Notifications} /> */}
          <PrivateRoute path="/statistic" component={Statistic} />
          <PrivateRoute path="/manage" component={Manage} />
          {/* <PrivateRoute path="/support" component={Support} /> */}
          <PrivateRoute path="/setting" component={Setting} />
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
