import API from "./api";
import type { User } from "../types/auth.types";


interface UsersObject {
  users: User[];
}
export const getUsers = async (): Promise<UsersObject> => {
  const res = await API.get<UsersObject>("/users");
  return res.data;
};

export const updateUserStatus = async (
  id: number,
  status: "ACTIVE" | "INACTIVE"
) => {
  const res = await API.patch(`/users/${id}/status`, { status: status });
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

export const updateUser = async (
  data: { 
    name?: string; 
    email?: string; 
    role?: "ADMIN" | "USER",
    self?: boolean,
    id?: number,
  }) => {
  const { id, self, ...updateData } = data;
  const endpoint = self || !id ? `/users/profile` : `/users/${id}`;
  const res = await API.put(endpoint, updateData);
  return res.data;
};