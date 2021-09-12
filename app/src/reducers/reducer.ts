import { IAction, IState } from "../interfaces";

const reducer = (currentState: IState, action: IAction): IState => {
  const { type, payload } = action;
  if (type === "SET_LOADING_TRUE") {
    return { ...currentState, loading: true };
  }

  if (type === "SET_LOADING_FALSE") {
    return { ...currentState, loading: false };
  }

  if (type === "FETCH_ALL_PRODUCTS") {
    return { ...currentState, products: payload };
  }

  if (type === "FETCH_CART_PRODUCTS") {
    return { ...currentState, cart: payload };
  }

  if (type === "FETCH_FAV_PRODUCTS") {
    return { ...currentState, fav: payload };
  }

  if (type === "ADD_TO_CART") {
  }

  if (type === "REMOVE_FROM_CART") {
  }

  if (type === "TOGGLE_FAV") {
  }

  if (type === "ADD_TO_FAV") {
  }

  if (type === "REMOVE_FROM_FAV") {
  }

  if (type === "HANDLE_FORM_INPUT_CHANGE") {
    const { name, value } = payload;
    return {
      ...currentState,
      formInputValue: { ...currentState.formInputValue, [name]: value },
    };
  }

  if (type === "HANDLE_SEARCH_INPUT_CHANGE") {
    return {
      ...currentState,
      searchInputValue: payload,
    };
  }

  if (type === "SEARCH_PRODUCTS") {
    return { ...currentState, searchedProducts: payload };
  }

  if (type === "EMPTY_FORM_INPUT_FIELD") {
    return { ...currentState, formInputValue: { username: "", password: "" } };
  }

  if (type === "UPDATE_LOGIN_STATE_STATUS") {
    localStorage.setItem("loginStatus", JSON.stringify(payload));
    return {
      ...currentState,
      loginStatus: payload,
      cart: payload?.loggedInUser?.cart,
      fav: payload?.loggedInUser?.fav,
    };
  }

  return { ...currentState };
};

export default reducer;
