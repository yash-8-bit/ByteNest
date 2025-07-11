import type { JSX } from "react";
import type { ButtonType } from "../types/button.type";

function Button({
  func = () => {},
  type = "button",
  text,
  cname = "",
}: ButtonType):JSX.Element {
  return (
    <button type={type} onClick={func} className={`btn ${cname}`}>
      {text}
    </button>
  );
}

export default Button;
