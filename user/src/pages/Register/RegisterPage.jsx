import "./RegisterPage.css";

import { Button, Form, Input, Typography, message } from "antd";
import {
  FormOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

import api from "../../api/helper";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const formData = new FormData();
    const data = {
      username: values.name,
      email: values.email,
      password: values.password,
      confirm: true,
      block: false,
      role: 1,
      address: values.address,
      phoneNumber: values.phone,
      type: "customer",
    };
    formData.append("data", JSON.stringify(data));
    console.log("Form data : ", formData);
    try {
      const res = await api.post("auth/local/register", data, {
        headers: { requireToken: false },
      });
      if (res.data) {
        console.log("Login data : ", res.data);
        localStorage.setItem("loginUser", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error in register user : ",
        error?.response?.data?.error?.message
      );
      messageApi.open({
        type: "error",
        content: error?.response?.data?.error?.message,
      });
    }
  };

  return (
    <div className="registerBg">
      <>{contextHolder}</>
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
            {"Already have an account? "}
            <a onClick={() => navigate("/login")}>Sign In</a>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
