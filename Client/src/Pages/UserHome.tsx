import React, { useState } from "react";
import type { UserFileType } from "../types/user.type";
import Iconbutton from "../components/Iconbutton";
import { BiDownload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { tc } from "../components/style/main";
import Alert from "../components/Alert";

const List = ({ data }: { data: UserFileType[] }) => {
  return (
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
            <Iconbutton cname="btn-info btn-sm" icon1={<BiDownload />} />
            <Iconbutton
              cname="bg-red-500 btn-sm border-0 hover:bg-red-400"
              icon1={<MdDelete />}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

function UserHome() {
  const [data, setData] = useState<UserFileType[]>([]);
  return (
    <div className="flex justify-center px-3">
      <div className="w-[50rem]">
        {data.length == 0 ? (
          <p className={`${tc} font-bold text-3xl text-center `}>
            No File uploded yet
          </p>
        ) : (
          <List data={data} />
        )}
      </div>
    </div>
  );
}

export default UserHome;
