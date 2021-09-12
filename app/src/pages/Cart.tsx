import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

import Loading from "../components/Loading";
import { useGlobalContext } from "../context/context";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const { newState, checkFav, toggleFav, toggleCart } = useGlobalContext();

  const { loading, loginStatus, cart } = newState;

  const countTotalPrice = () => {
    if (!loginStatus.status) return;
    const total = cart
      ?.map((product) => product.price)
      .reduce((cur, acc) => cur + acc, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    countTotalPrice();
  });

  if (loading) {
    return <Loading />;
  }

  if (!loginStatus.status) {
    return (
      <div className="fill-height">
        <h1>Please Login to see Cart</h1>
      </div>
    );
  }

  if (cart.length < 1) {
    return (
      <div className="fill-height">
        <h1>Cart is currently empty</h1>
      </div>
    );
  }

  return (
    <Container>
      <div className="card-container">
        {cart.map((product) => (
          <div className="card" key={product._id}>
            <div
              className={`heart ${checkFav(product._id) ? "red" : ""}`}
              onClick={() => toggleFav(product._id)}
            >
              <AiFillHeart />
            </div>
            <div className="img-container">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h2 className="name">{product.name}</h2>
              <h2 className="price">{product.price}$</h2>
            </div>
            <button
              className="colored3"
              onClick={() => toggleCart(product._id)}
            >
              REMOVE FROM CART
            </button>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h1>Total price is: {totalPrice.toFixed(2)}$</h1>
      </div>
    </Container>
  );
};

const Container = styled.section`
  padding: 4em 15em;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 9em;
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
  .total-price {
    text-align: center;
    h1 {
      font-weight: 600;
    }
  }
`;

export default Cart;
