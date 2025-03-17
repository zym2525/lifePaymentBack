import { RouteLocationNormalizedLoaded, RouteLocationNamedRaw } from 'vue-router';
import { useTagsViewStoreHook } from '@/store/modules/tagsView';

export function useRouteView() {
  const tagsViewStore = useTagsViewStoreHook();

  const router = useRouter();
  const route = useRoute();

  const delView = (view: RouteLocationNormalizedLoaded) => {
    tagsViewStore.delViewSync(view);
  };

  const refreshView = async (view: RouteLocationNormalizedLoaded) => {
    await tagsViewStore.delCachedView(view);
    const { fullPath } = view;
    await nextTick();
    router.replace({
      path: '/redirect' + fullPath,
    });
  };

  /**
   * 跳转路由并清除该目标路由在tagsView的缓存
   */
  function goViewByClearCache(to: RouteLocationNamedRaw) {
    tagsViewStore.delCachedView({
      name: to.name,
    });
    router.push(to);
  }

  function closeViewPush(view: RouteLocationNormalizedLoaded, to: RouteLocationNamedRaw) {
    delView(view);
    router.push(to);
  }

  function closeToLastView() {
    delView(route);
    const latestView = tagsViewStore.visitedViews.slice(-1)[0];
    if (latestView) {
      router.push(latestView.fullPath);
    } else {
      if (route && route.name === 'Dashboard') {
        router.replace({ path: '/redirect' + route.fullPath });
      } else {
        router.push('/');
      }
    }
  }

  return { delView, refreshView, goViewByClearCache, closeViewPush, closeToLastView };
}
