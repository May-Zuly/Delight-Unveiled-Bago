import { Avatar, Button, Col, Dropdown, Modal, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { token, userData } from "../store";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function HeaderMenu({ collapsed, setCollapsed }) {
  const user = useRecoilValue(userData);
  const setToken = useSetRecoilState(token);
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken("");
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
      icon: <UnlockOutlined />,
      label: <Link to="/change_password">Change Password</Link>,
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <>
      <Row style={{ padding: "20px", background: "#e1e1e1" }}>
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
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
          </Dropdown>
          <span style={{ marginRight: "15px", fontSize: "16px" }}>
            {user.username}
          </span>
        </Col>
      </Row>
    </>
  );
}
