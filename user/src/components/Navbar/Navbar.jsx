import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Drawer } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingOutlined,
  MenuOutlined,
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

  return (
    <Header className="container">
      <div className="navbar">
        <a href="index.html" className="brand">
          <h1>
            F<span>oo</span>dy
          </h1>
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
            <Button shape="circle" icon={<UserOutlined />} />
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
