import { useContext, useState, type JSX } from "react";
import type { UserAuthType } from "../../types/user.type";
import { ThemeContext } from "../../Context/Theme";
import { commonbg, tc } from "../../components/style/main";
import { Link } from "react-router";
import { login, register } from "../../api/userauth.api";
import ls from "../../utils/ls.util";
import Loading from "../../components/MyLoading";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ApiFunction } from "../../utils/apifunction.util";
import MySwitch from "../../components/style/theme/MySwitch";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast from "react-hot-toast";
import { NameInput, UserNameInput } from "./_components/inputs";

const NavigatePart = ({
  link, text
}: {
  link: { text: string, href: string },
  text: string
}) => (
  <p className={`text-center  text-base mb-1.5 mt-1 ${tc}`}>
    {text}
    <Link
      className="hover:text-blue-600 text-blue-500 ml-2 underline"
      to={link.href}
    >
      {link.text}
    </Link>
  </p>
)

function Authform({ type }: { type: string }): JSX.Element {
  const [isloading, setIsloading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<UserAuthType>({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormdata((form) => ({ ...form, [e.target.name]: e.target.value }))
  }

  const context = useContext(ThemeContext);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    await ApiFunction({
      callback: async () => {
        e.preventDefault();
        const data = type === "login" ? await login(formdata) : await register(formdata);
        ls.tokenStore.set(data.token);
        toast.loading("Redirecting...", {
          duration: 3000
        })
        setTimeout(() => {
          location.href = "/home"
        }, 3000);
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

      <div className="border dark:border-white/30 border-gray-400 w-full md:w-120  ">
        <div className="p-3  items-center flex">
          <h1 className={`${tc} w-full text-center text-xl underline  `}>
            {type == "login" ? "Login" : "Register Your Profile"}
          </h1>
          <MySwitch />
        </div>
        <div className="px-4 ">
          <div className="w-full">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              {type == "register" && (
                <NameInput value={formdata.name || ""} onChange={handleChange} />
              )}
              <UserNameInput value={formdata.username} onChange={handleChange} />
              <TextField required className={`w-full ${tc}`}
                size="small" name="password"
                value={formdata.password}

                slotProps={{
                  htmlInput: {
                    minLength: 6
                  },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                          }
                          onClick={() => setShowPassword((p) => !p)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }

                }}
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                label={"Enter password"} variant="outlined"

              />
              <Button
                className=""
                type="submit"
                sx={{
                  width: 100,
                  margin: "0 auto"
                }}
                variant="outlined"
                size="small"
                loading={isloading}
              >Submit</Button>
            </form>
          </div>
          {type == "login" ? (
            <NavigatePart text="No account?" link={{ text: "register", href: "/auth/register" }} />
          ) : (
            <NavigatePart text="Already have an account?" link={{ text: "login", href: "/auth/login" }} />

          )}
        </div>
      </div>
    </div>
  );
}

export default Authform;
