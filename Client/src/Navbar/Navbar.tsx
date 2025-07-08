import React, { useContext } from "react";
import logo from "/favicon.ico";
import Dropdown from "../components/Dropdown";
import type { DropdownType } from "../types/Dropdown.types";
import { Outlet } from "react-router";
import { WebappContext } from "../Context/Webapp";
import Iconbutton from "../components/Iconbutton";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { commonbg, tc } from "../components/style/main";

function Navbar(): React.ReactNode {
  const data: DropdownType = {
    MainHeading: "options",
    DropdownArray: [
      { text: "home", link: "/user-home" },
      { text: "upload", link: "/upload" },
      { text: "account", link: "/account" },
    ],
  };
  const context = useContext(WebappContext);
  return (
    <div className={`${context.Theme} ${commonbg} h-screen transition-colors`}>
      <nav className="mx-2 py-2 flex items-center justify-between sm:justify-around">
        <img className="w-8 md:w-10 h-auto" src={logo} alt="" />
        <span className="flex flex-col gap-1 justify-center items-center">
          <h1 className="dark:text-cyan-500 text-red-500 text-xl sm:text-2xl md:text-3xl font-bold">
            Drop Fest
          </h1>
          <p className={`hidden ${tc} font  sm:flex`}>
            Save your files safely in cloud
          </p>
        </span>
        <div className="flex justify-center items-center">
          <Dropdown data={data} />
          <Iconbutton
            cname="btn-primary dark:btn-error"
            func={context.ChangeTheme}
            icon1={<MdOutlineLightMode />}
            isnormal={false}
            icon2={<MdOutlineDarkMode />}
          />
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
