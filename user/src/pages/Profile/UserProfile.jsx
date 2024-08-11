import { useState, useEffect } from "react";
import { Card, Tabs, List, Avatar, Button, Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./UserProfile.css";
import dayjs from "dayjs";
import api from "../../api/helper";

const { TabPane } = Tabs;

const UserProfile = () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [userInfo, setUserInfo] = useState({
    id: loginUser.user.id,
    username: loginUser.user.username,
    email: loginUser.user.email,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    password: loginUser.user.password,
    phoneNumber: loginUser.user.phoneNumber,
    address: loginUser.user.address,
  });

  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get(`order/list?user_id=${loginUser.user.id}`, {
        headers: { requireToken: true },
      });
      setOrderHistory(res.data);
    } catch (error) {
      message.error("Error Occur");
    }
  };

  const handleUpdateProfile = async (data) => {
    try {
      const res = await api.put(`users/${data.id}`, data, {
        headers: { requireToken: true },
      });
      if (res.data) {
        setUserInfo(res.data);
      }
    } catch (error) {
      message.error("Error Occur");
    }
  };

  return (
    <div className="user-profile-container">
      <Card className="user-info-card">
        <div className="user-info">
          <Avatar size={100} src={userInfo.avatar} icon={<UserOutlined />} />
          <div className="user-details">
            <h2>{userInfo.username}</h2>
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
                  title={
                    <>
                      Product Name
                      {item.purchases.map((data, index) => (
                        <div key={index} style={{ marginLeft: "15px" }}>
                          - {data.product_name}
                        </div>
                      ))}
                    </>
                  }
                  description={
                    <>
                      Total Amount: {item.total} <br />
                      Date:{" "}
                      {dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss")}{" "}
                      <br />
                      Status: {item.status}
                    </>
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
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Name"
              name="username"
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

            <Form.Item label="Password" name="password">
              <Input.Password />
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
