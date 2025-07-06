import React, { useState } from "react";
import type { ButtonType } from "../types/button.type";

function Button({
  loading = false,
  func = () => {},
  type = "button",
  text,
  cname = "",
}: ButtonType) {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => {
    if (loading) {
      setIsLoading((data) => !data);
      func();
      setIsLoading((data) => !data);
    } else {
      func();
    }
  };
  return (
    <button type={type} onClick={handleClick} className={`btn ${cname}`}>
      {isloading && <span className="loading loading-spinner"></span>}
      {text}
    </button>
  );
}

export default Button;
