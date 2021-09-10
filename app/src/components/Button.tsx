import React from "react";
import { IButton } from "../interfaces";

const Button = ({ text, type }: IButton) => {
  return (
    <button className={type === "transparent" ? "transparent" : "colored"}>
      {text}
    </button>
  );
};

export default Button;
