import React, { Fragment } from "react";

import Form from "../components/Form";

const Signup = () => {
  return (
    <Fragment>
      <Form props={["Username", "Password"]} type="Signup" />
    </Fragment>
  );
};

export default Signup;
