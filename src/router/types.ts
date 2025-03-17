import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

export type MyRouteMeta = {
  title?: string;
  rank?: number;
  icon?: string;
  needAuth?: boolean;
  keepAlive?: boolean;
  refreshRedirect?: string;
  dynamicLevel?: string;
  moduleId?: string;
  showLink?: boolean;
};

export interface ToRouteType extends RouteLocationNormalized {
  meta: MyRouteMeta;
  children?: ToRouteType[];
  redirect: string;
  // component?: any
}

export type Route = RouteRecordRaw & {
  meta?: MyRouteMeta;
  children?: Route[];
};
