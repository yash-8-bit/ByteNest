import Call from "./setting";

const token = "";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const useGetfile = async () => {
  let response = await Call.get("/api/user/get-files", config);
  return response.data;
};

const useUploadfile = async (filedata: FormData) => {
  let response = await Call.post("/api/user/upload-file", { filedata }, config);
  return response.data;
};

const useDeletefile = async (id: string) => {
  let response = await Call.post("/api/user/delete-file", { id }, config);
  return response.data;
};

export { useDeletefile, useGetfile, useUploadfile };
