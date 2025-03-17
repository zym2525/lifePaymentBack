import { Route } from './index';
import Layout from '@/layout/MainLayout/Layout.vue';
import { parse } from 'path-to-regexp';

const modulesRoutes = import.meta.glob([
  '/src/views/**/*.{vue,tsx}',
  '!/src/views/**/components/**/*.{vue,tsx}',
]);

// 过滤后端传来的动态路由 重新生成规范路由
export function addAsyncRoutes(arrRoutes: Route[]) {
  if (!arrRoutes || !arrRoutes.length) return [];

  arrRoutes.forEach((v) => {
    if (v.redirect) {
      v.component = Layout;
    } else {
      const pagePath = parse(v.path)[0];

      v.component = modulesRoutes[`/src/views${pagePath}.vue`];
    }
    if (v.children) {
      addAsyncRoutes(v.children);
    }
  });

  return arrRoutes;
}

// 按照路由中meta下的rank等级升序来排序路由
export function ascending(arr: Route[]) {
  return arr.sort((a, b) => {
    return (a?.meta?.rank ?? 0) - b?.meta?.rank;
  });
}
