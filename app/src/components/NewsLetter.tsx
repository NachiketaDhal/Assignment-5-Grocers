import React from "react";
import styled from "styled-components";

import { heroImageSecondary } from "../data/data";

const NewsLetter = () => {
  return (
    <Container>
      <div>
        <div className="input-section">
          <h1>Subscribe To Newsletter</h1>
          <div>
            <input type="text" placeholder="Enter Email Address" />
            <button>SUBSCRIBE NOW</button>
          </div>
        </div>
        <div className="image-section">
          <img src={heroImageSecondary} alt="" />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  padding: 20em 15em;
  div {
    background-color: #9fcb22;
    padding: 2em;
    display: flex;
    .image-section {
      position: relative;
      img {
        position: absolute;
        left: -8em;
        bottom: -4em;
      }
    }
    .input-section {
      display: flex;
      flex-direction: column;
      flex: 0.7;
      h1 {
        color: #ffffff;
        font-size: 4.5em;
      }
      div {
        padding-left: 0;
        input {
          padding: 0.5em;
          font-size: 2em;
          width: 60%;
        }
        button {
          font-size: 1.5em;
          padding: 0.5em 1em;
          color: #ffffff;
          background-color: #14462e;
          border: none;
        }
      }
    }
  }
`;

export default NewsLetter;
