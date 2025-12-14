import Api from "./config/axios";


const accountDetails = async () => {
  let response = await Api.get("/user");
  return response.data;
};

const accountDelete = async () => {
  let response = await Api.delete("/user");
  return response.data;
};

export { accountDelete,accountDetails };
