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
      label: (
        <Link
          to="/home"
          style={{ color: "#000", fontSize: "16px" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#995f20")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
          onMouseDown={(e) => (e.currentTarget.style.color = "#d0a97b")}
        >
          Home
        </Link>
      ),
      role: ["admin", "producer"],
    },
    {
      key: "/order",
      icon: <FileDoneOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: (
        <Link
          to="/order"
          style={{ color: "#000", fontSize: "16px" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#995f20")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
          onMouseDown={(e) => (e.currentTarget.style.color = "#d0a97b")}
        >
          Orders
        </Link>
      ),
      role: ["admin", "producer"],
    },
    {
      key: "/producttag",
      icon: <AppstoreOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: <span style={{ fontSize: "16px" }}>Product Management</span>,
      children: [
        {
          key: "/product",
          label: (
            <Link
              to="/product"
              style={{ color: "#000", fontSize: "16px" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#995f20")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
              onMouseDown={(e) => (e.currentTarget.style.color = "#d0a97b")}
            >
              Products
            </Link>
          ),
        },
        {
          key: "/product/create",
          label: (
            <Link
              to="/product/create"
              style={{ color: "#000", fontSize: "16px" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#995f20")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
              onMouseDown={(e) => (e.currentTarget.style.color = "#d0a97b")}
            >
              Create
            </Link>
          ),
        },
      ],
      role: ["admin", "producer"],
    },
    {
      key: "/usertag",
      icon: <UserAddOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: <span style={{ fontSize: "16px" }}>User Management</span>,
      children: [
        {
          key: "/user",
          label: (
            <Link
              to="/user"
              style={{ color: "#000", fontSize: "16px" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#995f20")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
              onMouseDown={(e) => (e.currentTarget.style.color = "#d0a97b")}
            >
              Users
            </Link>
          ),
        },
        {
          key: "/user/create",
          label: (
            <Link
              to="/user/create"
              style={{ color: "#000", fontSize: "16px" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#995f20")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#000")}
              onMouseDown={(e) => (e.currentTarget.style.color = "#d0a97b")}
            >
              Create
            </Link>
          ),
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
      width={270}
      collapsed={collapsed}
      style={{ background: "#f0dbc7" }}
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
        theme="#f0dbc7"
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
