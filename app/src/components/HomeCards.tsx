import React from "react";
import styled from "styled-components";

import { homeCard } from "../data/data";

const HomeCards = () => {
  return (
    <Container>
      {homeCard.map((h) => {
        return (
          <div
            key={h.id}
            className="home-card"
            style={{ backgroundColor: h.backgroundColor }}
          >
            <p>{h.text}</p>
            <img src={h.image} alt={h.text} />
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.section`
  padding: 10em 15em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3em;
  justify-content: center;
  .home-card {
    display: flex;
    align-items: center;
    height: 25em;
    width: 38em;
    position: relative;
    p {
      color: #ffffff;
      font-family: "Jost";
      font-size: 3em;
      flex: 0.6;
      padding-left: 1em;
    }
    img {
      flex: 0.5;
      box-sizing: border-box;
      position: absolute;
      right: -5px;
      bottom: -6px;
    }
  }
`;

export default HomeCards;
