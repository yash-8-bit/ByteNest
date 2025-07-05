import React, { useState } from "react";
import type { IconBtnType } from "../types/button.type";

function Iconbutton(props: IconBtnType) {
  const [istrue, setIstrue] = useState<boolean>(true);
  const handleClick = () => {
    props.func();
    setIstrue(!istrue);
  };
  if (props.isnormal)
    return (
      <button onClick={handleClick} className={`btn ${props.cname}`}>
        {props.icon1}
      </button>
    );
  return (
    <button onClick={handleClick} className={`btn ${props.cname}`}>
      {istrue ? props.icon1 : props.icon2}
    </button>
  );
}

export default Iconbutton;
