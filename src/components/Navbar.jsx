import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Button, Drawer } from 'antd';
import { SearchOutlined, UserOutlined, ShoppingOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons';
import './Navbar.css';

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="blog">
      <a href="blog.html">Blog Grid</a>
    </Menu.Item>
    <Menu.Item key="feature">
      <a href="feature.html">Our Features</a>
    </Menu.Item>
    <Menu.Item key="testimonial">
      <a href="testimonial.html">Testimonial</a>
    </Menu.Item>
    <Menu.Item key="404">
      <a href="404.html">404 Page</a>
    </Menu.Item>
  </Menu>
);

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Header className="navbar-header">
      <div className="navbar">
        <a href="index.html" className="brand">
          <h1>F<span>oo</span>dy</h1>
        </a>
        <div className="menu-container">
          <Menu mode="horizontal" className="menu">
            <Menu.Item key="home"><a href="index.html">Home</a></Menu.Item>
            <Menu.Item key="about"><a href="about.html">About Us</a></Menu.Item>
            <Menu.Item key="product"><a href="product.html">Products</a></Menu.Item>
            <Menu.Item key="pages">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Pages <DownOutlined />
                </a>
              </Dropdown>
            </Menu.Item>
            <Menu.Item key="contact"><a href="contact.html">Contact Us</a></Menu.Item>
          </Menu>
          <div className="icons">
            <Button shape="circle" icon={<SearchOutlined />} />
            <Button shape="circle" icon={<UserOutlined />} />
            <Button shape="circle" icon={<ShoppingOutlined />} />
          </div>
          <Button className="menu-toggle" type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
        </div>
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <Menu mode="vertical">
            <Menu.Item key="home"><a href="index.html">Home</a></Menu.Item>
            <Menu.Item key="about"><a href="about.html">About Us</a></Menu.Item>
            <Menu.Item key="product"><a href="product.html">Products</a></Menu.Item>
            <Menu.Item key="pages">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Pages <DownOutlined />
                </a>
              </Dropdown>
            </Menu.Item>
            <Menu.Item key="contact"><a href="contact.html">Contact Us</a></Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </Header>
  );
};

export default Navbar;
