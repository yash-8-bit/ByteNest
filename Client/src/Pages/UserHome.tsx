import { useEffect, useState, type JSX } from "react";
import type { UserFileType } from "../types/user.type";
import { tc } from "../components/style/main";
import { deleteFile, getFile } from "../api/userfile.api";
import Loading from "../components/MyLoading";
import { ApiFunction } from "../utils/apifunction.util";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import toast from "react-hot-toast";
function UserHome(): JSX.Element {
  const [data, setData] = useState<UserFileType[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);

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

      <div className="flex justify-center px-3 min-h-[80vh]">
        <div className="w-[50rem]">
          {data.length == 0 ? (
            <div className="grid h-full place-items-center">
              <span className="flex flex-col items-center">
                <p className={`${tc}  font font-bold text-2xl  `}>
                  No File Uploaded Yet
                </p>
                <Link className="badge" to="/upload-file">
                  upload your first file
                </Link>
              </span>
            </div>
          ) : (
            <div className="dark:shadow-teal-500 shadow-pink-600 shadow-2xl rounded-box mt-2 ">
              <ul className="list overflow-auto max-h-[86vh]">
                <li className="p-4 text-xs dark:text-white text-black  text-center opacity-60 tracking-wide">
                  Files you uploded
                </li>
                {data.map((item, i) => (
                  <li className="list-row font" key={i}>
                    <h4 className="text-4xl dark:text-white text-black font-thin dark:opacity-30 tabular-nums">
                      {i + 1}
                    </h4>
                    <div className="list-col-grow">
                      <h1 className="dark:text-white text-xl text-black">
                        {item.filename}
                      </h1>
                      <p className="text-xs dark:text-white text-black/30 uppercase font-semibold">
                        {item.filetype}
                      </p>
                    </div>
                    <IconButton>
                      <a
                        href={getDownloadUrl(item.pathurl)}
                      >
                        <DownloadIcon />
                      </a>
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserHome;
