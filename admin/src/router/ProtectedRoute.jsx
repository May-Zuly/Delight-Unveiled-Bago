import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const pathname = useLocation().pathname;
  const isLogin = true;

  if (!isLogin) return <Navigate to="/login" />;
  if (pathname === "/") return <Navigate to="/home" />;

  return children;
};
