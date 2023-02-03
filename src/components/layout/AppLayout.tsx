import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";

import SideNav from "./SideNav";
import Header from "./Header";

const { Header: AntHeader, Sider } = Layout;
const { Content } = Layout;

function AppLayout() {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sideNavType, setSideNavType] = useState("transparent");

  const openDrawer = () => setVisible(!visible);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sideNavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sideNavType }}
          >
            <SideNav />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sideNavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sideNavType }}
      >
        <SideNav />
      </Sider>
      <Layout>
        <Affix>
          <AntHeader
            className="ant-header-fixed "
            style={{ backgroundColor: "white" }}
          >
            <Header
              onPress={openDrawer}
              subName={pathname}
              // handleSideNavColor={handleSideNavColor}
              // handleSideNavType={handleSideNavType}
            />
          </AntHeader>
        </Affix>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
