import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { ImUser } from "react-icons/im";

const Navbar = () => {
  return (
    <Nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#e4edef" }}
    >
      <NavLink className="navbar-brand" to="/">
        <img
          src="https://elementorpress.com/templatekit-pro/layout17/wp-content/uploads/2021/07/cropped-Logo-192x192.png"
          alt="logo"
          className="logo"
        />
        Grocers
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="mr-auto navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/"
              activeStyle={{ color: "#9fcb22" }}
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/products"
              activeStyle={{ color: "#9fcb22" }}
            >
              Store
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/login"
              activeStyle={{ color: "#9fcb22" }}
              exact
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/signup"
              activeStyle={{ color: "#9fcb22" }}
            >
              Signup
            </NavLink>
          </li>
          <li className="nav-icon-container">
            <NavLink to="/" className="cart">
              <ImUser />
            </NavLink>
            <NavLink to="/cart" className="cart">
              <IoCart />
              <div className="amount">0</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  padding: 2em 15em;
  /* padding: 4em 0; */
  justify-content: space-between;
  .navbar-brand {
    font-size: 3em;
    display: flex;
    align-items: center;
    .logo {
      width: 6em;
      object-fit: contain;
    }
  }

  .navbar-collapse {
    justify-content: space-between;
    justify-content: flex-end;
    .navbar-nav {
      margin: 0px !important;
      gap: 2em;
      .nav-item {
        .nav-link {
          color: #323232;
          font-size: 1.8em;
        }
      }
    }
  }

  .nav-icon-container {
    display: flex;
    gap: 1em;
    .cart {
      padding: 1.3em;
      border-radius: 50%;
      background-color: #9fcb22;
      display: grid;
      place-items: center;
      position: relative;
      cursor: pointer;
      svg {
        font-size: 2em;
        color: #ffffff;
      }
      .amount {
        border-radius: 50%;
        background-color: #323232;
        height: 1.5em;
        width: 1.5em;
        color: #ffffff;
        position: absolute;
        right: 0px;
        top: 0px;
        display: grid;
        place-items: center;
      }
    }
  }
`;

export default Navbar;
