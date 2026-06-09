import { useContext, useEffect, type JSX } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { ThemeContext } from "../Context/Theme";
import { commonbg, tc } from "../components/style/main";
import ls from "../utils/ls.util";
import MySwitch from "../components/style/theme/MySwitch";
function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const data = [
    { text: "Home", href: "/home" },
    { text: "Upload File", href: "/upload-file" },
    { text: "Account", href: "/account" },
  ];
  const run = (): void => {
    if (!ls.tokenStore.get()) navigate("/");
  };
  useEffect(() => {
    run();
  }, []);
  const context = useContext(ThemeContext);
  return (
    <div className={`${context.Theme} ${commonbg} h-screen transition-colors`}>
      <div className="flex justify-between p-2 items-center">
        <div>
          <p className={`${tc} font-medium text-xl`}>Drop Fest</p>
        </div>
        <div >
          <ul
            className="flex gap-2"
          >
            {data.map((item) => (
              <li key={item.text}>
                <Link className={`${tc} hover:text-blue-500 text-base `} to={item.href}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <MySwitch />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
