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

  const { fetchAllProducts, showAlert } = useGlobalContext();

  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!pName || !image || !price) {
        showAlert("Please fill all the fields", "red");
        return;
      }
      const { data } = await axios.post(
        apiUrlProducts,
        {
          name: pName,
          image,
          price: Number(price),
        },
        { withCredentials: true }
      );
      // console.log(data);
      setInputValues({ pName: "", image: "", price: "" });
      showAlert("Item added successfully", "green");
      await fetchAllProducts();
      setTimeout(() => {
        history.push("/products");
      }, 2500);
    } catch (err: any) {
      // console.log(err);
      showAlert("Something went wrong, try reloading", "red");
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
`;

export default AdminAdd;
