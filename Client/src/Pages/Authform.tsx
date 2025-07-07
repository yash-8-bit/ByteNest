import React, { useContext, useState } from "react";
import Button from "../components/Button";
import type { UserAuthType } from "../types/user.type";
import Input from "../components/Input";
import { WebappContext } from "../Context/Webapp";
import { commonbg, tc } from "../components/style/main";
import { Link } from "react-router";
import Iconbutton from "../components/Iconbutton";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Alert from "../components/Alert";

function Authform({ type }: { type: string }) {
  const [formdata, setFormdata] = useState<UserAuthType>({
    name: "",
    username: "",
    password: "",
  });
  const theme = useContext(WebappContext);
  const handlelogin = () => {
    alert("login");
  };
  const handleregitser = () => {
    alert("register");
  };
  return (
    <div
      className={`${theme.Theme} transition-all flex-col flex ${commonbg} justify-center items-center h-screen`}
    >
      <div className="dark:border-white/50 border-black/30 border-4  rounded-xl ">
        <div className="p-3 items-center flex">
          <h1 className={`${tc} w-full text-center tracking-widest`}>
            Drop-Fest
          </h1>
          <Iconbutton
            cname="btn-primary dark:btn-error btn-xs"
            func={theme.ChangeTheme}
            icon1={<MdOutlineLightMode />}
            isnormal={false}
            icon2={<MdOutlineDarkMode />}
          />
        </div>
        <div className="px-20 py-10">
          <h1 className={`font-semibold ${tc} text-3xl text-center`}>
            {type == "login" ? "Login" : "Register"}
          </h1>
          <form onSubmit={type == "login" ? handlelogin : handleregitser}>
            {type == "register" && (
              <Input
                placeholder="Name"
                cname="input-info"
                heading="Enter your name"
                value={formdata.name != undefined ? formdata.name : ""}
                onchange={(e) =>
                  setFormdata((old) => ({ ...old, name: e.target.value }))
                }
              />
            )}
            <Input
              placeholder="Username"
              cname="input-info"
              heading="Enter username"
              value={formdata.username}
              onchange={(e) =>
                setFormdata((old) => ({ ...old, username: e.target.value }))
              }
            />
            <Input
              placeholder="Password"
              heading="Enter password"
              cname="input-info"
              type="password"
              value={formdata.password}
              onchange={(e) =>
                setFormdata((old) => ({ ...old, password: e.target.value }))
              }
            />
            <div className="flex justify-center mt-6 mb-4">
              <Button
                cname="btn-outline hover:text-white dark:btn-accent btn-error"
                type="submit"
                text="submit"
              />
            </div>
            {type == "login" ? (
              <p className={`text-center ${tc}`}>
                No account?
                <Link
                  className="link link-hover link-error ml-2"
                  to={"/account-register"}
                >
                  Register
                </Link>
              </p>
            ) : (
              <p className={`text-center ${tc}`}>
                have account?
                <Link
                  className="link link-hover link-error ml-2"
                  to={"/account-login"}
                >
                  Login
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Authform;
