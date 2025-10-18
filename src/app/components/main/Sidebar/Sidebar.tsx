"use client";
import React, { useState, ReactNode, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Button,
  Layout,
  Menu,
  Col,
  Row,
  Avatar,
  Dropdown,
  Typography,
  message,
  Drawer,
  Grid,
} from "antd";
import { useRouter } from "next/navigation";
import { CircleUserRound, Package } from "lucide-react";
import GreetingContent from "../GreetingContent/GreetingContent";
import { clearAuthData } from "@/app/utils/auth.utils";
import { setAuthToken } from "@/hooks/authapi";
import { FaLocationArrow } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export default function Sidemenu({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();

  const handleMenuBarFun = ({ key }: { key: string }) => {
    if (key === "1") {
      router.push("/admin/dashboard");
    } else if (key === "2") {
      router.push("/admin/categories");
    } else if (key === "3") {
      router.push("/admin/location");
    }
    setDrawerOpen(false); 
  };

  const handleLogout = () => {
    clearAuthData();
    setAuthToken(null);
    message.success("Logged out successfully");
    router.push("/");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: "1",
      icon: <AiFillDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <MdCategory className="w-5 h-5" />,
      label: "Catalog-Services",
    },
    {
      key: "3",
      icon: <FaLocationArrow className="w-5 h-5" />,
      label: "Location",
    },
  ];

  useEffect(() => {
    if (!screens.md) {
      setCollapsed(true);
    }
  }, [screens]);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {screens.md && (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={280}
            collapsedWidth={80}
            className="custom-sider"
          >
            <div className="sidebar-brand">
              <div className="brand-content">
                <div className="brand-icon">
                  <Package className="w-8 h-8 text-white" />
                </div>
                {!collapsed && (
                  <div className="brand-text">
                    <Text className="brand-title">AdminPanel</Text>
                    <Text className="brand-subtitle">Management</Text>
                  </div>
                )}
              </div>
            </div>

            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              onClick={handleMenuBarFun}
              className="custom-menu"
              items={menuItems}
            />
          </Sider>
        )}

        <Layout className="main-layout">
          <Header className="custom-header">
            <Row align="middle" style={{ height: "100%" }}>
              <Col flex="auto">
                <div className="header-left">
                  {screens.md ? (
                    <Button
                      type="text"
                      icon={
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                      onClick={() => setCollapsed(!collapsed)}
                      className="menu-toggle-btn"
                    />
                  ) : (
                    <Button
                      type="text"
                      icon={<MenuUnfoldOutlined />}
                      onClick={() => setDrawerOpen(true)}
                      className="menu-toggle-btn"
                    />
                  )}
                  <div className="greeting-section">
                    <GreetingContent />
                  </div>
                </div>
              </Col>
              <Col>
                <div className="header-right">
                  <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    arrow
                    trigger={["click"]}
                  >
                    <div className="user-profile-dropdown cursor-pointer">
                      <Avatar
                        size={40}
                        className="user-avatar"
                        icon={<CircleUserRound className="w-5 h-5" />}
                      />
                    </div>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Header>

          <Content className="main-content">{children}</Content>
        </Layout>
      </Layout>

      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuBarFun}
          items={menuItems}
        />
      </Drawer>
    </>
  );
}
