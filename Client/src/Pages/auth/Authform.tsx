import { useContext, useState, type FormEvent, type JSX } from "react";
import type { UserAuthType } from "../../types/user.type";
import { WebappContext } from "../../Context/Webapp";
import { commonbg, tc } from "../../components/style/main";
import { Link, useNavigate } from "react-router";
import { login, register } from "../../api/userauth.api";
import ls from "../../utils/ls.util";
import Loading from "../../components/MyLoading";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ApiFunction } from "../../utils/apifunction.util";
import MySwitch from "../../components/style/theme/MySwitch";

const NavigatePart = ({
  link, text
}: {
  link: { text: string, href: string },
  text: string
}) => (
  <p className={`text-center font text-sm mb-2 ${tc}`}>
    {text}
    <Link
      className="hover:text-red-400 text-red-500 ml-2"
      to={link.href}
    >
      {link.text}
    </Link>
  </p>
)

function Authform({ type }: { type: string }): JSX.Element {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<UserAuthType>({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormdata((form) => ({ ...form, [e.target.name]: e.target.value }))
  }

  const context = useContext(WebappContext);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await ApiFunction({
      callback: async () => {
        e.preventDefault();
        const data = type === "login" ? await login(formdata) : await register(formdata);
        ls.ls1.set(data.token);
        navigate("/home")
      },
      setLoading: setIsloading
    })
  };
  return (
    <div
      className={`${context.Theme}
       transition-all p-3 flex-col flex ${commonbg} justify-center items-center h-screen`}
    >
      {isloading && <Loading />}

      <div className="border dark:border-white/30 hover:shadow-xl border-gray-300 min-h-72 w-full md:w-120   rounded-xl ">
        <div className="p-3 pb-0 items-center flex">
          <h1 className={`${tc} font-serif w-full text-center text-xl font-medium `}>
            {type == "login" ? "Login" : "Register"}
          </h1>
          <MySwitch change={context.ChangeTheme} />
        </div>
        <div className="h-full p-4 w-full grid place-items-center">
          <div className="w-full">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {type == "register" && (
              <TextField required className={`w-full ${tc}`}
                size="small" name="name" type="text"
                value={formdata.name}
                onChange={handleChange}
                label={"Enter name"} variant="outlined" />
            )}
            <TextField required className={`w-full ${tc}`}
              size="small" name="username"
              type="text"
              value={formdata.username}
              onChange={handleChange}
              label={"Enter username"} variant="outlined" />
            <TextField required className={`w-full ${tc}`}
              size="small" name="password"
              type="password"
              value={formdata.password}
              onChange={handleChange}
              label={"Enter password"} variant="outlined"

            />
            <div className="grid place-items-center">
              <Button
                className=""
                type="submit"
                variant="contained"
                size="small"
                loading={isloading}
              >Submit</Button>
            </div>
            {type == "login" ? (
              <NavigatePart text="No account?" link={{ text: "register", href: "/auth/register" }} />

            ) : (
              <NavigatePart text="already have account?" link={{ text: "login", href: "/auth/login" }} />

            )}
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authform;
