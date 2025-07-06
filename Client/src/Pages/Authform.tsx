import React, { useContext, useState } from "react";
import Button from "../components/Button";
import type { UserAuthType } from "../types/user.type";
import Input from "../components/Input";
import { WebappContext } from "../Context/Webapp";
import { commonbg, tc } from "../components/style/main";
import { Link } from "react-router";

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
      className={`${theme.Theme} transition-all flex ${commonbg} justify-center items-center h-screen`}
    >
      <button onClick={theme.ChangeTheme}>change</button>
      <div className="dark:border-white border-black border px-20 py-12 rounded ">
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
              cname="btn-outline dark:btn-accent btn-error"
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
  );
}

export default Authform;
