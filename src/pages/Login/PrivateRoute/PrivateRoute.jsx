import React from "react";
import { Route, Redirect } from "react-router-dom";
import LayoutDefault2 from '../../../layouts/Layout2/LayoutDefault2';
import Home from "./../../User/Home/index"

const PrivateRoute = ({...rest }) => (  
  
    localStorage.getItem('user') ?
        (
            <LayoutDefault2 {...rest } />
         )
        :
        (<Route  {...rest}>
            <Redirect to={{ pathname: '/login' }} />
        </Route>)     
)

export default PrivateRoute;