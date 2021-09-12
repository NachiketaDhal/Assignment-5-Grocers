import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useGlobalContext } from "../context/context";
import Loading from "../components/Loading";
import { apiUrlProducts } from "../data/data";

const AdminDelete = () => {
  const { newState, fetchAllProducts } = useGlobalContext();

  const { products, loading } = newState;

  if (loading) {
    return <Loading />;
  }

  const deleteProduct = async (_id: string) => {
    try {
      const { data } = await axios.delete(`${apiUrlProducts}/${_id}`, {
        withCredentials: true,
      });
      console.log(data);
      await fetchAllProducts();
    } catch (err) {
      console.log(err);
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
  .card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5em;
    .card {
      background-color: #e4edef;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3em;
      border: 1px solid transparent;
      padding: 3em 0;
      position: relative;
      transition: all 0.2s ease-in-out;
      &:hover {
        border: 1px solid #9fcb22;
      }
      .heart {
        cursor: pointer;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        svg {
          font-size: 2em;
        }
      }
      .img-container {
        img {
          width: 21.5em;
        }
      }
      .product-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          font-size: 2.5em;
          font-weight: 600;
          letter-spacing: 1.3px;
        }
        .price {
          color: #9fcb22;
          font-weight: 600;
          letter-spacing: 1.3px;
        }
      }
    }
  }
`;

export default AdminDelete;
