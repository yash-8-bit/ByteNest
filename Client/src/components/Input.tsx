import { type JSX } from "react";
import type { InputType } from "../types/input.type";
import { commonbg, tc } from "./style/main";

function Input({
  heading = "",
  type = "text",
  cname = "",
  placeholder = "",
  value,
  onchange,
}: InputType) :JSX.Element{
  return (
    <fieldset className="fieldset">
      <legend className={`fieldset-legend ${tc}`}>{heading}</legend>
      <input
        type={type}
        value={value}
        className={`input ${cname} ${tc} ${commonbg}`}
        placeholder={placeholder}
        onChange={onchange}
        required={true}
      />
    </fieldset>
  );
}

export default Input;
