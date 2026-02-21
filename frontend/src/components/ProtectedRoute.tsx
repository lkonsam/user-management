import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { Role } from "../types/auth.types";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  allowedRole?: Role;
}

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const context = useContext(AuthContext);

  if (!context?.user) {
    return <Navigate to="/" />;
  }

  if (allowedRole && context.user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
