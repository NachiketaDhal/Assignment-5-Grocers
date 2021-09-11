export interface IItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  fav: boolean;
  cart: boolean;
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
  type: string;
}
