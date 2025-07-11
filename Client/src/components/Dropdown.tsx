import { type JSX } from "react";
import type { DropdownType } from "../types/dropdown.types";
import { Link } from "react-router";
function Dropdown({ data }: { data: DropdownType }):JSX.Element {
  return (
    <div className="dropdown  dropdown-bottom">
      <div tabIndex={0} role="button" className="btn m-1">
        {data.MainHeading}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-fit p-2 shadow-sm"
      >
        {data.DropdownArray.map((item) => (
          <li key={item.text}>
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
