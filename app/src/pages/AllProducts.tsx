import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";

import { useGlobalContext } from "../context/context";
import Loading from "../components/Loading";

const AllProducts = () => {
  const {
    newState,
    toggleFav,
    checkFav,
    checkCart,
    toggleCart,
    dispatch,
    // handleSearchChange,
  } = useGlobalContext();

  const { loading, searchInputValue, searchedProducts } = newState;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "HANDLE_SEARCH_INPUT_CHANGE", payload: e.target.value });
    dispatch({ type: "SEARCH_PRODUCTS" });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <form className="op-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchInputValue}
          onChange={handleChange}
        />
        {/* <select id="sort" name="sort" className="sort-input">
          <option value="price-lowest">Price (Lowest)</option>
          <option value="price-highest">Price (Highest)</option>
          <option value="name-a">Name (A-Z)</option>
          <option value="name-z">Name (Z-A)</option>
        </select> */}
      </form>
      {searchedProducts?.length < 1 ? (
        <div className="fill-height">
          <h1>No Products found...</h1>
        </div>
      ) : (
        <div className="card-container">
          {searchedProducts.map((product) => (
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
                className={checkCart(product._id) ? "colored3" : "colored2"}
                onClick={() => toggleCart(product._id)}
              >
                {checkCart(product._id) ? "REMOVE FROM CART" : "ADD TO CART"}
              </button>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

const Container = styled.section`
  padding: 4em 15em;
`;

export default AllProducts;
