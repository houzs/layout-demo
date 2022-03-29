# layout (统一交互与样式布局)

react 版本 layout 物料，基于 @ant-design/pro-layout 实现。
支持 顶导｜侧导｜顶导与侧导 相互结合的交互模式。

## 何时使用

需要统一交互与样式的前提下，内部新旧平台皆可使用。

## API

| 参数              | 说明                                                           | 类型                                | 默认值    |
| :---------------- | :------------------------------------------------------------- | :---------------------------------- | :-------- |
| title             | layout 的左上角 的 title                                       | string \| ReactNode                 | -         |
| logo              | layout 的左上角 logo 的 url                                    | string \| ReactNode                 | -         |
| rootUrl           | 点击 logo 跳转路径                                             | string                              | /         |
| menuHeader        | header 高度                                                    | `default` \| `large` \| number      | `default` |
| menuType          | layout 支持的菜单结构 (auth=将军令,uac=uac 菜单,menu=默认菜单) | `auth` \|`uac` \|`menu`             | `menu`    |
| menu              | 数据数组                                                       | `Menu[]` \| () => Promise`<Menu[]>` | -         |
| user              | 用户信息                                                       | `User` \| () => Promise`<User>`     | -         |
| showUserType      | 用户信息展示方式                                               | `normal` \| `dropdown`              | `normal`  |
| onLogout          | 退出登陆                                                       | () => void                          | -         |
| headerExtraRender | header 右侧插槽 render 方法                                    | ReactNode                           | -         |

## 定义说明

```

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
}

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

/** @name 默认菜单 */
export type MenuDataItem = {
    /** @name 子菜单 */
    routes?: MenuDataItem[];
    /** @name 在菜单中隐藏子节点 */
    hideChildrenInMenu?: boolean;
    /** @name 在菜单中隐藏自己和子节点 */
    hideInMenu?: boolean;
    /** @name 菜单的icon */
    icon?: React.ReactNode;
    /** @name 自定义菜单的国际化 key */
    locale?: string | false;
    /** @name 菜单的名字 */
    name?: string;
    /** @name 用于标定选中的值，默认是 path */
    key?: string;
    /** @name disable 菜单选项 */
    disabled?: boolean;
    /** @name 路径,可以设定为网页链接 */
    path?: string;
    /**
     * 当此节点被选中的时候也会选中 parentKeys 的节点
     *
     * @name 自定义父节点
     */
    parentKeys?: string[];
    /** @name 隐藏自己，并且将子节点提升到与自己平级 */
    flatMenu?: boolean;
    /** @name 指定外链打开形式，同a标签 */
    target?: string;
    [key: string]: any;
};

/** @name 菜单联合类型，表示所有可以接受的菜单类型(兼容将军令和UAC) */
export type Menu = Auth | Uac | MenuDataItem;

```
