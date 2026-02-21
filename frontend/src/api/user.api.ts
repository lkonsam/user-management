import API from "./axios";
import type { User, UsersObject } from "../types/auth.types";

export const getUsers = async (): Promise<UsersObject> => {
  const res = await API.get<UsersObject>("/users");
  return res.data;
};

export const updateUserStatus = async (
  id: number,
  status: boolean
) => {
  const res = await API.patch(`/users/${id}/status`, { isActive: status });
  return res.data;
};


export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}) => {
  const res = await API.post("/users", data);
  return res.data;
};
