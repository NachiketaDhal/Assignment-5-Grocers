import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import axios from "axios";

import { apiUrlProducts } from "../data/data";
import { useGlobalContext } from "../context/context";
import { IItem } from "../interfaces";

const AdminUpdateForm = () => {
  const [inputValues, setInputValues] = useState({
    pName: "",
    image: "",
    price: 0,
  });

  const { pName, image, price } = inputValues;

  const { fetchAllProducts, showAlert } = useGlobalContext();

  const history = useHistory();
  const { id } = useParams<any>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const getProductById = async () => {
    try {
      const { data }: { data: { product: IItem } } = await axios.get(
        `${apiUrlProducts}/${id}`
      );
      const { image, name, price } = data.product;
      setInputValues({ pName: name, image, price });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!pName || !image || !price) return;
      const { data } = await axios.put(
        `${apiUrlProducts}/${id}`,
        {
          name: pName,
          image,
          price: Number(price),
        },
        { withCredentials: true }
      );
      // console.log(data);
      setInputValues({ pName: "", image: "", price: 0 });
      showAlert("Item updated successfully", "green");
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
          <button>Update Product</button>
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

export default AdminUpdateForm;
