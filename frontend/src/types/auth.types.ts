export type Role = "ADMIN" | "USER";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}


export interface UsersObject {
  users: User[];
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
