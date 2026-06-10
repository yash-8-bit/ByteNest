import { useEffect, useId, useState, type JSX } from "react";
import { accountDelete, accountDetails, accountupdate } from "../../api/user";
import type { User } from "../../types/user.type";
import ls from "../../utils/ls.util";
import Loading from "../../components/MyLoading";
import Button from "@mui/material/Button";
import { ApiFunction } from "../../utils/apifunction.util";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { NameInput, UserNameInput } from "../auth/_components/inputs";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MyBottomNavigation from "../../components/MyBottomNavigation";

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
  const id = useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    await ApiFunction({
      callback: async () => {
        await accountDelete();
        ls.tokenStore.reset();
        toast.success("Deleted Successfully");
        setTimeout(() => {
          location.href = "/";
        }, 1000);
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
    toast.success("Logout Successfully")
    setTimeout(() => {
      location.href = "/";
    }, 1000);
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
      <DialogTitle id="alert-dialog-title">
        Update Profile
      </DialogTitle>
      <DialogContent>
        <form id="update-form" className="flex flex-col gap-2 p-2" onSubmit={handleUpdate}>
          <NameInput value={upadated.name || ""} onChange={handleChange} />
          <UserNameInput value={upadated.username} onChange={handleChange} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setIsupdateOpen(false); setUpdated(data) }}>Cancel</Button>
        <Button type="submit" form="update-form">
          Update
        </Button>
      </DialogActions>
    </Dialog>
      <div className="flex justify-center  text-2xl px-3 mt-2">
        <MyBottomNavigation />

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


        <div className="grid md:grid-cols-2 min-w-full md:min-w-4xl grid-cols-1">
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
              <Button
                id={buttonId}
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open}
                fullWidth

                variant="contained"
                onClick={handleClick}
              >
                Options
              </Button>
              <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    'aria-labelledby': buttonId,
                  },
                }}
              >
                <MenuItem onClick={() => setIsupdateOpen(true)}>Update Profile</MenuItem>
                <MenuItem onClick={() => { setType("delete"); setIsOpen(true) }}>Delete Account</MenuItem>
                <MenuItem onClick={() => { setType("logout"); setIsOpen(true) }}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
