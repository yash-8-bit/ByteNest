import Api from "./config/axios";


const accountDetails = async () => {
  let response = await Api.get("/user/details");
  return response.data;
};

const accountDelete = async () => {
  let response = await Api.delete("/user/delete");
  return response.data;
};

export { accountDelete,accountDetails };
