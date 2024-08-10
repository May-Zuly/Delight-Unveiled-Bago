import {
  AppstoreOutlined,
  FileDoneOutlined,
  HomeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import logoImg from "../assets/images/logo.png";
import { useRecoilValue } from "recoil";
import { userData } from "../store";

const { Sider } = Layout;

export default function Sidebar({ collapsed }) {
  const loginUser = useRecoilValue(userData);
  let openkeys = useLocation().pathname;
  const pathname = useLocation().pathname;
  if (openkeys.split("/").length > 2) openkeys = `/${openkeys.split("/")[1]}`;
  openkeys = `${openkeys}tag`;

  const menuItems = [
    {
      key: "/home",
      icon: <HomeOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: <Link to="/home">Home</Link>,
      role: ["admin"],
    },
    {
      key: "/order",
      icon: <FileDoneOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: <Link to="/order">Orders</Link>,
      role: ["admin", "producer"],
    },
    {
      key: "/producttag",
      icon: <AppstoreOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: "Product Management",
      children: [
        {
          key: "/product",
          label: <Link to="/product">Products</Link>,
        },
        {
          key: "/product/create",
          label: <Link to="/product/create">Create</Link>,
        },
      ],
      role: ["admin", "producer"],
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
      role: ["admin"],
    },
  ];
  const filterMenu = menuItems.filter((menu) =>
    menu.role.includes(loginUser.type)
  );
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
        <img src={logoImg} width={collapsed ? "50px" : "80px"} />
      </div>
      <Menu
        theme="light"
        defaultOpenKeys={[openkeys]}
        defaultSelectedKeys={[pathname]}
        mode="inline"
        style={{
          padding: "10px",
        }}
        items={filterMenu}
      />
    </Sider>
  );
}
