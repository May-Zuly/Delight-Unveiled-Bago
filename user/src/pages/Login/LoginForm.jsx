import "./LoginForm.css";

import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";

import api from "../../api/helper";
import { useNavigate } from "react-router-dom";

function LoginFormApp() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const res = await api.post("auth/local", values, {
        headers: { requireToken: false },
      });
      messageApi.open({
        type: "success",
        content: "Login Successful!",
      });
      if (res.data) {
        console.log("Login data : ", res.data);
        localStorage.setItem("loginUser", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error : ", error);
      messageApi.open({
        type: "error",
        content: "Invalid email or password!",
      });
    }
  };

  return (
    <div className="formBg">
      <>{contextHolder}</>
      <Form className="loginForm" onFinish={onFinish}>
        <Typography.Title style={{ textAlign: "center" }}>
          Sign In
        </Typography.Title>
        <Form.Item
          name="identifier"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter valid email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            style={{ borderRadius: "40px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            style={{ borderRadius: "40px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<LoginOutlined />}
            htmlType="submit"
            block
            style={{ borderRadius: "40px" }}
          >
            Sign In
          </Button>
          <p>
            {" "}
            {"Don't have an account? "}
            <a onClick={() => navigate("/register")}>Sign Up</a>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
}
export default LoginFormApp;
