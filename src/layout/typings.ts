import React from "react";
import {
  Route,
  MenuDataItem as OriginMenuDataItem,
} from "@ant-design/pro-layout/lib/typings";

/** @name 用户信息 */
export type User = {
  id: number;
  name: string;
  login: string;
  code: string;
  email: string;
  tenantId: string;
  roles: any;
  isVerified: boolean;
  verifyType: string;
  verifyExpireTime: number;
  verified: boolean;
  avatarUrl: string;
  bigAvatarUrl: string;
  [key: string]: any;
};

/** @name 将军令菜单 */
export type Auth = {
  contentValue: string;
  id: string;
  pid: string;
  sortNum: number;
  title: string;
  url: string;
  children?: Array<Auth>;
  [key: string]: any;
};

/** @name uac菜单 */
export type Uac = {
  nodeId: number;
  resId: number;
  nodeName: string;
  nodeCode: string;
  nodeType: string;
  parentNodeId: number;
  parentNodeCode: string;
  menuLevel: string;
  menuOrder: number;
  childrenMenuList: Array<Uac>;
  childrenMenuCount: number;
  menuURL: string;
  newOpen: boolean;
  createTime: string;
  attributeList: Array<any>;
  routes?: Array<Uac>;
  [key: string]: any;
};

/** @name 标准原生菜单 */
export type MenuDataItem = OriginMenuDataItem & {
  properties?: Record<string, any>;
  isRoot?: boolean;
};

export type RenderSetting = {
  headerExtraRender?: WithFalse<React.ReactNode>;
};

export type PureSettings = {
  /** @name Layout的title */
  title?: WithFalse<string>;
  /** @name Layout的类型(侧导、顶导、混合) */
  layout?: "side" | "top" | "mix";
  /** @name 菜单类型(将军令|UAC) */
  menuType?: "auth" | "uac" | "menu";
  /** @name 菜单数据 */
  menu: Menu[] | (() => Promise<Menu[]>);
  /** @name 用户信息 */
  user?: User | (() => Promise<User>);
  /** @name header高度 */
  headerHeight?: "default" | "large" | number;
  /** @name 主体颜色 */
  primaryColor?: string;
  /** @name 固定header */
  fixedHeader?: boolean;
  /** @name 固定导航 */
  fixSiderbar?: boolean;
  /** @name 分割菜单 */
  splitMenus?: boolean;
  pwa?: boolean;
  /** @name 顶部导航的主题，mix 模式生效 */
  headerTheme?: "light" | "dark";
  /** @name 导航的主题，side 和 mix 模式下是左侧菜单的主题，top 模式下是顶部菜单 */
  navTheme?: "light" | "dark" | "realDark";
  /** @name logo跳转路径 */
  rootUrl?: string;
  /** @name 用户信息展示方式 */
  showUserType?: "normal" | "dropdown";
};

export type LayoutSettings = PureSettings & RenderSetting;

/** @name 菜单联合类型，表示所有可以接受的菜单类型(兼容将军令和UAC) */
export type Menu = Auth | Uac | MenuDataItem;

export type WithFalse<T> = T | false;

export * from "@ant-design/pro-layout/lib/typings";
