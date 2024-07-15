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

const { Header } = Layout;

const Navbar = () => {
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
          <Menu mode="horizontal" className="menu">
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about-us">About Us</Link>
            </Menu.Item>
            <Menu.Item key="product">
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact-us">Contact Us</Link>
            </Menu.Item>
          </Menu>
          <div className="icons">
            <Button shape="circle" icon={<SearchOutlined />} />
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Button shape="circle" icon={<UserOutlined />} />
            </Dropdown>
            <Button shape="circle" icon={<ShoppingOutlined />} />
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
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about-us">About Us</Link>
            </Menu.Item>
            <Menu.Item key="product">
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact-us">Contact Us</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </Header>
  );
};

export default Navbar;
