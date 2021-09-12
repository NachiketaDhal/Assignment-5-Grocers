import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useGlobalContext } from "../context/context";
import { IRoute } from "../interfaces";

const AdminRoute = ({ children, ...rest }: IRoute) => {
  const { newState } = useGlobalContext();

  const { loginStatus } = newState;

  return (
    <Route
      {...rest}
      render={() => {
        return loginStatus.loggedInUser?.role === "admin" ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
};
export default AdminRoute;
