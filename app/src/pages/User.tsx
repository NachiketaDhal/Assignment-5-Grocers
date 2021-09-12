import React from "react";

import { useGlobalContext } from "../context/context";

const User = () => {
  const { newState } = useGlobalContext();

  let { loginStatus } = newState;

  return (
    <div style={{ minHeight: "70vh", padding: "4em 15em" }}>
      <p style={{ fontSize: "2em" }}>
        {JSON.stringify(loginStatus, null, "\t")}
      </p>
    </div>
  );
};

export default User;
