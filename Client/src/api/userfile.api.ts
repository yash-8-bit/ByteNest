import Api from "./config/axios";

const getFile = async () => {
  let response = await Api.get("/userfile");
  return response.data;
};

const uploadFile = async (filedata: FormData) => {
  let response = await Api.post("/userfile", filedata);
  return response.data;
};

const deleteFile = async (_id: string) => {
  let response = await Api.delete(`/userfile/${_id}`);
  return response.data;
};

export { getFile, uploadFile, deleteFile };
