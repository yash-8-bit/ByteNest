import ls from "../utils/ls.util";
import Api from "./config/axios";

const token = ls.ls1.get();
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const getFile = async () => {
  let response = await Api.get("/userfile/get-files", config);
  return response.data;
};

const uploadFile = async (filedata: FormData) => {
  let response = await Api.post("/userfile/upload-file", filedata, config);
  return response.data;
};

const deleteFile = async (_id: string) => {
  let response = await Api.delete(`/userfile/delete-file/${_id}`, config);
  return response.data;
};

export { getFile,uploadFile,deleteFile};
