import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/Button";

const Admin = () => {
  return (
    <Container>
      <div className="fill-height">
        <Link to="/admin/add">
          <Button text="Add a Product" type="colored" />
        </Link>
        <Link to="/admin/delete">
          <Button text="Delete a Product" type="transparent" />
        </Link>
        <Link to="/admin/update">
          <Button text="Update a Product" type="colored" />
        </Link>
      </div>
    </Container>
  );
};

const Container = styled.section`
  div {
    display: flex;
    justify-content: center;
    gap: 3em;
  }
`;

export default Admin;
