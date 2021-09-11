import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "./Button";
// import Navbar from "./Navbar";

const Hero = () => {
  return (
    <Container>
      {/* <Navbar /> */}
      <div className="hero-section">
        <div className="hero-left-section">
          <h2>Welcome To Our Grocery Store</h2>
          <h1>
            Shop Online For <br /> Fresh Groceries
          </h1>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className="buttons-section">
            <Link to="/products">
              <Button text="SHOP NOW" type="transparent" />
            </Link>
            <Link to="/">
              <Button text="EXPLORE MORE" type="colored" />
            </Link>
          </div>
        </div>
        <div className="hero-right-section">
          {/* <img src={heroImg} alt="hero-img" /> */}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  background-color: #f5f9fa;
  min-height: 100vh;
  min-width: 100%;
  padding: 0 15em;
  background-image: url("https://elementorpress.com/templatekit-pro/layout17/wp-content/uploads/2021/07/Home-banner-right-img.jpg");
  background-size: cover;
  background-position: 3vw 0;
  background-repeat: no-repeat;

  .hero-section {
    font-family: "Jost";
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hero-left-section {
      flex: 0.5;
      display: flex;
      flex-direction: column;
      gap: 2em;
      padding: 6em 0;
      h2 {
        color: #9fcb22;
        font-size: 2.5em;
        font-weight: 500;
      }
      h1 {
        font-size: 7em;
        font-weight: 600;
        line-height: 1.2;
      }
      p {
        font-size: 2.5em;
      }
      .buttons-section {
        display: flex;
        gap: 2em;
      }
    }
    .hero-right-section {
    }
  }
`;

export default Hero;
