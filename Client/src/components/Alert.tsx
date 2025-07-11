import { type JSX } from "react";
import type { AlertType } from "../types/alert.type";

function Alert({ cname = "", text, action }: AlertType):JSX.Element {
  return (
    <div
      className="fixed flex-col flex justify-center items-center size-full
     bg-black/50 z-10"
    >
      <div
        role="alert"
        className={`alert hover:scale-105 transition-all font
         text-base ${cname}`}
      >
        <span>{text}</span>
        <button className="cursor-pointer text-white" onClick={action}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Alert;
