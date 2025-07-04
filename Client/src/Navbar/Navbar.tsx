import React, { useContext } from "react";
import logo from "/favicon.ico";
import Dropdown from "../components/Dropdown";
import type { DropdownType } from "../types/Dropdown.types";
import { Outlet } from "react-router";
import { Webappcontext } from "../Context/Webapp";

function Navbar(): React.ReactNode {
  const data: DropdownType = {
    MainHeading: "options",
    DropdownArray: [
      { text: "home", link: "/home" },
      { text: "account", link: "/account" },
      { text: "upload", link: "/upload" },
    ],
  };
  const theme = useContext(Webappcontext);
  return (
    <div className={`${theme?.Theme}`}>
      <nav className="m-2 flex items-center justify-between sm:justify-around">
        <img className="w-8 md:w-10 h-auto" src={logo} alt="" />
        <span className="hidden sm:flex flex-col gap-2 justify-center items-center">
          <h1 className="dark:text-red-500 text-blue-500">Drop Fest</h1>
          <p>Save your file safely</p>
        </span>
        <Dropdown data={data} />
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
