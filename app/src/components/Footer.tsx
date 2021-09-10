import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <p>
        Copyright &copy; {new Date().getFullYear()}, Grocers All Rights
        Reserved.
      </p>
    </Container>
  );
};

const Container = styled.footer`
  padding: 5em;
  background-color: #14462e;
  color: #ffffff;
  text-align: center;
  p {
    font-size: 2em;
  }
`;

export default Footer;
