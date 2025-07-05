import React, { useState } from "react";
import type { ButtonType } from "../types/button.type";

function Button(props: ButtonType) {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => {
    if (props.loading) {
      setIsLoading((data) => !data);
      props.func();
      setIsLoading((data) => !data);
    } else {
      props.func();
    }
  };
  return (
    <button onClick={handleClick} className={`btn ${props.cname}`}>
      {isloading && <span className="loading loading-spinner"></span>}
      {props.text}
    </button>
  );
}

export default Button;
