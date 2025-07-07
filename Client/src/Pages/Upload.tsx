import React, { useState, type FormEvent } from "react";
import Dropzone from "react-dropzone";
import { tc } from "../components/style/main";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router";
import { BiLeftArrowAlt } from "react-icons/bi";

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
  const [filevalue, setFilevalue] = useState();
  const [newFileName, setNewFileName] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
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
  );
}

export default Upload;
