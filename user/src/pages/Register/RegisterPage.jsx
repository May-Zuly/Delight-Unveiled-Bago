import React from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Select,
  Divider,
  message,
} from "antd";
import {
  FacebookOutlined,
  GoogleOutlined,
  MailOutlined,
  TwitterOutlined,
  LockOutlined,
  UserAddOutlined,
  UserOutlined,
  AntDesignOutlined,
  PhoneOutlined,
  PhoneFilled,
  UserSwitchOutlined,
  FormOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import "./RegisterPage.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function Register() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Handle registration logic here
  };
  const login = () => {
    message.success("Login Successful!");
  };
  return (
    <div className="registerBg">
      <Form className="registerForm" onFinish={onFinish}>
        <Typography.Title style={{ textAlign: "center" }}>
          Sign Up
        </Typography.Title>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Name"
            style={{ borderRadius: "40px" }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
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
            prefix={<LockOutlined />}
            placeholder="Password"
            style={{ borderRadius: "40px" }}
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter your address",
            },
          ]}
        >
          <Input
            prefix={<FormOutlined />}
            placeholder="Address"
            style={{ borderRadius: "40px" }}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter your phone number",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Phone Number"
            style={{ borderRadius: "40px" }}
          />
        </Form.Item>
        <Form.Item
          name="userType"
          rules={[
            {
              required: true,
              message: "Please select your user type",
            },
          ]}
        >
          <Select
            suffixIcon={<UserSwitchOutlined />}
            placeholder="Select User Type"
            style={{ borderRadius: "40px" }}
          >
            <Option value="customer">Customer</Option>
            <Option value="producer">Producer</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<LoginOutlined />}
            htmlType="submit"
            block
            style={{ borderRadius: "40px" }}
          >
            Sign Up
          </Button>
          <p>
            {" "}
            Already have an account?
            <a onClick={() => navigate("/login")}>Sign In</a>
          </p>
        </Form.Item>
        <Divider style={{ borderColor: "black" }}>or SignUp with</Divider>
        <div className="socialLogin">
          <GoogleOutlined
            className="socialIcon"
            onClick={login}
            style={{ color: "red" }}
          />
          <FacebookOutlined
            className="socialIcon"
            onClick={login}
            style={{ color: "blue" }}
          />
          <TwitterOutlined
            className="socialIcon"
            onClick={login}
            style={{ color: "cyan" }}
          />
        </div>
      </Form>
    </div>
  );
}

export default Register;
