import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined ,LoginOutlined} from "@ant-design/icons";
import { token, userData } from "../store";

import api from "../api/helper";
import logoImg from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const setUserData = useSetRecoilState(userData);
  const setToken = useSetRecoilState(token);
  const [loading, setLoading] = useState("");

  const onFinish = async (value) => {
    setLoading(true);
    try {
      const res = await api.post("auth/local", value, {
        headers: { requireToken: false },
      });
      if (res.data && res.data.user.type !== "customer") {
        setToken(res.data.jwt);
        const userData = { ...res.data.user };
        if (userData.type === "admin") {
          userData.permissions = [
            "/home",
            "/order",
            "/product",
            "/product/create",
            "/user",
            "/user/create",
          ];
        }
        if (userData.type === "producer") {
          userData.permissions = ["/order", "/product", "/product/create"];
        }
        setUserData(userData);
        navigate(userData.permissions[0]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div>
        <img src={logoImg} style={{marginBottom:'10px'}}/>
        <h2 style={{paddingBottom:'10px'}}>Sign In</h2>
        <p style={{paddingBottom:'5px'}}>Welcome !! Please enter your details below to sign in.</p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="identifier"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            placeholder="Email"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            icon={<LoginOutlined />}
            className="button-container"
            type="primary"
            disabled={loading}
          >
            Login
          </Button>
        </Form.Item>
        <p>
          Don't have an account?
          <a onClick={() => navigate("/register")} className="signup">
            Sign Up
          </a>
        </p>
      </Form>
    </div>
  );
}
