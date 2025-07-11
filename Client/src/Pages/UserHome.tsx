import React, { useEffect, useState, type JSX } from "react";
import type { UserFileType } from "../types/user.type";
import Iconbutton from "../components/Iconbutton";
import { BiDownload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { tc } from "../components/style/main";
import Alert from "../components/Alert";
import { deleteFile, getFile } from "../apis/userfile.api";
import type { AlertType } from "../types/alert.type";
import Loading from "../components/Loading";
function UserHome():JSX.Element {
  const [data, setData] = useState<UserFileType[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [infoobj, setInfoobj] = useState<AlertType>({
    text: "",
    action: () => {
      setShow(false);
    },
    cname: "",
  });
  useEffect(() => {
    const get_file = async () => {
      try {
        setIsloading(true);
        const data = await getFile();
        setIsloading(false);
        setData(data.data);
      } catch (error: any) {
        setIsloading(false);
        setShow(true);
        if (error.response && error.response.data) {
          setInfoobj({
            ...infoobj,
            text: error.response.data.message,
            cname: "alert-error",
          });
          return;
        }
        setInfoobj({
          ...infoobj,
          text: error.message,
          cname: "alert-error",
        });
      }
    };
    get_file();
  }, []);
  const delete_file = async (_id: string) => {
    try {
      setIsloading(true);
      const data_ = await deleteFile(_id);
      setIsloading(false);
      setShow(true);
      setInfoobj({
        ...infoobj,
        text: data_.message,
        cname: "alert-success",
      });
      setData(data.filter((item) => item._id != _id));
    } catch (error: any) {
      setIsloading(false);
      setShow(true);
      if (error.response && error.response.data) {
        setInfoobj({
          ...infoobj,
          text: error.response.data.message,
          cname: "alert-error",
        });
        return;
      }
      setInfoobj({
        ...infoobj,
        text: error.message,
        cname: "alert-error",
      });
    }
  };
  const getDownloadUrl = (url: string) => {
    return url.replace("/upload/", `/upload/fl_attachment/`);
  };
  return (
    <>
      {isloading && <Loading />}
      {show && (
        <Alert
          cname={infoobj.cname}
          text={infoobj.text}
          action={infoobj.action}
        />
      )}
      <div className="flex justify-center px-3">
        <div className="w-[50rem]">
          {data.length == 0 ? (
            <p className={`${tc} font-bold text-3xl text-center `}>
              No File uploded yet
            </p>
          ) : (
            <div className="dark:shadow-teal-500 shadow-pink-600 shadow-2xl rounded-box ">
              <ul className="list overflow-auto max-h-[86vh]">
                <li className="p-4 text-xs dark:text-white text-black  text-center opacity-60 tracking-wide">
                  Files you uploded
                </li>
                {[...data].map((eachdata, i) => (
                  <li className="list-row" key={i}>
                    <h4 className="text-4xl dark:text-white text-black font-thin dark:opacity-30 tabular-nums">
                      {i + 1}
                    </h4>
                    <div className="list-col-grow">
                      <h3 className="dark:text-white  font text-black">
                        {eachdata.filename}
                      </h3>
                      <p className="text-xs dark:text-white text-black uppercase font-semibold opacity-60">
                        {eachdata.filetype}
                      </p>
                    </div>
                    <a
                      className="btn btn-info btn-sm"
                      href={getDownloadUrl(eachdata.pathurl)}
                    >
                      <BiDownload />
                    </a>
                    <Iconbutton
                      cname="bg-red-500 btn-sm border-0 hover:bg-red-400"
                      icon1={<MdDelete />}
                      func={() => delete_file(eachdata._id)}
                    />
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
