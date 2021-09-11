import React, { Fragment } from "react";

import Form from "../components/Form";

const Login = () => {
  return (
    <Fragment>
      <Form props={["Username", "Password"]} type="Login" />
    </Fragment>
  );
};

export default Login;
