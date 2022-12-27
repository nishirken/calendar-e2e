import axios from "axios";
import { API_ORIGIN } from "./const";

const instance = axios.create({
  baseURL: API_ORIGIN,
  timeout: 1000,
  proxy: false,
});

export const signup = (email: string, password: string) => {
  return instance.post("/auth/signup", { email, password });
};
