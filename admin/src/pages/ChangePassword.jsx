import { Button, Col, Form, Input, Row, message } from "antd";

import api from "../api/helper";
import { token } from "../store";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const setToken = useSetRecoilState(token);

  const onHandleSumbit = async (value) => {
    setLoading(true);
    try {
      const res = await api.post("auth/change-password", value, {
        headers: { requireToken: true },
      });
      if (res.data) {
        setLoading(false);
        setToken("");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.error.message);
    }
  };
  return (
    <>
      <h2 className="title">Change Password</h2>
      <Form
        layout="vertical"
        className="merchant-form-item"
        autoComplete="off"
        form={form}
        onFinish={onHandleSumbit}
      >
        <Row>
          <Col xs={10} md={10}>
            <Form.Item
              label="Old Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
                },
                {
                  pattern: /^.{6,}$/,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
            >
              <Input.Password placeholder="Old Password" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={10} md={10}>
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your New Password!",
                },
                {
                  pattern: /^.{6,}$/,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={10} md={10}>
            <Form.Item
              label="Confirm New Password"
              name="passwordConfirmation"
              rules={[
                {
                  required: true,
                  message: "Please Type Confirm New Password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "New Password and Confirm New Password does not match"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 0 }} style={{ marginTop: "20px" }}>
          <Button
            onClick={() => {
              form.resetFields();
              setShowChangePasswordModal(false);
            }}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
