import { Breadcrumb, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import HeaderMenu from "./HeaderMenu";
import SidebarNav from "./SidebarNav";

const { Content } = Layout;

export default function DefaultLayout({ children }) {
  const pathname = useLocation().pathname.split("/")[1];
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", () => {
      handleWindowResize();
    });
    return window.removeEventListener("resize", () => {
      handleWindowResize();
    });
  }, []);

  const handleWindowResize = () => {
    if (window.innerWidth < 992) setCollapsed(true);
    else setCollapsed(false);
  };
  return (
    <Layout style={{ minHeight: "97vh" }}>
      <SidebarNav collapsed={collapsed} />
      <Layout className="site-layout">
        <HeaderMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: "16px" }}>
          <Breadcrumb style={{marginBottom:"1rem"}}
            items={[
              { title: <Link to="/home">Home</Link> },
              { title: pathname },
            ]}
          />
          <div className="content-container">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
