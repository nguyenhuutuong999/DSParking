import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import LayoutLogin from './layouts/Login/LayoutLogin';
import { ThemeProvider } from 'styled-components';
import history from './util/history';

import theme from './constants/theme';
import GlobalStyle from './GlobalStyles';

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

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <LayoutLogin exact path="/login" component={Login}/>

          <UserLayout exact  path="/" component={Home} />
          <UserLayout exact  path="/profile" component={Profile} />
          <UserLayout exact  path="/account" component={Account} />
          <UserLayout exact  path="/evaluation" component={Evaluation} />
          <UserLayout exact  path="/notifications" component={Notifications} />
          <UserLayout exact  path="/statistic" component={Statistic} />
          <UserLayout exact  path="/support" component={Support} />
          <UserLayout exact  path="/setting" component={Setting} />
        
          <AdminLayout exact role="4" path="/admin" component={HomeA} />
          <AdminLayout exact role="4" path="/admin/account" component={AccountA} />
          <AdminLayout exact role="4" path="/admin/profile" component={ProfileA} />
          <AdminLayout exact role="4" path="/admin/statistic" component={StatisticA} />
          <AdminLayout exact role="4" path="/admin/management" component={ManageA} />
          {/* <AdminLayout exact role="2" path="/admin/payment" component={Payment} /> */}

          <Route exact role="3" path="/landing" component={Landing} />

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
