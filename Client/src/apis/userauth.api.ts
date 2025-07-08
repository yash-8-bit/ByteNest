import type { UserAuthType } from "../types/user.type";
import Call from "./setting";

const token = "";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const useLogin = async ({ username, password }: UserAuthType) => {
  let response = await Call.post("/api/user/login", { username, password });
  return response.data;
};

const useRegister = async ({ name, username, password }: UserAuthType) => {
  let response = await Call.post("/api/user/register", {
    name,
    username,
    password,
  });
  return response.data;
};

const useDelete = async () => {
  let response = await Call.delete("/api/user/delete", config);
  return response.data;
};

export { useLogin, useRegister, useDelete };
