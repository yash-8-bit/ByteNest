import React, { useEffect, useState } from "react";
import type { UserFileType } from "../types/user.type";
import Iconbutton from "../components/Iconbutton";
import { BiDownload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { tc } from "../components/style/main";
import Alert from "../components/Alert";
import { useDeletefile, useGetfile } from "../apis/userfile.api";
import type { AlertType } from "../types/alert.type";
function UserHome() {
  const [data, setData] = useState<UserFileType[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [infoobj, setInfoobj] = useState<AlertType>({
    text: "",
    action: () => {
      setShow(false);
    },
    cname: "",
  });
  useEffect(() => {
    const get = async () => {
      try {
        const data = await useGetfile();
        setData(data.data);
      } catch (error: any) {
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
    get();
  }, []);
  const deleteFile = async (_id: string) => {
    try {
      const data_ = await useDeletefile(_id);
      setShow(true);
      setInfoobj({
        ...infoobj,
        text: data_.message,
        cname: "alert-success",
      });
    } catch (error: any) {
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
  return (
    <>
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
              <ul className="list">
                <li className="p-4 text-xs dark:text-white text-black  text-center opacity-60 tracking-wide">
                  Files you uploded
                </li>
                {data.map((eachdata, i) => (
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
                    <Iconbutton
                      cname="btn-info btn-sm"
                      icon1={<BiDownload />}
                    />
                    <Iconbutton
                      cname="bg-red-500 btn-sm border-0 hover:bg-red-400"
                      icon1={<MdDelete />}
                      func={() => deleteFile(eachdata._id)}
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
