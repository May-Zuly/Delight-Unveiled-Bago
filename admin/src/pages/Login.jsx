import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { api } from "../api/helper";
import logoImg from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userData } from "../store";

export default function Login() {
  const navigate = useNavigate();
  const setUserData = useSetRecoilState(userData);

  const onFinish = async (value) => {
    const res = await api.get("apiUrl");
    if (res.code === 200) {
      setUserData(value);
      navigate("/home");
    }
  };
  return (
    <div className="login-container">
      <div>
        <img src={logoImg} />
        <h2>Sign In</h2>
        <p>Welcome !! Please enter your details below to sign in.</p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            placeholder="Username"
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
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me?</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="button-container" type="primary">
            Login
          </Button>
        </Form.Item>
        <p>
          Don't have an account?
          <a href="/register" className="signup">
            Sign Up
          </a>
        </p>
      </Form>
    </div>
  );
}
