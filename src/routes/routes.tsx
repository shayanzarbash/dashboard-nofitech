import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage.tsx";
import ProtectedRoute from "./ProtectRoute.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";
import UsersPage from "../pages/user/UsersPage.tsx";
import UserDetailPage from "../pages/detail/DetailPage.tsx";
import LogsPage from "../pages/log/LogsPage.tsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

          <Route
              element={
                  <ProtectedRoute>
                      <DashboardLayout />
                  </ProtectedRoute>
              }
          >
              <Route path="/users" element={<UsersPage />} />
          </Route>

          <Route
              element={
                  <ProtectedRoute>
                      <DashboardLayout />
                  </ProtectedRoute>
              }
          >
              <Route path="/users/:id" element={<UserDetailPage />} />
          </Route>

          <Route
              element={
                  <ProtectedRoute>
                      <DashboardLayout />
                  </ProtectedRoute>
              }
          >
              <Route path="/logs" element={<LogsPage />} />
          </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
