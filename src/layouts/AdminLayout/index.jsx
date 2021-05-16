import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from '../Header';
import Sidebar from '../Sidebar';

import branchImg from '../../assets/images/logo.jpg';

import * as Style from './styles';

function AdminLayout({ component: Component, role, ...props }) {

  const authData = JSON.parse(localStorage.getItem('user'));

  if (!authData) {

    return <Redirect to="/login" />
  } else if (authData.position !== role) {
    if (authData.position === '3') {
      return <Redirect to="/" />
    } else {
      return <Redirect to="/admin" />
    }
  } 
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <Style.AppBackground>
          <Style.AppContainer>
            <Style.AppSidebar>
              <Style.AppLogo>
                <img src={branchImg} width="100%" height="auto" alt="logo" />
              </Style.AppLogo>
              <Sidebar {...routerProps} role={role} />
            </Style.AppSidebar>
            <Style.AppMain>
              <Header {...routerProps} />
              <Style.AppContent>
                <Component {...routerProps} />
              </Style.AppContent>
            </Style.AppMain>
          </Style.AppContainer>
        </Style.AppBackground>
      )}
    />
  );

}

export default AdminLayout;