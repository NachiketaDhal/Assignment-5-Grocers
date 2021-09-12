import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import {
  apiUrlAuth,
  apiUrlCart,
  apiUrlFav,
  apiUrlProducts,
} from "../data/data";
import { IState, IValue } from "../interfaces";

import reducer from "../reducers/reducer";

let lCart;
let lFav;

function setCart() {
  if (
    localStorage.getItem("loginStatus") &&
    JSON.parse(String(localStorage.getItem("loginStatus"))).status
  ) {
    lCart = JSON.parse(String(localStorage.getItem("loginStatus"))).loggedInUser
      .cart;
  } else {
    lCart = [];
  }
  return lCart;
}

function setFav() {
  if (
    localStorage.getItem("loginStatus") &&
    JSON.parse(String(localStorage.getItem("loginStatus"))).status
  ) {
    lFav = JSON.parse(String(localStorage.getItem("loginStatus"))).loggedInUser
      .fav;
  } else {
    lFav = [];
  }
  return lFav;
}

const initialState: IState = {
  loginStatus: JSON.parse(String(localStorage.getItem("loginStatus"))) || {
    status: false,
  },
  loading: false,
  products: [],
  searchedProducts: [],
  sortedProducts: [],
  cart: setCart(),
  fav: setFav(),
  formInputValue: { username: "", password: "" },
  searchInputValue: "",
};

const initialContextState: IValue = {
  newState: initialState,
  dispatch: function () {},
  handleChange: function () {},
  login: function () {},
  signup: function () {},
  logout: function () {},
  checkFav: function () {},
  toggleFav: function () {},
  checkCart: function () {},
  toggleCart: function () {},
  fetchAllProducts: function () {},
  // handleSearchChange: function () {},
};

const AppContext = React.createContext<IValue>(initialContextState);

const AppProvider = ({ children }: { children: any }) => {
  const [newState, dispatch] = useReducer(reducer, initialState);

  const isLoggedIn = async () => {
    try {
      const { data } = await axios.get(`${apiUrlAuth}/isLoggedIn`, {
        withCredentials: true,
      });
      console.log(data);
      dispatch({ type: "UPDATE_LOGIN_STATE_STATUS", payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllProducts = async () => {
    dispatch({ type: "SET_LOADING_TRUE" });
    const fetchedProducts = await axios.get(apiUrlProducts);
    // console.log(fetchedProducts.data);
    dispatch({
      type: "FETCH_ALL_PRODUCTS",
      payload: fetchedProducts.data.products,
    });
    dispatch({ type: "SET_LOADING_FALSE" });
  };

  const fetchCartProducts = async () => {
    try {
      dispatch({ type: "SET_LOADING_TRUE" });
      const fetchedCartProducts = await axios.get(apiUrlCart, {
        withCredentials: true,
      });
      dispatch({
        type: "FETCH_CART_PRODUCTS",
        payload: fetchedCartProducts.data.cartProducts,
      });
      dispatch({ type: "SET_LOADING_FALSE" });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFavProducts = async () => {
    try {
      dispatch({ type: "SET_LOADING_TRUE" });
      const fetchedFavProducts = await axios.get(apiUrlFav, {
        withCredentials: true,
      });
      dispatch({
        type: "FETCH_FAV_PRODUCTS",
        payload: fetchedFavProducts.data.favProducts,
      });
      dispatch({ type: "SET_LOADING_FALSE" });
    } catch (err) {
      console.log(err);
    }
  };

  const checkFav = (_id: string) => {
    if (!newState.fav || newState.fav.length < 1) return;
    const favIds = newState.fav.map((f) => f._id);
    if (favIds.includes(_id)) {
      return true;
    } else {
      return false;
    }
  };

  const toggleFav = async (_id: string) => {
    if (checkFav(_id)) {
      await axios.get(`${apiUrlFav}/remove/${_id}`, {
        withCredentials: true,
      });
      isLoggedIn();
    } else {
      await axios.get(`${apiUrlFav}/add/${_id}`, {
        withCredentials: true,
      });
      isLoggedIn();
    }
  };

  const checkCart = (_id: string) => {
    if (!newState.cart || newState.cart.length < 1) return;
    const cartIds = newState.cart.map((c) => c._id);
    if (cartIds.includes(_id)) {
      return true;
    } else {
      return false;
    }
  };

  const toggleCart = async (_id: string) => {
    if (checkCart(_id)) {
      await axios.get(`${apiUrlCart}/remove/${_id}`, {
        withCredentials: true,
      });
      isLoggedIn();
    } else {
      await axios.get(`${apiUrlCart}/add/${_id}`, {
        withCredentials: true,
      });
      isLoggedIn();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_FORM_INPUT_CHANGE", payload: { name, value } });
  };

  // const handleSearchChange = (e: any = undefined) => {
  //   let tempProducts = [...newState.products];
  //   dispatch({ type: "HANDLE_SEARCH_INPUT_CHANGE", payload: e.target.value });
  //   tempProducts = tempProducts.filter(
  //     (product) => product.name.indexOf(newState.searchInputValue.trim()) > -1
  //   );
  //   dispatch({ type: "SEARCH_PRODUCTS", payload: tempProducts });
  // };

  // const searchProducts = () => {
  // };

  const login = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (
        !newState.formInputValue.username ||
        !newState.formInputValue.password
      ) {
        return;
      }

      await axios.post(`${apiUrlAuth}/login`, newState.formInputValue, {
        withCredentials: true,
      });
      dispatch({ type: "EMPTY_FORM_INPUT_FIELD" });
      await isLoggedIn();
      await fetchCartProducts();
      await fetchFavProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (
        !newState.formInputValue.username ||
        !newState.formInputValue.password
      ) {
        return;
      }

      const signedUpUserUser = await axios.post(
        `${apiUrlAuth}/signup`,
        newState.formInputValue,
        {
          withCredentials: true,
        }
      );
      console.log(signedUpUserUser.data);
      dispatch({ type: "EMPTY_FORM_INPUT_FIELD" });
      await isLoggedIn();
      await fetchCartProducts();
      await fetchFavProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${apiUrlAuth}/logout`, {
        withCredentials: true,
      });
      await isLoggedIn();
      dispatch({
        type: "FETCH_CART_PRODUCTS",
        payload: [],
      });
      dispatch({
        type: "FETCH_FAV_PRODUCTS",
        payload: [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    isLoggedIn();
    // fetchCartProducts();
  }, []);

  useEffect(() => {
    setFav();
    // handleSearchChange();
  });

  return (
    <AppContext.Provider
      value={{
        newState,
        dispatch,
        handleChange,
        // handleSearchChange,
        fetchAllProducts,
        login,
        signup,
        logout,
        checkFav,
        toggleFav,
        checkCart,
        toggleCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
