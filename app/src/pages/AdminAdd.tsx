import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import axios from "axios";

import { apiUrlProducts } from "../data/data";
import { useGlobalContext } from "../context/context";

const AdminAdd = () => {
  const [inputValues, setInputValues] = useState({
    pName: "",
    image: "",
    price: "",
  });

  const { pName, image, price } = inputValues;

  const { fetchAllProducts } = useGlobalContext();

  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!pName || !image || !price) return;
      const { data } = await axios.post(
        apiUrlProducts,
        {
          name: pName,
          image,
          price: Number(price),
        },
        { withCredentials: true }
      );
      console.log(data);
      setInputValues({ pName: "", image: "", price: "" });
      await fetchAllProducts();
      setTimeout(() => {
        history.push("/products");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div className="form-container">
        <div className="form-heading">
          <h2>Add a Product</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Product Name:</label> <br />
          <input
            type="text"
            placeholder="Enter product name"
            name="pName"
            value={pName}
            onChange={handleChange}
          />
          <br />
          <label>Product Image:</label> <br />
          <input
            type="text"
            placeholder="Enter image link"
            name="image"
            value={image}
            onChange={handleChange}
          />
          <br />
          <label>Product Price:</label> <br />
          <input
            type="number"
            placeholder="Enter product price"
            name="price"
            value={price}
            onChange={handleChange}
          />
          <br />
          <button>Add Product</button>
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

export default AdminAdd;
