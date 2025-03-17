<template>
  <PrettyLayout
    :is-mobile="isMobile"
    :routes="routes"
    :title="Config.title"
    :visited-views="visitedViews"
    :cached-views="cachedViews"
    :username="name"
    :themeMap="themeMap"
    :logo="AppType === 'jx' ? LogoJx : Logo"
    :showModifyPasswordBtn="false"
    :showMessageBtn="false"
    @on-add-view="tagsViewStore.addView"
    @on-add-visited-view="tagsViewStore.addVisitedView"
    @on-clear-error-log="errorLogStore.clearErrorLog"
    @on-del-all-views="tagsViewStore.delAllViews"
    @on-del-cached-view="tagsViewStore.delCachedView"
    @on-del-others-views="tagsViewStore.delOthersViews"
    @on-del-view="tagsViewStore.delView"
    @on-logout="logout"
    @on-toggle-side-bar="appStore.toggleSideBar"
    @on-close-side-bar="appStore.closeSideBar"
    @on-update-visited-view="tagsViewStore.updateVisitedView"
    @on-change-theme="handleChangeTheme"
  >
  </PrettyLayout>
</template>

<script setup lang="ts">
// import DefaultLayout from '@bole-core/defaultLayout';
import PrettyLayout from '@bole-core/pretty-layout';
import { useAppStore } from '@/store/modules/app';
import { usePermissionStore } from '@/store/modules/permission';
import { useErrorLogStore } from '@/store/modules/errorLog';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useUserStore } from '@/store/modules/user';
import Config from '@config/config';
// import '@bole-core/defaultLayout/dist/style.css';
import '@bole-core/pretty-layout/dist/styles/index.scss';
import { ThemeColorName, AppType } from '@/constants';
import { ThemeManager } from '@/utils';
import { openLink } from '@bole-core/core';
import Logo from '@/assets/logo.png';
import LogoJx from '@/assets/logo-jx.png';

defineOptions({
  name: 'Layout',
});

const router = useRouter();

const permissionStore = usePermissionStore();
const appStore = useAppStore();
const errorLogStore = useErrorLogStore();
const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();

const { isMobile } = storeToRefs(appStore);
const { routes } = storeToRefs(permissionStore);
const { visitedViews, cachedViews } = storeToRefs(tagsViewStore);
const { name } = storeToRefs(userStore);

const themeMap = ThemeManager.getThemeMap();

onBeforeMount(() => {
  const themeName = ThemeManager.getStorageThemeName();
  handleChangeTheme(themeName);
});

function handleChangeTheme(themeName: ThemeColorName) {
  ThemeManager.setTheme(themeName);
  appStore.setTheme(themeName);
}

function logout() {
  userStore.logout();
  router.push(`/login?redirect=/`);
}
function handleLoginTencent() {
  openLink(router.resolve({ name: 'ChatView' }).fullPath);
}
</script>

<style lang="scss">
// @import '@bole-core/defaultLayout/dist/style.css';
</style>
