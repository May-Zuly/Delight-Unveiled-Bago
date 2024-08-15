import { Button, Col, Form, Input, Row, Card, message } from "antd";
import api from "../api/helper";
import { token } from "../store";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import "./ChangePassword.css"; // Import the CSS file

export default function ChangePassword({ setShowChangePasswordModal }) {
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
    <div className="change-password-container">
      <Card
        title="Change Password"
        bordered={false}
        className="change-password-card"
      >
        <Form
          layout="vertical"
          className="change-password-form"
          autoComplete="off"
          form={form}
          onFinish={onHandleSumbit}
        >
          <Row gutter={16}>
            <Col xs={24} md={22}>
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
          <Row gutter={16}>
            <Col xs={24} md={22}>
              <Form.Item
                label="New Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
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
          <Row gutter={16}>
            <Col xs={24} md={22}>
              <Form.Item
                label="Confirm New Password"
                name="passwordConfirmation"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "New Password and Confirm New Password do not match"
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
          <Form.Item>
            <div className="form-buttons">
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
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
