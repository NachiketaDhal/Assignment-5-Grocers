import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context/context";
import Loading from "../components/Loading";

const AdminUpdate = () => {
  const { newState } = useGlobalContext();

  const { products, loading } = newState;

  if (loading) {
    return <Loading />;
  }

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
            <Link to={`/admin/update/${product._id}`}>
              <button className="colored2">Update PRODUCT</button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.section`
  padding: 4em 15em;
`;

export default AdminUpdate;
