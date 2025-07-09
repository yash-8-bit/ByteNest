import Call from "./setting";

const token = "";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const useDetails = async () => {
  let response = await Call.get("/user/details", config);
  return response.data;
};

const useDelete = async () => {
  let response = await Call.delete("/user/delete", config);
  return response.data;
};

export { useDetails, useDelete };
