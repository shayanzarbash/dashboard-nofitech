import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);
  const token = localStorage.getItem("authToken");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
