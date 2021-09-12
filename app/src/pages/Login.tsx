import React, { Fragment } from "react";

import Form from "../components/Form";

const Login = () => {
  return (
    <Fragment>
      <Form props={["username", "password"]} type="Login" />
    </Fragment>
  );
};

export default Login;
