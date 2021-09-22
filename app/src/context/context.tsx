import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
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

// let lCart;
// let lFav;

// function setCart() {
//   if (
//     localStorage.getItem("loginStatus") &&
//     JSON.parse(String(localStorage.getItem("loginStatus"))).status
//   ) {
//     lCart = JSON.parse(String(localStorage.getItem("loginStatus"))).loggedInUser
//       .cart;
//   } else {
//     lCart = [];
//   }
//   return lCart;
// }

// function setFav() {
//   if (
//     localStorage.getItem("loginStatus") &&
//     JSON.parse(String(localStorage.getItem("loginStatus"))).status
//   ) {
//     lFav = JSON.parse(String(localStorage.getItem("loginStatus"))).loggedInUser
//       .fav;
//   } else {
//     lFav = [];
//   }
//   return lFav;
// }

const initialState: IState = {
  loginStatus: {
    status: false,
  },
  // loginStatus: JSON.parse(String(localStorage.getItem("loginStatus"))) || {
  //   status: false,
  // },
  loading: false,
  products: [],
  searchedProducts: [],
  sortedProducts: [],
  cart: [],
  fav: [],
  formInputValue: { username: "", password: "" },
  searchInputValue: "",
  alert: { status: false, color: "", text: "" },
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
  showAlert: function (message: string, color: string) {},
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
      // console.log(data);
      dispatch({ type: "UPDATE_LOGIN_STATE_STATUS", payload: data });
    } catch (err) {
      // console.log(err);
    }
  };

  const showAlert = (message: string, color: string) => {
    dispatch({ type: "SHOW_ALERT", payload: { message, color } });
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
    } catch (err: any) {
      console.log(err.response);
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
    } catch (err: any) {
      console.log(err.response);
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
    try {
      if (!newState.loginStatus.status) {
        showAlert("Please Login to do this operation", "red");
        return;
      }
      if (checkFav(_id)) {
        await axios.get(`${apiUrlFav}/remove/${_id}`, {
          withCredentials: true,
        });
        showAlert("Item removed from favourites", "red");
        isLoggedIn();
      } else {
        await axios.get(`${apiUrlFav}/add/${_id}`, {
          withCredentials: true,
        });
        showAlert("Item added to favourites", "green");
        isLoggedIn();
      }
    } catch (err) {
      showAlert("Something went wrong, please reload", "red");
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
    try {
      if (!newState.loginStatus.status) {
        showAlert("Please Login to do this operation", "red");
        return;
      }
      if (checkCart(_id)) {
        await axios.get(`${apiUrlCart}/remove/${_id}`, {
          withCredentials: true,
        });
        showAlert("Item removed from cart", "red");
        isLoggedIn();
      } else {
        await axios.get(`${apiUrlCart}/add/${_id}`, {
          withCredentials: true,
        });
        showAlert("Item added to cart", "green");
        isLoggedIn();
      }
    } catch (err: any) {
      showAlert("Something went wrong, please reload", "red");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_FORM_INPUT_CHANGE", payload: { name, value } });
  };

  const changeProductAndUserStateAfterAuth = useCallback(async () => {
    // setTimeout(async () => {
    await isLoggedIn();
    if (!newState.loginStatus.status) {
      return;
    }
    await fetchCartProducts();
    await fetchFavProducts();
    // }, 2500);
  }, [newState.loginStatus.status]);

  const login = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();

        const { data } = await axios.post(
          `${apiUrlAuth}/login`,
          newState.formInputValue,
          {
            withCredentials: true,
          }
        );
        // console.log(data);
        dispatch({ type: "EMPTY_FORM_INPUT_FIELD" });
        showAlert(data.message, "green");

        changeProductAndUserStateAfterAuth();
      } catch (err: any) {
        showAlert(err.response.data.message, "red");
        // console.log(err.response.data);
      }
    },
    [changeProductAndUserStateAfterAuth, newState.formInputValue]
  );

  const signup = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();

        const { data } = await axios.post(
          `${apiUrlAuth}/signup`,
          newState.formInputValue,
          {
            withCredentials: true,
          }
        );
        // console.log(data);
        dispatch({ type: "EMPTY_FORM_INPUT_FIELD" });
        showAlert(data.message, "green");

        changeProductAndUserStateAfterAuth();
      } catch (err: any) {
        showAlert(err.response.data.message, "red");
        // console.log(err.response.data);
      }
    },
    [changeProductAndUserStateAfterAuth, newState.formInputValue]
  );

  const logout = useCallback(async () => {
    // const logout = async () => {
    try {
      await axios.get(`${apiUrlAuth}/logout`, {
        withCredentials: true,
      });
      dispatch({
        type: "FETCH_CART_PRODUCTS",
        payload: [],
      });
      dispatch({
        type: "FETCH_FAV_PRODUCTS",
        payload: [],
      });

      showAlert("Logged out successfully", "green");
      await isLoggedIn();
    } catch (err: any) {
      // console.log(err.response.data);
      showAlert("Something went wrong, try reloading", "red");
    }
    // };
  }, []);

  useEffect(() => {
    fetchAllProducts();
    isLoggedIn();
    // fetchCartProducts();
  }, []);

  useEffect(() => {
    // setFav();
    isLoggedIn();
  }, [login, signup, logout]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "HIDE_ALERT" });
    }, 2500);
    return () => clearTimeout(timer);
  }, [newState.alert]);

  return (
    <AppContext.Provider
      value={{
        newState,
        dispatch,
        handleChange,
        // handleSearchChange,
        fetchAllProducts,
        showAlert,
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
