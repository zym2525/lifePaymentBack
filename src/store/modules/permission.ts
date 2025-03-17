import { defineStore } from 'pinia';
import { store } from '@/store';
// import { RouteConfigs } from "@/layout/types";
import { constantRoutes, Route } from '@/router';
import { addAsyncRoutes, ascending } from '@/router/utils';
import * as baseModuleServices from '@/services/api/BaseModule';

export interface PermissonState {
  routes: Route[];
  addRoutes: Route[];
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissonState => ({
    // 静态路由生成的菜单
    routes: [],
    // 动态路由
    addRoutes: [],
  }),
  getters: {
    permission_routes(state) {
      return state.routes;
    },
  },
  actions: {
    getModuleList() {
      return new Promise<Route[]>(async (resolve, reject) => {
        try {
          // let res = await userApiClient.apiUserUserMenusGet();
          // let userMenuList = res.data.data;
          // let userInfo = rootGetters['userInfo'] as Getter['userInfo'];
          const res = await baseModuleServices.getCurrentUserModuleList({
            showLoading: false,
          });
          const accessedRoutes = ascending(addAsyncRoutes(formatModuleList(res, null))); // createAccessedRoutes(userMenuList, userInfo)
          //@ts-ignore
          accessedRoutes.push({ path: '/:pathMatch(.*)*', redirect: '/404', hidden: true });

          this.addRoutes = accessedRoutes;
          this.routes = constantRoutes.concat(accessedRoutes);

          resolve(accessedRoutes);
        } catch (e) {
          reject(e);
        }
      });
    },
    // 清空缓存页面
    resetModuleList() {
      this.addRoutes = [];
      this.routes = [];
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}

function formatModuleList(moduleList: API.ModuleDto[], parentId: string | null) {
  const treeModuleList: Route[] = [];
  if (moduleList.length > 0) {
    moduleList.forEach((item) => {
      if (item.parentId === parentId) {
        const isRootModule = !item.parentId && item.isMenu === 1;
        //@ts-ignore
        const asyncRoute: Route = isRootModule
          ? {
              path: formatPath(item.path),
              name: item.enCode,
              redirect: 'noRedirect',
              alwaysShow: true,
              hidden: item.isMenu !== 1,
              meta: {
                title: item.name,
                icon: item.icon,
                moduleId: item.id,
                rank: item?.sortCode,
                rootMenu: true,
              },
            }
          : {
              path: formatPath(item.path),
              name: item.enCode,
              hidden: item.isMenu !== 1,
              alwaysShow: true,
              meta: {
                title: item.name,
                moduleId: item.id,
                noCache: !item.isCache,
                rank: item?.sortCode,
              },
            };
        const children = formatModuleList(moduleList, item.id);
        asyncRoute.children = children;
        treeModuleList.push(asyncRoute);
      }
    });
  }
  return treeModuleList;
}

function formatPath(path: string) {
  return path.startsWith('/') ? path : '/' + path;
}
