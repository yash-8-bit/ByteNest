import { useContext, useEffect, type JSX } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { WebappContext } from "../Context/Webapp";
import { commonbg, tc } from "../components/style/main";
import ls from "../utils/ls.util";
import MySwitch from "../components/style/theme/MySwitch";
import SortIcon from '@mui/icons-material/Sort';
function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const data = [
    { text: "Home", href: "/home" },
    { text: "Upload File", href: "/upload-file" },
    { text: "User", href: "/user" },
  ];
  const run = (): void => {
    if (!ls.ls1.get()) navigate("/");
  };
  useEffect(() => {
    run();
  }, []);
  const context = useContext(WebappContext);
  return (
    <div className={`${context.Theme} ${commonbg} h-screen transition-colors`}>
      <div className="navbar dark:bg-base-300  shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button">
              <SortIcon className={`${tc}`} />
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-gray-200 dark:bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {data.map((item) => (
                <li>
                  <Link className={`${tc} hover:text-red-500 text-base font-serif`} to={item.href}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <h1 className={`${tc} font font-medium text-xl`}>Drop Fest</h1>
        </div>
        <div className="navbar-end">
         
          <MySwitch change={context.ChangeTheme} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
