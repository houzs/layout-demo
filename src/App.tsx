import React from "react";
import { Space, Radio, Input, notification, Dropdown, Menu } from "antd";
import * as Icons from "@ant-design/icons";
import Layout from "./layout";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [layout, setLayout] = React.useState<"top" | "side" | "mix">("top");
  const [showUserType, setShowUserType] = React.useState<"normal" | "dropdown">(
    "normal"
  );
  const [rootUrl, setRootUrl] = React.useState<string>("/");
  const [headerHeight, setHeaderHeight] = React.useState<"default" | "large">(
    "default"
  );

  const menus = [
    {
      path: "/welcome",
      name: "欢迎",
      icon: <Icons.SmileOutlined />,
      component: "./Welcome",
    },
    {
      path: "/admin",
      name: "管理页",
      icon: <Icons.CrownOutlined />,
      access: "canAdmin",
      component: "./Admin",
      routes: [
        {
          path: "/admin/sub-page1",
          name: "一级页面",
          icon: <Icons.CrownOutlined />,
          component: "./Welcome",
        },
        {
          path: "/admin/sub-page2",
          name: "二级页面",
          icon: <Icons.CrownOutlined />,
          component: "./Welcome",
        },
        {
          path: "/admin/sub-page3",
          name: "三级页面",
          icon: <Icons.CrownOutlined />,
          component: "./Welcome",
        },
      ],
    },
    {
      name: "列表页",
      icon: <Icons.TabletOutlined />,
      path: "/list",
      component: "./ListTableList",
      routes: [
        {
          path: "/list/sub-page",
          name: "一级列表页面",
          icon: <Icons.CrownOutlined />,
          routes: [
            {
              path: "sub-sub-page1",
              name: "一一级列表页面",
              icon: <Icons.CrownOutlined />,
              component: "./Welcome",
            },
            {
              path: "sub-sub-page2",
              name: "一二级列表页面",
              icon: <Icons.CrownOutlined />,
              component: "./Welcome",
            },
            {
              path: "sub-sub-page3",
              name: "一三级列表页面",
              icon: <Icons.CrownOutlined />,
              component: "./Welcome",
            },
          ],
        },
        {
          path: "/list/sub-page2",
          name: "二级列表页面",
          icon: <Icons.CrownOutlined />,
          component: "./Welcome",
        },
        {
          path: "/list/sub-page3",
          name: "三级列表页面",
          icon: <Icons.CrownOutlined />,
          component: "./Welcome",
        },
      ],
    },
  ];

  const user = {
    name: "小团",
    login: "xiaotuan",
    avatarUrl:
      "https://s3plus.sankuai.com/v1/mss_b2add7e7651e40b8936fed8aabe7cf08/pixel-images-v1/%E5%B0%8F%E5%9B%A2%E5%A4%B4%E5%83%8F_fe4ba721695f2f8.jpeg",
  };

  return (
    <Layout
      title="Layout"
      logo="https://mtdui.sankuai.com/mtd/vue/favicon.png?1593345401990"
      headerHeight={headerHeight}
      menuType="menu"
      menu={menus}
      // @ts-ignore
      user={user}
      layout={layout}
      showUserType={showUserType}
      rootUrl={rootUrl}
      onLogout={() =>
        notification.info({
          message: "退出登陆",
          placement: "top",
        })
      }
      headerExtraRender={
        <Space size={32}>
          <Input prefix={<Icons.SearchOutlined />} placeholder="请搜索" />
          <a>消息</a>
          <a>帮助</a>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>通知111</Menu.Item>
                <Menu.Item>通知2222</Menu.Item>
                <Menu.Item>通知3333</Menu.Item>
              </Menu>
            }
          >
            <a>通知</a>
          </Dropdown>
        </Space>
      }
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 48px)",
        }}
        direction="vertical"
      >
        <Space direction="horizontal">
          <span>header高度:</span>
          <Radio.Group
            value={headerHeight}
            onChange={(e) => setHeaderHeight(e.target.value)}
          >
            <Radio value="default">default(48px)</Radio>
            <Radio value="large">large(60px)</Radio>
          </Radio.Group>
        </Space>
        <Space direction="horizontal">
          <span>布局方式:</span>
          <Radio.Group
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <Radio value="top">top(顶导)</Radio>
            <Radio value="side">side(侧导)</Radio>
            <Radio value="mix">mix(顶导与侧导结合)</Radio>
          </Radio.Group>
        </Space>
        <Space direction="horizontal">
          <span>用户信息展示:</span>
          <Radio.Group
            value={showUserType}
            onChange={(e) => setShowUserType(e.target.value)}
          >
            <Radio value="normal">normal(展示头像与名字)</Radio>
            <Radio value="dropdown">
              dropdown(只展示头像，hover下拉展示名字与头像)
            </Radio>
          </Radio.Group>
        </Space>
        <Space direction="horizontal">
          <span>点击logo跳转路径:</span>
          <Input
            placeholder="跳转路径"
            value={rootUrl}
            onChange={(e) => setRootUrl(e.target.value)}
          />
        </Space>
      </Space>
    </Layout>
  );
}

export default App;
