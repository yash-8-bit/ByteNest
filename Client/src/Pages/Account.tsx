import { useEffect, useState, type JSX } from "react";
import { RiAccountBox2Fill } from "react-icons/ri";
import { tc } from "../components/style/main";
import Button from "../components/Button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router";
import { accountDelete, accountDetails } from "../apis/user";
import type { User } from "../types/user.type";
import Alert from "../components/Alert";
import ls from "../utils/ls.logic";
import Loading from "../components/Loading";

function Account(): JSX.Element {
  const [data, setData] = useState<User>({
    name: "",
    username: "",
  });
  const [isloading, setIsloading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");
  const account_delete = async () => {
    try {
      setIsloading(true);
      const data = await accountDelete();
      ls.ls1.reset();
      alert(data.message);
      setIsloading(false);
      location.reload();
    } catch (error: any) {
      setIsloading(false);
      setShow(true);
      if (error.response && error.response.data) {
        setInfo(error.response.data.message);
        return;
      }
      setInfo(error.message);
    }
  };
  const Logout = () => {
    ls.ls1.reset();
    location.reload();
  };
  useEffect(() => {
    const get = async () => {
      try {
        setIsloading(true);
        const data = await accountDetails();
        setData(data.data);
        setIsloading(false);
      } catch (error: any) {
        setIsloading(false);
        setShow(true);
        if (error.response && error.response.data) {
          setInfo(error.response.data.message);
          return;
        }
        setInfo(error.message);
      }
    };
    get();
  }, []);
  return (
    <div className="flex justify-center px-3">
      {isloading && <Loading />}
      {show && (
        <Alert text={info} cname="alert-error" action={() => setShow(false)} />
      )}
      <div className="mt-10">
        <Link
          className={`${tc} p-2 rounded bg-black/30 w-fit flex gap-2 place-items-center`}
          to={"/user-home"}
        >
          <BiLeftArrowAlt />
        </Link>
        <div className="grid place-items-center">
          <RiAccountBox2Fill
            className={`size-30 sm:size-35 md:size-40 lg:size-50 not-dark:text-gray-400`}
          />
        </div>
        <div
          className={`grid grid-cols-2 ${tc} text-base md:text-xl space-y-2 space-x-6 font font-semibold`}
        >
          <label htmlFor="name">Name -</label>
          <h3 id="name">{data.name}</h3>
          <label htmlFor="email">Username -</label>
          <h3 id="email">{data.username}</h3>
        </div>
        <div className="flex justify-around">
          <Button
            text="Log Out"
            func={Logout}
            cname={`dark:btn-soft btn-warning`}
          />
          <Button
            text="Delete Account"
            func={account_delete}
            cname={`dark:btn-soft btn-error`}
          />
        </div>
      </div>
    </div>
  );
}

export default Account;
