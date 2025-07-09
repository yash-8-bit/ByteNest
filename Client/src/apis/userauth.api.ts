import type { UserAuthType } from "../types/user.type";
import Call from "./setting";

const useLogin = async ({ username, password }: UserAuthType) => {
  let response = await Call.post("/api/userauth/login", { username, password });
  return response.data;
};

const useRegister = async ({ name, username, password }: UserAuthType) => {
  let response = await Call.post("/api/userauth/register", {
    name,
    username,
    password,
  });
  return response.data;
};

export { useLogin, useRegister };
