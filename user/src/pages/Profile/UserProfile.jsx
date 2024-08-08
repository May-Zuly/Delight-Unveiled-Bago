import React, { useState } from "react";
import {
  Card,
  Tabs,
  List,
  Avatar,
  Button,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./UserProfile.css";

const { TabPane } = Tabs;
const { Text } = Typography;

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    password: "password123",
  });

  const [orderHistory, setOrderHistory] = useState([
    {
      id: 1,
      product: "Product 1",
      date: "2024-08-01",
      status: "Delivered",
    },
    {
      id: 2,
      product: "Product 2",
      date: "2024-08-05",
      status: "In Transit",
    },
  ]);

  const [savedProducts, setSavedProducts] = useState([
    {
      id: 1,
      product: "Product A",
      description: "Description of Product A",
      image: "https://via.placeholder.com/150",
      quantity: 2,
    },
    {
      id: 2,
      product: "Product B",
      description: "Description of Product B",
      image: "https://via.placeholder.com/150",
      quantity: 1,
    },
  ]);

  const handleUpdateProfile = (values) => {
    setUserInfo({ ...userInfo, ...values });
  };

  return (
    <div className="user-profile-container">
      <Card className="user-info-card">
        <div className="user-info">
          <Avatar size={100} src={userInfo.avatar} icon={<UserOutlined />} />
          <div className="user-details">
            <h2>{userInfo.name}</h2>
            <p>{userInfo.email}</p>
          </div>
        </div>
      </Card>

      <Tabs defaultActiveKey="1" className="profile-tabs">
        <TabPane tab="Order History" key="1">
          <List
            itemLayout="horizontal"
            dataSource={orderHistory}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.product}
                  description={`Date: ${item.date} - Status: ${item.status}`}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Saved Products" key="2">
          <List
            itemLayout="horizontal"
            dataSource={savedProducts}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} shape="square" size={64} />}
                  title={item.product}
                  description={
                    <div>
                      <Text>{item.description}</Text>
                      <br />
                      <Text strong>Quantity: {item.quantity}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Account Settings" key="3">
          <Form
            layout="vertical"
            initialValues={userInfo}
            onFinish={handleUpdateProfile}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#995f20",
                  borderColor: "#aa620f",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#dda15e";
                  e.currentTarget.style.borderColor = "#995f20";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#995f20";
                  e.currentTarget.style.borderColor = "#aa620f";
                }}
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserProfile;
