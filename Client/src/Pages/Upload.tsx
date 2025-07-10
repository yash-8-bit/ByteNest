import React, { useState, type FormEvent } from "react";
import Dropzone from "react-dropzone";
import { tc } from "../components/style/main";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useUploadfile } from "../apis/userfile.api";
import type { AlertType } from "../types/alert.type";
import Alert from "../components/Alert";

const FileDropZone = ({ setvalue }: any) => {
  const [fileName, setFileName] = useState<string>("");
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        setvalue(acceptedFiles[0]);
        setFileName(acceptedFiles[0].name);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section
          className="border-2 border-dashed w-fit rounded-xl
         border-[#00d390] hover:border-solid hover:border-4 transition-all"
        >
          <div className="p-8 cursor-pointer py-15" {...getRootProps()}>
            <input required {...getInputProps()} />
            <p className={`${tc} text-center text-xl font-bold opacity-40`}>
              {fileName == ""
                ? "Drag & drop some files here, or click to select files"
                : `FileName :  ${fileName}`}
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

function Upload() {
  const navigate = useNavigate();
  const [filevalue, setFilevalue] = useState<File>();
  const [newFileName, setNewFileName] = useState<string>("");
  const [infoobj, setInfoobj] = useState<AlertType>({
    text: "",
    action: () => {},
    cname: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setShow(true);
      if (!filevalue) return;
      const fd = new FormData();
      fd.append("__file__", filevalue);
      fd.append("filename", newFileName);
      const data = await useUploadfile(fd);
      setInfoobj({
        text: data.message,
        action: () => {
          navigate("/user-home");
          setShow(false);
        },
        cname: "alert-success",
      });
    } catch (error: any) {
      setShow(true);
      if (error.response && error.response.data) {
        setInfoobj({
          text: error.response.data.message,
          action: () => {
            navigate("/upload");
            setShow(false);
          },
          cname: "alert-error",
        });
        return;
      }
      setInfoobj({
        text: error.message,
        action: () => {
          navigate("/upload");
          setShow(false);
        },
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
      <div className="flex justify-center items-center ">
        <div className="px-4 mt-32">
          <Link
            className={`${tc} p-2 rounded bg-black/30 w-fit flex gap-2 place-items-center`}
            to={"/user-home"}
          >
            <BiLeftArrowAlt />
          </Link>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              value={newFileName}
              cname="input-success w-full"
              heading="Enter Filename you want:"
              placeholder="Filename"
              onchange={(e) => setNewFileName(e.target.value)}
            />
            <FileDropZone setvalue={setFilevalue} />
            <div className="grid place-items-center">
              <Button
                text="Submit"
                cname={`btn-wide btn-success`}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Upload;
