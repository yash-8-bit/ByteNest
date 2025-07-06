import React, { useState } from "react";
import type { IconBtnType } from "../types/button.type";

function Iconbutton({
  func = () => {},
  isnormal = true,
  cname = "",
  icon1,
  icon2,
}: IconBtnType) {
  const [istrue, setIstrue] = useState<boolean>(true);
  const handleClick = () => {
    func();
    setIstrue(!istrue);
  };
  if (isnormal)
    return (
      <button onClick={handleClick} className={`btn ${cname}`}>
        {icon1}
      </button>
    );
  return (
    <button onClick={handleClick} className={`btn ${cname}`}>
      {istrue ? icon1 : icon2}
    </button>
  );
}

export default Iconbutton;
