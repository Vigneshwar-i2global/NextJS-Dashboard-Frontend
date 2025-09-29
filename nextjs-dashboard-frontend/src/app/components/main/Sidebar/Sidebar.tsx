"use client";
import React, { useState, ReactNode } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Col, Row, Avatar, Dropdown, Typography } from "antd";
import { useRouter } from "next/navigation";
import { CircleUserRound, Package, Home } from "lucide-react";
import GreetingContent from "../GreetingContent/GreetingContent";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function Sidemenu({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const handleMenuBarFun = ({ key }: { key: string }) => {
    if (key === "1") {
      router.push("/admin/dashboard");
    } else if (key === "5") {
      router.push("/admin/shop");
    } else {
      router.push("/admin/categories");
    }
  };

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="custom-sider"
          width={280}
          collapsedWidth={80}
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
            onClick={(info) => {
              handleMenuBarFun(info);
            }}
            className="custom-menu"
            items={[
              {
                key: "1",
                icon: <Home className="w-5 h-5" />,
                label: "Dashboard",
                className: "menu-item-custom",
              },
              {
                key: "2",
                icon: <Home className="w-5 h-5" />,
                label: "Categories",
                className: "menu-item-custom",
              
              },
            ]}
          />
        </Sider>

        <Layout className="main-layout">
          <Header className="custom-header">
            <Row align="middle" style={{ height: "100%" }}>
              <Col flex="auto">
                <div className="header-left">
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    className="menu-toggle-btn"
                  />
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
                    trigger={['click']}
                  >
                    <div className="user-profile-dropdown">
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
          
          <Content className="main-content">
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}