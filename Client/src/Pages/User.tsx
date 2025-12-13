import { useEffect, useState, type JSX } from "react";
import { accountDelete, accountDetails } from "../api/user";
import type { User } from "../types/user.type";
import ls from "../utils/ls.util";
import Loading from "../components/MyLoading";
import UserImage from "../assets/user.avif"
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';

import { ApiFunction } from "../utils/apifunction.util";
import toast from "react-hot-toast";
function UserPage(): JSX.Element {
  const [data, setData] = useState<User>({
    name: "",
    username: "",
  });
  const [isloading, setIsloading] = useState<boolean>(false);

  const handleDelete = async () => {
    await ApiFunction({
      callback: async () => {
        await accountDelete();
        ls.ls1.reset();
        toast.success("Deleted Successfully");
      },
      setLoading: setIsloading
    });
  };
  const handleLogout = () => {
    ls.ls1.reset();
    location.reload();
    toast.success("Logout Successfully")
  };
  useEffect(() => {
    const get = async () => {
      await ApiFunction({
        callback: async () => {
          const data = await accountDetails();
          setData(data.data);
        },
        setLoading: setIsloading
      })
    };
    get();
  }, []);
  return (
    <div className="flex justify-center px-3">
      {isloading && <Loading />}

      <div className="m-10">
        <div className="grid grid-cols-1 md:grid-cols-2 shadow bg-white rounded-xl ">
          <img src={UserImage} className="size-70 md:size-96 m-2" />
          <div className="p-3">
            <div className="flex flex-col h-full">
              <div className={`h-full flex flex-col  justify-center  text-black p-3 rounded`}>
                <div className="grid grid-cols-2 w-full font">
                  <p className="border p-2 text-center rounded-tl-xl">Name</p>
                  <p className="border p-2 text-center rounded-tr-xl">UserName</p>
                  <p className="border p-2 text-center rounded-bl-xl">{data.name}</p>
                  <p className="border p-2 text-center rounded-br-xl">{data.username}</p>
                </div>

              </div>
              <div className="flex justify-around ">
                <Button onClick={handleLogout} size="small" color="warning" variant="outlined" startIcon={<LogoutIcon />}>
                  Log Out
                </Button>
                <Button onClick={handleDelete} size="small" color="error" variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserPage;
