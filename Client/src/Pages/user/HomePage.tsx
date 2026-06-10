import { useEffect, useState, type JSX } from "react";
import type { UserFileType } from "../../types/user.type";
import { deleteFile, getFile, shareFile } from "../../api/userfile.api";
import Loading from "../../components/MyLoading";
import { ApiFunction } from "../../utils/apifunction.util";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CreateIcon from "@mui/icons-material/Add"
import ShareIcon from '@mui/icons-material/Share';
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MyBottomNavigation from "../../components/MyBottomNavigation";
function HomePage(): JSX.Element {
  const [data, setData] = useState<UserFileType[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  useEffect(() => {
    const getFiles = async () => {
      await ApiFunction({
        callback: async () => {
          const data = await getFile();
          setData(data.data);
        },
        setLoading: setIsloading
      })

    };
    getFiles();
  }, []);
  const handleShare = async (_id: string) => {
    await ApiFunction({
      callback: async () => {
        const data = await shareFile(_id);
        setShareUrl(`${import.meta.env.VITE_CLIENT_URL}/share-file?token=${data.data}`);
        setIsOpen(true);
      },
      setLoading: setIsloading
    })
  }
  const handleDelete = async (_id: string) => {
    await ApiFunction({
      callback: async () => {
        await deleteFile(_id);
        toast.success("File Deleted")
        setData(data.filter((item) => item._id != _id));
      },
      setLoading: setIsloading
    })
  };
  const getDownloadUrl = (url: string) => {
    return url.replace("/upload/", `/upload/fl_attachment/`);
  };
  return (
    <>
      {isloading && <Loading />}

      <Dialog open={isOpen} onClose={() => setShareUrl("")}>
        <DialogTitle id="alert-dialog-title">
          {"Copy, Share and Enjoy"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {shareUrl}
          </DialogContentText>
          <p className="text-sm italic text-red-400">This link is Valid upto 24 hours</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div className="flex justify-center px-3 min-h-[80vh]">
        <MyBottomNavigation />
        <div className="w-[50rem]">

          <div className="border border-gray-400 mt-2 ">
            <ul className="overflow-auto ">
              <li className="p-4 text-sm dark:text-white text-black  text-center opacity-60 tracking-wide">
                Files you uploded - {data.length}
              </li>

              {data.map((item, i) => (
                <li className="flex border-gray-400 border-t px-2" key={i}>
                  <div className="flex items-center justify-between w-full">
                    <div className="">
                      <p className="dark:text-white text-xl text-black">
                        {item.name}
                      </p>
                      <p className="text-xs dark:text-white text-black/30  font-semibold">
                        File Type - {item.filetype}
                      </p>
                    </div>

                    <div>
                      <IconButton title="Download File">
                        <a
                          href={getDownloadUrl(item.url)}
                          target="_blank"
                        >
                          <DownloadIcon />
                        </a>
                      </IconButton>
                      <IconButton>
                        <Tooltip onClick={() => handleShare(item._id)} title="Share File">
                          <ShareIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton color="error" title="Delete File" onClick={() => handleDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </li>
              ))}
              {data.length < 10 && <Link to={"/upload-file"}>
                <IconButton className="w-full rounded-none!" title="Add File">

                  <CreateIcon />

                </IconButton>
              </Link>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
