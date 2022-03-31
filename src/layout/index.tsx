import React, { useState } from "react";
import ProLayout from "@ant-design/pro-layout";
import "@ant-design/pro-layout/dist/layout.css";
import { Avatar, Space, Menu, Dropdown, Divider } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";
import { useMount } from "ahooks";
import { isFunction, isString } from "lodash";
import classNames from "classnames";

import type { WithFalse, LayoutSettings, User } from "./typings";
import defaultProps from "./_defaultProps";
import "./style/layout.scss";

export type LayoutProps = LayoutSettings & {
  logo?: React.ReactNode | WithFalse<() => React.ReactNode>;
  loading?: boolean;
  className?: string;
  content?: React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
  onLogout?: () => void;
  onMenuHeaderClick?: () => void;
};

const HeaderHeight = {
  default: 48,
  large: 60,
};

/** @name 通用Layout物料 */
const Layout: React.FC<LayoutProps> = (props = {} as LayoutProps) => {
  const {
    logo,
    layout,
    rootUrl,
    menuType,
    menu,
    user,
    showUserType,
    content,
    headerHeight,
    children,
    headerExtraRender,
    onLogout,
    ...restProps
  } = props;

  const [pathname, setPathname] = useState<string>(window.location.pathname);
  const [userData, setUserData] = useState<User>({} as User);
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);

  const transitionMenuIcon = (menu: any) => {
    if (React.isValidElement(menu?.icon)) return menu?.icon;
    const MenuIcon =
      Icons[menu?.icon] ||
      Icons[
        (
          menu?.properties ||
          (menu?.contentValue && isString(menu?.contentValue)
            ? JSON.parse(menu.contentValue)
            : null)
        )?.icon
      ] ||
      null;
    return MenuIcon ? <MenuIcon /> : null;
  };

  // 转换菜单数据
  const loopTransitionMenu = (menus: Array<any>, index = 0) =>
    menus?.map((menu) => ({
      ...menu,
      key: menu?.key || menu?.id,
      name: menu?.name || menu?.title,
      path: menu?.path || menu?.url || `/${menu?.key || menu?.id}`,
      icon: transitionMenuIcon(menu),
      isRoot: index === 0,
      properties:
        menu?.properties ||
        (menu?.contentValue && isString(menu?.contentValue)
          ? JSON.parse(menu.contentValue)
          : null),
      routes: loopTransitionMenu(
        menu?.routes || menu?.children || [],
        index + 1
      ),
      backupRoutes: loopTransitionMenu(
        menu?.routes || menu?.children || [],
        index + 1
      ),
    }));

  useMount(async () => {
    setUserData(isFunction(user) ? await user() : user || ({} as User));
  });

  const onMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      onLogout?.();
    }
  };

  return (
    <div
      id="fe-layout"
      className={classNames("fe-layout", `fe-layout-${layout}`)}
    >
      <ProLayout
        {...restProps}
        logo={logo ?? null}
        layout={layout}
        siderWidth={200}
        headerHeight={
          isString(headerHeight) ? HeaderHeight[headerHeight] : headerHeight
        }
        navTheme={layout === "top" ? "realDark" : "dark"}
        waterMarkProps={{
          content: `${userData?.name}${userData?.login}`,
          fontColor: "rgba(0, 0, 0, 0.05)",
          fontSize: 14,
        }}
        location={{
          pathname,
        }}
        splitMenus={layout === "mix"}
        menu={{
          request: async () => {
            const menus: Array<any> | any = isFunction(menu)
              ? await menu()
              : menu;
            return loopTransitionMenu(
              menuType === "auth" ? menus?.[0]?.children : menus
            );
          },
        }}
        menuItemRender={(menu, dom) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={() =>
              !menu?.properties?.openNew && setPathname(menu?.path as string)
            }
            href={
              menu.isRoot &&
              !menu?.properties?.openNew &&
              (menu?.routes?.length > 0 || menu?.backupRoutes?.length > 0)
                ? null
                : menu?.path || menu?.url || null
            }
            target={menu?.properties?.openNew ? "_blank" : "_self"}
            rel="noreferrer"
            className={classNames({
              "fe-layout-menu-item": menu?.isRoot,
              "fe-layout-menu-item-children": !menu?.isRoot,
            })}
          >
            {dom}
          </a>
        )}
        menuProps={{
          className: "fe-layout-menu",
          onOpenChange: (keys: Array<string>) => setOpenKeys(keys),
          openKeys,
          getPopupContainer: () => document.querySelector("#fe-layout"),
        }}
        subMenuItemRender={(menu: any, dom: React.ReactNode) => (
          <div
            className={classNames("fe-layout-menu-submenu", {
              "fe-layout-menu-submenu-hover": openKeys.includes(menu?.key),
              "fe-layout-menu-submenu-children": !menu.isRoot,
            })}
          >
            {dom}
            {menu?.isRoot && layout === "top" && (
              <DownOutlined style={{ fontSize: 12, marginLeft: 6 }} />
            )}
          </div>
        )}
        menuHeaderRender={(logo, title) => (
          <a href={rootUrl} target="_self">
            {logo}
            {title}
          </a>
        )}
        rightContentRender={() => (
          <Space className="fe-layout-menu-right" size={32}>
            {headerExtraRender}
            <Dropdown
              getPopupContainer={() =>
                document.querySelector("#fe-layout") as HTMLElement
              }
              overlay={
                <Menu
                  className="menu"
                  onClick={onMenuClick}
                  style={{ minWidth: 100 }}
                >
                  {showUserType === "dropdown" && (
                    <Space direction="horizontal" className="fe-user-dropdown">
                      <Avatar
                        size="default"
                        className="avatar"
                        alt="avatar"
                        icon={<UserOutlined />}
                        src={userData?.avatarUrl}
                      />
                      <Space direction="vertical" size={0}>
                        <span>{userData?.name}</span>
                        <span>{userData?.login}</span>
                      </Space>
                    </Space>
                  )}
                  {showUserType === "dropdown" && (
                    <Divider style={{ margin: 0 }} />
                  )}
                  <Menu.Item key="logout">退出</Menu.Item>
                </Menu>
              }
            >
              <span
                className={classNames(
                  "fe-layout-menu-right-action",
                  "fe-layout-menu-right-account"
                )}
                style={{
                  height: isString(headerHeight)
                    ? HeaderHeight[headerHeight]
                    : headerHeight,
                }}
              >
                <Avatar
                  size="small"
                  className="avatar"
                  alt="avatar"
                  icon={<UserOutlined />}
                  src={userData?.avatarUrl}
                />
                {showUserType === "normal" && (
                  <span
                    className={classNames(
                      "fe-layout-menu-right-action",
                      "name"
                    )}
                  >
                    {userData?.name}
                  </span>
                )}
              </span>
            </Dropdown>
          </Space>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
};

Layout.defaultProps = {
  ...defaultProps,
};

export default Layout;
