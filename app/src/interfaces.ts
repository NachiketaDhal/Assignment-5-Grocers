export interface IItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface IButton {
  text: string;
  type: "transparent" | "colored";
}
