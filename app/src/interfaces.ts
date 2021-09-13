export interface IItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  role?: "user" | "admin";
  fav: IItem[];
  cart: IItem[];
}

export type IType =
  | "FETCH_ALL_PRODUCTS"
  | "FETCH_CART_PRODUCTS"
  | "FETCH_FAV_PRODUCTS"
  | "SET_LOADING_TRUE"
  | "SET_LOADING_FALSE"
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "ADD_TO_FAV"
  | "SHOW_ALERT"
  | "HIDE_ALERT"
  | "TOGGLE_FAV"
  | "REMOVE_FROM_FAV"
  | "HANDLE_FORM_INPUT_CHANGE"
  | "HANDLE_SEARCH_INPUT_CHANGE"
  | "SEARCH_PRODUCTS"
  | "EMPTY_FORM_INPUT_FIELD"
  | "UPDATE_LOGIN_STATE_STATUS"
  | "ADMIN_ADD_PRODUCT"
  | "ADMIN_DELETE_PRODUCT";

export interface IState {
  loginStatus: { status: boolean; loggedInUser?: IUser };
  loading: boolean;
  products: IItem[];
  searchedProducts: IItem[];
  sortedProducts: IItem[];
  cart: IItem[];
  fav: IItem[];
  formInputValue: { username: string; password: string };
  searchInputValue: string;
  alert: { status: boolean; text: string; color: string };
}

export interface IValue {
  newState: IState;
  dispatch: React.Dispatch<IAction>;
  handleChange: any;
  login: any;
  signup: any;
  logout: any;
  checkFav: any;
  toggleFav: any;
  checkCart: any;
  toggleCart: any;
  fetchAllProducts: any;
  showAlert: (message: string, color: string) => void;
  // handleSearchChange: any;
}

export interface IAction {
  type: IType;
  payload?: any;
}

export interface IUser {
  username: string;
  password: string;
  fav: IItem[];
  cart: IItem[];
}

export interface IButton {
  text: string;
  type: "transparent" | "colored";
}

export interface IFormProps {
  props: string[];
  type: "Login" | "Signup";
}

export interface IRoute {
  children: any;
  rest?: any;
  path?: any;
  exact?: any;
}
