import ls from "../utils/ls.logic";
import Call from "./setting";

const token = ls.ls1.get();
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const getFile = async () => {
  let response = await Call.get("/userfile/get-files", config);
  return response.data;
};

const uploadFile = async (filedata: FormData) => {
  let response = await Call.post("/userfile/upload-file", filedata, config);
  return response.data;
};

const deleteFile = async (_id: string) => {
  let response = await Call.delete(`/userfile/delete-file/${_id}`, config);
  return response.data;
};

export { getFile,uploadFile,deleteFile};
