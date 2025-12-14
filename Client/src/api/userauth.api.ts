import type { UserAuthType } from "../types/user.type";
import Api from "./config/axios";

const login = async (data: UserAuthType) => {
  let response = await Api.post("/auth/login", data);
  return response.data;
};

const register = async (data: UserAuthType) => {
  let response = await Api.post("/auth/register", data);
  return response.data;
};

export { login,register };
