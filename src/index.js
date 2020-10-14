import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Router, Switch } from 'react-router-dom';
//Router to Home
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute';
//router to User
import LayoutLogin from './layouts/Login/LayoutLogin'
import Login from './pages/Login/index'
import Profile from './pages/User/Profile/index'
import Home from './pages/User/Home/index'
import Account from './pages/User/Account/index'
import Evaluation from './pages/User/Evaluation/index'
import Notifications from './pages/User/Notifications/index'
import Statistic from './pages/User/Statistic/index'
import Support from './pages/User/Support/index'
import Setting from './pages/User/Setting/index'

//router to Admin


//import Redux library
import {createStore} from "redux";
import {Provider} from 'react-redux';
import myReducer from "./redux/reducers/index";
import * as serviceWorker from './serviceWorker';
import history from './util/history'
import 'antd/dist/antd.css';
// add REDUX DEVTOOL TO TEST
const store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <LayoutLogin  path="/login" component={Login}/>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute path="/evaluation" component={Evaluation} />
          <PrivateRoute path="/notifications" component={Notifications} />
          <PrivateRoute path="/statistic" component={Statistic} />
          <PrivateRoute path="/support" component={Support} />
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
