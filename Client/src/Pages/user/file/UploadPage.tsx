import { useState, type JSX } from "react";
import Dropzone from "react-dropzone";
import { tc } from "../../../components/style/main";
import {  useNavigate } from "react-router";
import { uploadFile } from "../../../api/userfile.api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ApiFunction } from "../../../utils/apifunction.util";
import toast from "react-hot-toast";
import MyBottomNavigation from "../../../components/MyBottomNavigation";

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
          <div className="p-1 cursor-pointer py-15" {...getRootProps()}>
            <input required  {...getInputProps()} />
            <p className={`${tc} text-center text-wrap text-sm md:text-xl opacity-40`}>
              {fileName == ""
                ? "Drag & drop file here, or click to select file"
                : `file name :  ${fileName}`}
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

  const handleSubmit = async (e: any) => {
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
      <MyBottomNavigation />
      <div className="flex p-4 justify-center items-center h-[80vh]">
        <div className="p-4 w-full md:max-w-xl border dark:border-gray-100/30 border-gray-400">
          <form onSubmit={handleSubmit} className="flex  flex-col gap-3">
            <p className={`${tc}  text-center`}>Manage Your File</p>
            <TextField
              value={newFileName}
              size="small"
              label="Enter Filename"
              onChange={(e) => setNewFileName(e.target.value)}
              required
              slotProps={{
                htmlInput : {
                  maxLength : 35
                }
              }}
            />
            <FileDropZone setvalue={setFilevalue} />
            <Button loading={isloading} variant="contained" type="submit" >Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadPage;
