import React from "react";
import styled from "styled-components";

const Alert = ({ color, message }: { color: string; message: string }) => {
  return (
    <Container style={{ width: "100vw" }}>
      <span style={{ backgroundColor: color }}>{message}</span>
    </Container>
  );
};

const Container = styled.section`
  position: fixed;
  display: flex;
  justify-content: center;
  color: #ffffff;
  z-index: 10;
  text-align: center;
  top: 0px;
  margin: 0 auto;
  span {
    height: 3em;
    min-width: 30em;
    font-size: 1.4em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Alert;
