import API from "./api";
import type { LoginResponse } from "../types/auth.types";

export const login = async (email: string, password: string) => {
  const res = await API.post<LoginResponse>("/auth/login", { email, password });
  return res.data;
};