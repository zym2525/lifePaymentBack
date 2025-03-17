import { store } from '@/store';
import { defineStore } from 'pinia';
import { DeviceType } from '@bole-core/core';
import Cookies from 'js-cookie';
import { ThemeColorName } from '@/constants';

export interface AppState {
  theme: ThemeColorName;
  deviceType: DeviceType;
  isMobile: boolean;
  clientHeight: number;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    theme: 'default',
    deviceType: DeviceType.Desktop,
    isMobile: false,
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!Number(Cookies.get('sidebarStatus')) : true,
      withoutAnimation: false,
    },
    clientHeight: document.body.clientHeight,
  }),
  getters: {
    getSidebarStatus(): boolean {
      return this.sidebar.opened;
    },
    getDevice(): DeviceType {
      return this.deviceType;
    },
    clientHeightGetter(): number {
      return this.clientHeight;
    },
  },
  actions: {
    toggleDevice(deviceType: DeviceType) {
      this.deviceType = deviceType;
      this.isMobile = deviceType !== DeviceType.Desktop;
    },
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', '1');
      } else {
        Cookies.set('sidebarStatus', '0');
      }
    },
    closeSideBar({ withoutAnimation }: { withoutAnimation: boolean }) {
      Cookies.set('sidebarStatus', '1');
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    changeClientHeight(height: number) {
      this.clientHeight = height;
    },

    setTheme(themeName: ThemeColorName) {
      this.theme = themeName;
    },
  },
});

export function useAppStoreHook() {
  return useAppStore(store);
}
