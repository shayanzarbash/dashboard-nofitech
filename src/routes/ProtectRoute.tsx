import type { JSX } from "react";
import { useAuthStore } from "../store/auth.store";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);
  const token = localStorage.getItem("authToken");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
