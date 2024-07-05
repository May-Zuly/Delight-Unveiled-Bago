import {
  AppstoreOutlined,
  FileDoneOutlined,
  HomeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import logoImg from "../assets/images/logo.png";

const { Sider } = Layout;

export default function Sidebar({ collapsed }) {
  let openkeys = useLocation().pathname;
  const pathname = useLocation().pathname;
  if (openkeys.split("/").length > 2) openkeys = `/${openkeys.split("/")[1]}`;
  openkeys = `${openkeys}tag`;

  const menuItems = [
    {
      key: "/home",
      icon: <HomeOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: <Link to="/home">Home</Link>,
    },
    {
      key: "/order",
      icon: <FileDoneOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: <Link to="/order">Orders</Link>,
    },
    {
      key: "/itemtag",
      icon: <AppstoreOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: "Product Management",
      children: [
        {
          key: "/item",
          label: <Link to="/item">Products</Link>,
        },
        {
          key: "/item/create",
          label: <Link to="/item/create">Create</Link>,
        },
      ],
    },
    {
      key: "/usertag",
      icon: <UserAddOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: "User Management",
      children: [
        {
          key: "/user",
          label: <Link to="/user">Users</Link>,
        },
        {
          key: "/user/create",
          label: <Link to="/user/create">Create</Link>,
        },
      ],
    },
  ];
  return (
    <Sider
      breakpoint="lg"
      width={255}
      collapsed={collapsed}
      style={{ background: "white" }}
    >
      <div
        className="logo"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <img src={logoImg} width={collapsed ? "50px" : "100px"} />
      </div>
      <Menu
        theme="light"
        defaultOpenKeys={[openkeys]}
        defaultSelectedKeys={[pathname]}
        mode="inline"
        style={{
          padding: "10px",
        }}
        items={menuItems}
      />
    </Sider>
  );
}
