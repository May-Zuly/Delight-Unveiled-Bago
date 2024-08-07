import { Navigate, useLocation } from "react-router-dom";
import { token, userData } from "../store";

import { useRecoilValue } from "recoil";

export const ProtectedRoute = ({ children }) => {
  const pathname = useLocation().pathname;
  const loginToken = useRecoilValue(token);
  const loginUser = useRecoilValue(userData);

  if (!loginToken) return <Navigate to="/login" />;
  if (loginUser.permissions.includes(pathname)) {
    return children;
  }
  return <Navigate to="/login" />;
};
