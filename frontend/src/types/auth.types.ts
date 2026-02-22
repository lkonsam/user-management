export type Role = "ADMIN" | "USER";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
