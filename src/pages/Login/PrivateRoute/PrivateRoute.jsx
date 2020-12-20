import React from "react";
import { Route, Redirect } from "react-router-dom";
import LayoutDefault2 from "../../../layouts/Layout2/LayoutDefault2";

const PrivateRoute = ({ ...rest }) =>
  localStorage.getItem("user") ? (
    <LayoutDefault2 {...rest} />
  ) : (
    <Route {...rest}>
      <Redirect to={{ pathname: "/login" }} />
    </Route>
  );

export default PrivateRoute;
