"use client";
import React, { useState, ReactNode } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  DashboardOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Col, Row, Modal } from "antd";
import { useRouter } from "next/navigation";
import GreetingContent from "./GreetingContent";
import { CircleUserRound,LayoutGrid } from "lucide-react";

const { Header, Sider, Content } = Layout;

export default function Sidemenu({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuBarFun = ({ key }: { key: string }) => {
    if (key === "1") {
      router.push("/pages/dashboard");
    } else if (key === "5") {
      router.push("/pages/shop");
    } else {
      router.push("/pages/categories");
    }
  };
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={(info) => {
              handleMenuBarFun(info);
            }}
            items={[
              {
                key: "1",
                icon: <DashboardOutlined />,
                label: "Dashboard",
              },
              // {
              //   key: "2",
              //   icon: <ShopOutlined />,
              //   label: "Shop",
              // },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Products",
                children: [
                  { key: "5", icon: <ShopOutlined />, label: "Shop" },
                  { key: "6", icon:<LayoutGrid className="w-[14px] h-[14px]" />, label: "Categories" },
                ],
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Row>
              <Col span={2}>
                {" "}
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Col>
              <Col span={20}>
                <GreetingContent />
              </Col>
              <Col span={2}>
                <Row justify="center" align="middle" style={{ height: "100%" }}>
                  <CircleUserRound />
                </Row>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
