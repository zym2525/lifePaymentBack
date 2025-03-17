import { router, Route } from './router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/storage'; // get token from cookie
import { setPageTitle } from '@/utils';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { useUserStoreHook } from '@/store/modules/user';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  setPageTitle(to.meta.title as string);

  // determine whether the user has logged in
  const hasToken = getToken();

  const permissionStoreHook = usePermissionStoreHook();
  const userStoreHook = useUserStoreHook();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      const modules = permissionStoreHook.permission_routes;
      if (modules.length !== 0) {
        if (to.matched.length === 0) {
          next({ path: '/404' });
        } else {
          next();
        }
      } else {
        try {
          // generate accessible routes map based on roles
          const accessRoutes = await permissionStoreHook.getModuleList();
          console.log('accessRoutes: ', accessRoutes);
          // // dynamically add accessible routes
          accessRoutes.forEach((route: Route) => {
            router.addRoute(route);
          });
          next({ ...to, replace: true });
        } catch (error) {
          console.log('getModuleList error: ', error);
          // remove token and go to login page to re-login
          userStoreHook.resetToken();
          permissionStoreHook.resetModuleList();
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    console.log(whiteList.indexOf(to.path), to.path);
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      permissionStoreHook.resetModuleList();
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
