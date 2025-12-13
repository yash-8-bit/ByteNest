import type { UserAuthType } from "../types/user.type";
import Api from "./config/axios";

const login = async ({ username, password }: UserAuthType) => {
  let response = await Api.post("/userauth/login", { username, password });
  return response.data;
};

const register = async ({ name, username, password }: UserAuthType) => {
  let response = await Api.post("/userauth/register", {
    name,
    username,
    password,
  });
  return response.data;
};

export { login,register };
