import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useGlobalContext } from "../context/context";
import Loading from "../components/Loading";
import { apiUrlProducts } from "../data/data";

const AdminDelete = () => {
  const { newState, fetchAllProducts, showAlert } = useGlobalContext();

  const { products, loading } = newState;

  if (loading) {
    return <Loading />;
  }

  const deleteProduct = async (_id: string) => {
    try {
      if (!window.confirm("Are you sure to delete the product?")) {
        return;
      }
      const { data } = await axios.delete(`${apiUrlProducts}/${_id}`, {
        withCredentials: true,
      });
      console.log(data);
      showAlert("Item deleted successfully", "red");
      await fetchAllProducts();
    } catch (err) {
      // console.log(err);
      showAlert("Something went wrong, try reloading", "red");
    }
  };

  return (
    <Container>
      <div className="card-container">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <div className="img-container">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h2 className="name">{product.name}</h2>
              <h2 className="price">{product.price}$</h2>
            </div>
            <button
              className="colored2"
              onClick={() => deleteProduct(product._id)}
            >
              DELETE PRODUCT
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.section`
  padding: 4em 15em;
`;

export default AdminDelete;
