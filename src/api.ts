import axios from "axios";
import { API_ORIGIN } from "./const";
import chance from "chance";

const instance = axios.create({
  baseURL: API_ORIGIN,
  timeout: 1000,
  proxy: false,
});

export type AuthCreds = {
  email: string;
  password: string;
};

export const signup = async (): Promise<AuthCreds> => {
  const email = new chance().email({ length: 10 });
  const password = "PPaa@12345";

  const { data } = await instance.post("/auth/signup", { email, password });

  return { email: data.email, password };
};
