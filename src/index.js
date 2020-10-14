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

import Login from './pages/User/Login/index'
import Profile from './pages/User/Profile/index'
import Home from './pages/User/Home/index'
import Account from './pages/User/Account/index'
import Evaluation from './pages/User/Evaluation/index'
import Notifications from './pages/User/Notifications/index'
import Statistic from './pages/User/Statistic/index'
import Support from './pages/User/Support/index'
import Setting from './pages/User/Setting/index'

import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
const myStore = createStore(myReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
    <Router history={history}>
        <Switch>
          <LayoutLogin exact path="/login" component={Login}/>
          <LayoutDefault2 exact role="user" path="/profile" component={Profile} />
          <LayoutDefault2 exact path="/" component={Home} />
          <LayoutDefault2 exact path="/account" component={Account} />
          <LayoutDefault2 exact path="/evaluation" component={Evaluation} />
          <LayoutDefault2 exact path="/notifications" component={Notifications} />
          <LayoutDefault2 exact path="/statistic" component={Statistic} />
          <LayoutDefault2 exact path="/support" component={Support} />
          <LayoutDefault2 exact path="/setting" component={Setting} />
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
