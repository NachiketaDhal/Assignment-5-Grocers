import React from "react";
import Styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      {/* <h2>Loading...</h2> */}
      <div></div>
    </Container>
  );
};

const Container = Styled.div`
  min-height: 50vh;
  display: grid;
  place-items: center;
  div {
    height: 90px;
    width: 90px;
    border: 4px solid transparent;
    border-top-color: #14462e;
    border-radius: 50%;
    animation: spinner 0.6s linear infinite;
  }

  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
