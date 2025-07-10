import { useEffect, useState } from "react";
import { RiAccountBox2Fill } from "react-icons/ri";
import { tc } from "../components/style/main";
import Button from "../components/Button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { useDelete, useDetails } from "../apis/user";
import type { User } from "../types/user.type";
import Alert from "../components/Alert";
import ls from "../utils/ls.logic";

function Account() {
  const [data, setData] = useState<User>({
    name: "",
    username: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");
  const Delete = async () => {
    try {
      const data = await useDelete();
      ls.reset();
      alert(data.message);
    } catch (error: any) {
      setShow(true);
      if (error.response && error.response.data) {
        setInfo(error.response.data.message);
        return;
      }
      setInfo(error.message);
    }
  };
  const Logout = () => {
    ls.reset();
    useNavigate()("/home");
  };
  useEffect(() => {
    const get = async () => {
      try {
        const data = await useDetails();
        setData(data.data);
      } catch (error: any) {
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
            func={Delete}
            cname={`dark:btn-soft btn-error`}
          />
        </div>
      </div>
    </div>
  );
}

export default Account;
