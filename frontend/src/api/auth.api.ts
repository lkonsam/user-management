import axios from "axios";
import {API_BASE_URL} from "./api";
import type { LoginResponse } from "../types/auth.types";

//login function doesn't need to use API instance because it doesn't require the token in the header
export const login = async (email: string, password: string) => {
  const res = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, { email, password });
  return res.data;
};