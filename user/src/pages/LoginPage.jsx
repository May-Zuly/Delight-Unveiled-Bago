import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import {  LockOutlined, MailOutlined } from '@ant-design/icons';
import './LoginPage.css';

 import api from "../api/helper";

import { useNavigate } from "react-router-dom";
//import { useSetRecoilState } from "recoil";
import { useState } from "react";



//const setUserData = useSetRecoilState(userData);
//const setToken = useSetRecoilState(token);


const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await api.post("auth/local", values, {
        headers: { requireToken: false },
      });
      if (res.data) {
        console.log(res.data);
        // navigate("/home");
        // setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };


  // const onFinish = async (value) => {
  //   setLoading(true);
  //   try {
  //     const res = await api.post("auth/local", value, {
  //       headers: { requireToken: false },
  //     });
  //     if (res.data) {
  //       setToken(res.data.jwt);
  //       setUserData(res.data.user);
  //       navigate("/home");
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };
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
         
          <Form
            name="login_form"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Card>
             <h2>Keep Connected</h2>
             <p>Login with your credential to access your account</p>
            
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
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
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" className="create-account-button">
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
