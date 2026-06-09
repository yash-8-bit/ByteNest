import { useEffect, useState, type JSX } from "react";
import { accountDelete, accountDetails, accountupdate } from "../../api/user";
import type { User } from "../../types/user.type";
import ls from "../../utils/ls.util";
import Loading from "../../components/MyLoading";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


import { ApiFunction } from "../../utils/apifunction.util";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { NameInput, UserNameInput } from "../auth/_components/inputs";
import Icon from "@mui/material/Icon";

const RowData = ({ title, value }: {
  title: string;
  value: string | number;
}) => {
  return (
    <p>
      {`${title} : ${value}`}
    </p>
  )
}


function UserPage(): JSX.Element {
  const [data, setData] = useState<User>({
    name: "",
    username: "",
    totalfile: 0
  });
  const [upadated, setUpdated] = useState<User>({ ...data });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsupdateOpen] = useState<boolean>(false);

  const [type, setType] = useState<"delete" | "logout" | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdated((form) => ({ ...form, [e.target.name]: e.target.value }))
  }
  const handleDelete = async () => {
    await ApiFunction({
      callback: async () => {
        await accountDelete();
        ls.tokenStore.reset();
        toast.success("Deleted Successfully");
      },
      setLoading: setIsloading
    });
  };
  const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    await ApiFunction({
      callback: async () => {
        e.preventDefault();
        await accountupdate({
          name: upadated.name !== data.name ? upadated.name : undefined,
          username: upadated.username !== data.username ? upadated.username : undefined,
        });
        ls.tokenStore.reset();
        toast.success("Updated Successfully");
        setData(upadated);
        setIsupdateOpen(false);
      },
      setLoading: setIsloading
    });
  };
  const handleLogout = () => {
    ls.tokenStore.reset();
    location.reload();
    toast.success("Logout Successfully")
  };
  useEffect(() => {
    const get = async () => {
      await ApiFunction({
        callback: async () => {
          const data = await accountDetails();
          setData(data.data);
          setUpdated(data.data)
        },
        setLoading: setIsloading
      })
    };
    get();
  }, []);
  return (
    <><Dialog
      open={isUpdateOpen}
    >
      <DialogTitle className="p-2! text-center" id="alert-dialog-title">
        Update Profile
        <Icon onClick={() => setIsupdateOpen(false)} autoFocus>
          <CloseIcon  />
        </Icon>
      </DialogTitle>
      <form className="flex flex-col gap-2 p-2" onSubmit={handleUpdate}>

        <NameInput value={upadated.name || ""} onChange={handleChange} />
        <UserNameInput value={upadated.username} onChange={handleChange} />
        <Button
          type="submit"
          variant="outlined"
          size="small"
          loading={isloading}
        >Update</Button>
        
      </form>
    </Dialog>
      <div className="flex justify-center text-2xl px-3 mt-2">
        {isloading && <Loading />}
        <Dialog open={isOpen} >
          <DialogTitle id="alert-dialog-title">
            are you sure you want to {type} your Account?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} autoFocus>
              Close
            </Button>
            <Button onClick={() => type === "logout" ? handleLogout() : handleDelete()} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>


        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="bg-[#aeaf95]">
            <span className="grid capitalize place-items-center h-full text-[13vh] dark:text-black/40 text-white/40">
              {data.name?.[0]}
            </span>
          </div>
          <div className="bg-[#f7f4eb] p-5">
            <div>
              <RowData title="Name" value={data.name} />
              <RowData title="Username" value={data.username} />
              <RowData title="TotalFiles" value={data.totalfile} />
            </div>
            <div className="mt-5">
              <Button onClick={() => { setIsupdateOpen(true) }} variant="contained">
                Update Profile
              </Button>
              <Button onClick={() => { setType("logout"); setIsOpen(true) }} color="warning" variant="outlined" startIcon={<LogoutIcon />}>
                Log Out
              </Button>
              <Button onClick={() => { setType("delete"); setIsOpen(true) }} color="error" variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
