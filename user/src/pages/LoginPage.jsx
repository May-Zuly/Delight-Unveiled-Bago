import { Form, Input, Button, Card } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import api from "../api/helper";
import "./LoginPage.css";

const LoginPage = () => {
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
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src="/src/assets/images/logo-old.png" alt="Club" />
          <div className="login-description">
            <h2>Delight Unveilied:</h2>
            <p>Join our community and become a club member.</p>
          </div>
        </div>
        <div className="login-form-container">
          <Card className="outer-card">
            <Form
              name="login_form"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Card className="inner-card">
                <h2>Keep Connected</h2>
                <p>Login with your credential to access your account</p>
                <Form.Item
                  name="identifier"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <a className="login-form-forgot" href="">
                    Forgot password?
                  </a>
                </Form.Item>
              </Card>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="default" className="create-account-button">
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
