import React from "react";
import { Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./LogoutPage.css";

const { Title } = Typography;

const LogoutPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loginUser");
    message.success("Logout Successful!");
    navigate("/login");
  };

  return (
    <div className="logout-container">
      <Title level={2} style={{ textAlign: "center" }}>
        You have been logged out
      </Title>
      <Button type="primary" onClick={logout} block style={{ borderRadius: "40px", marginTop: "20px" }}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutPage;
