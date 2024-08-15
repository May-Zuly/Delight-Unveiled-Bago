import "./style/_common.scss";
import "./style/_responsive.scss";
import "./style/_reset.scss";

import { Route, Routes } from "react-router-dom";

import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import RouterRoute from "./router";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<RouterRoute />} />
    </Routes>
  );
}
