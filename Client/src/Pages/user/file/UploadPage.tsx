import { useState, type FormEvent, type JSX } from "react";
import Dropzone from "react-dropzone";
import { tc } from "../../../components/style/main";
import {  useNavigate } from "react-router";
import { uploadFile } from "../../../api/userfile.api";
import Loading from "../../../components/MyLoading";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ApiFunction } from "../../../utils/apifunction.util";
import toast from "react-hot-toast";

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
          className="border  w-full rounded
         border-gray-300 hover:border-gray-500 transition-all"
        >
          <div className="p-8 cursor-pointer py-15" {...getRootProps()}>
            <input required {...getInputProps()} />
            <p className={`${tc} font text-center text-xl font-medium opacity-40`}>
              {fileName == ""
                ? "Drag & drop file here, or click to select file"
                : `FileName :  ${fileName}`}
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

function UploadPage(): JSX.Element {
  const navigate = useNavigate();
  const [filevalue, setFilevalue] = useState<File>();
  const [newFileName, setNewFileName] = useState<string>("");
  const [isloading, setIsloading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await ApiFunction({
      callback: async () => {
        e.preventDefault();
        if (!filevalue) {
          toast.error("Select file please")
          return;
        }
        const fd = new FormData();
        fd.append("__file__", filevalue);
        fd.append("filename", newFileName);
        await uploadFile(fd);
        toast.success("File upload success")
        navigate("/home")
      },
      setLoading: setIsloading
    })
  };
  return (
    <>
      {isloading && (
        <Loading />
      )}
      <div className="flex justify-center items-center h-[80vh]">
        <div className="p-4 border rounded dark:border-gray-100/30 border-gray-200 shadow-xl">
          <form onSubmit={handleSubmit} className="flex  flex-col gap-3">
            <p className={`${tc} font text-center font-semibold`}>File - Form</p>
            <TextField
              value={newFileName}
              label="Enter Filename"
              onChange={(e) => setNewFileName(e.target.value)}
              required
            />
            <FileDropZone setvalue={setFilevalue} />
            <Button variant="contained" type="submit" >Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadPage;
