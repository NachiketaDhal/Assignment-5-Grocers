import React from "react";
import styled from "styled-components";

import { IFormProps } from "../interfaces";

const Form = ({ props, type }: IFormProps) => {
  return (
    <Container>
      <div className="form-container">
        <div className="form-heading">
          <h2>{type}</h2>
        </div>
        <form>
          {props.map((p, i) => (
            <div key={i}>
              <label>{p}</label> <br />
              <input type="text" placeholder={`Enter your ${p}`} /> <br />
            </div>
          ))}
          <button>{type}</button>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.section`
  min-height: 70vh;
  min-width: 100%;
  display: grid;
  place-items: center;
  .form-container {
    background-color: #9fcb22;
    padding: 3em;
    border-radius: 0.3em;
    box-shadow: 2px 5px 12px rgba(0, 0, 0, 0.3);
    .form-heading {
      text-align: center;
      h2 {
        font-size: 2em;
        margin-bottom: 1em;
        text-decoration: underline;
        font-weight: 600;
      }
    }
    form {
      label {
        font-size: 1.5em;
      }
      input {
        width: 20em;
        font-size: 1.4em;
        padding: 0.5em;
        margin-bottom: 1em;
        border-radius: 0.3em;
        border: none;
        outline: none;
      }
      button {
        border: none;
        color: #ffffff;
        background-color: #14462e;
        font-size: 1.5em;
        padding: 0.5em;
        border-radius: 0.3em;
        width: 100%;
        margin-top: 1em;
      }
    }
  }
`;

export default Form;
