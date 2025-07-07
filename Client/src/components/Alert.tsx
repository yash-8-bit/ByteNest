import React from "react";
import type { AlertType } from "../types/alert.type";
import Button from "./Button";

function Alert({ cname = "", text, setalertshow }: AlertType) {
  return (
    <div className="fixed flex justify-center items-center size-full backdrop-blur-xs">
      <div role="alert" className={`alert ${cname}`}>
        <span className="font text-base md:text-xl">{text}</span>
        <Button text="ok" cname="btn-xs" func={setalertshow} />
      </div>
    </div>
  );
}

export default Alert;
