import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

import Layout from '@/layout/MainLayout/Layout.vue';
import ErrorLayout from '@/layout/ErrorLayout/ErrorLayout.vue';

// import { ElIcons } from '@/typings'

export type RouteMeta = {
  /**
   * 页面标题
   */
  title?: string;
  /**
   * menus菜单图标
   */
  icon?: string;
  /**
   * 是否固定标签页
   */
  affix?: boolean;
  /**
   * 是否在面包屑中显示
   */
  breadcrumb?: boolean;
  /**
   * 是否缓存页面
   */
  noCache?: boolean;
  /**
   * 菜单排序显示等级
   */
  rank?: number;

  moduleId?: string;

  /**
   * 是否是根Menu
   */
  rootMenu?: boolean;
};

export type Route = RouteRecordRaw & {
  /**
   * 是否在menu显示
   */
  hidden?: boolean;
  alwaysShow?: boolean;
  /**
   * 设置为noRedirect将不会在面包屑中重定向
   */
  redirect?: string;
  meta?: RouteMeta;
  children?: Route[];
};

export const asyncRoutes: Route[] = [
  {
    path: '/System',
    name: 'System',
    redirect: 'noRedirect',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '系统配置管理',
      rootMenu: true,
    },
    children: [
      {
        path: '/System/ModuleManage',
        name: 'ModuleManage',
        component: () => import('@/views/System/ModuleManage.vue'),
        meta: {
          title: '功能模块管理',
        },
      },
    ],
  },
];

export const constantRoutes: Route[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        hidden: true,
        component: () => import('@/views/Home/Home.vue'),
        meta: {
          rank: 10001,
          title: '首页',
          affix: true,
          rootMenu: true,
        },
      },
    ],
  },
  ...asyncRoutes,
  {
    path: '/Login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: '登录',
      rank: 101,
    },
  },
  {
    path: '/Error',
    component: ErrorLayout,
    redirect: '/Error/401',
    hidden: true,
    meta: {
      title: '错误页',
    },
    children: [
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/Error/401.vue'),
        meta: {
          title: '401',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/Error/404.vue'),
        meta: {
          title: '404',
        },
      },
    ],
  },
];

const createRouterFactory = () =>
  createRouter({
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    scrollBehavior(to, from, savedPosition) {
      return new Promise((resolve) => {
        if (savedPosition) {
          return savedPosition;
        } else {
          if (from.meta.saveSrollTop) {
            const top: number = document.documentElement.scrollTop || document.body.scrollTop;
            resolve({ left: 0, top });
          }
        }
      });
    },
    routes: constantRoutes,
  });

export const router = createRouterFactory();

export function resetRouter() {
  const newRouter = createRouterFactory();
  //@ts-ignore
  router.matcher = newRouter.matcher; // reset router
}

export function redirect404() {
  router.replace({ path: '/404' });
}
