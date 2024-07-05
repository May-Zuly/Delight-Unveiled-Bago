import { Avatar, Button, Col, Dropdown, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function HeaderMenu({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      icon: <TeamOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <>
      <Row style={{ padding: "16px", background: "white" }}>
        <Col span={10}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              paddingTop: 0,
            }}
          />
        </Col>
        <Col span={14} style={{ direction: "rtl" }}>
          <Row>
            <Col span={4}>
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
