import { Navigate, useLocation } from "react-router-dom";

import { token } from "../store";
import { useRecoilValue } from "recoil";

export const ProtectedRoute = ({ children }) => {
  const pathname = useLocation().pathname;
  const loginToken = useRecoilValue(token);

  if (!loginToken) return <Navigate to="/login" />;
  if (pathname === "/") return <Navigate to="/home" />;

  return children;
};
