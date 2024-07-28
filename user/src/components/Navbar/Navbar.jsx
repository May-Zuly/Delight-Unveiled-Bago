import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Drawer, Dropdown } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingOutlined,
  MenuOutlined,
  ProfileOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { cart } from "../../store";
import { useRecoilValue } from "recoil";

const { Header } = Layout;

const Navbar = () => {
  const cartData = useRecoilValue(cart);
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<ProfileOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="container">
      <div className="navbar">
        <a href="index.html" className="brand">
          <img src="/src/assets/images/logo1.png" alt="" />
          <span className="brand-name">Delight Unveiled of Bago</span>
        </a>
        <div className="menu-container">
          <Menu mode="horizontal " className="menu">
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="product">
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact-us">Contact us</Link>
            </Menu.Item>
          </Menu>
          <div className="icons">
            <Button shape="circle" icon={<SearchOutlined />} />
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Button shape="circle" icon={<UserOutlined />} />
            </Dropdown>
            <div className="quantityButton">
              <Button
                shape="circle"
                onClick={() => navigate("/cart")}
                icon={<ShoppingOutlined />}
              />
              {cartData.length > 0 && (
                <div className="quantityIndicator">{cartData.length}</div>
              )}
            </div>
          </div>
          <Button
            className="menu-toggle"
            type="primary"
            onClick={showDrawer}
            icon={<MenuOutlined />}
          />
        </div>
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <Menu mode="vertical">
            <Menu.Item key="home">
              <a href="#home">Home</a>
            </Menu.Item>
            <Menu.Item key="feature">
              <a href="#feature">Features</a>
            </Menu.Item>
            <Menu.Item key="about">
              <a href="#about-us">About Us</a>
            </Menu.Item>
            <Menu.Item key="product">
              <a href="#product">Products</a>
            </Menu.Item>
            <Menu.Item key="contact">
              <a href="#contact-us">Contact Us</a>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </Header>
  );
};

export default Navbar;
