import {
  Button,
  Form,
  Input,
  Typography,
  Divider,
  message,
  Checkbox,
} from "antd";
import "./LoginForm.css";
import {
  FacebookOutlined,
  GoogleOutlined,
  MailOutlined,
  TwitterOutlined,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import api from "../../api/helper";

function LoginFormApp() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await api.post("auth/local", values, {
        headers: { requireToken: false },
      });
      if (res.data) {
        console.log("Login data : ", res.data);
        localStorage.setItem("loginUser", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error : ", error);
      alert(error.response.data.error.message);
    }
  };

  return (
    <div className="formBg">
      <Form className="loginForm" onFinish={onFinish}>
        <Typography.Title style={{ textAlign: "center" }}>
          Sign In
        </Typography.Title>
        {/* <Typography.Text>Login with your credential to access your account</Typography.Text> */}
        <Form.Item
          name="identifier"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter valid email",
            },
          ]}
          // label="Email"
          // name={"myEmail"}
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
          // label="Password"
          // name={"myPassword"}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            style={{ borderRadius: "40px" }}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a href="#">Forgot password?</a>
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
            Don't have an account?
            <a onClick={() => navigate("/register")}>Sign Up</a>
          </p>
        </Form.Item>
        <Divider style={{ borderColor: "black" }}>or SignIn with</Divider>
        <div className="socialLogin">
          <GoogleOutlined className="socialIcon" style={{ color: "red" }} />
          <FacebookOutlined className="socialIcon" style={{ color: "blue" }} />
          <TwitterOutlined className="socialIcon" style={{ color: "cyan" }} />
        </div>
      </Form>
    </div>
  );
}
export default LoginFormApp;
