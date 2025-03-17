import { useAppStore } from '@/store/modules/app';
import { useThrottleFn } from '@vueuse/core';
import { ScreenBreakPoints, DeviceType } from '@bole-core/core';
// import { watch, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
// import { useRoute } from 'vue-router';

const { body } = document;

export function useResizeHander() {
  const appStore = useAppStore();

  const { isMobile, sidebar, deviceType: currentDeviceType } = storeToRefs(appStore);

  const route = useRoute();

  const $_createDeviceType = () => {
    const rect = body.getBoundingClientRect();
    const width = rect.width;
    if (width >= ScreenBreakPoints.md) {
      return DeviceType.Desktop;
    } else if (width >= ScreenBreakPoints.sm) {
      return DeviceType.Pad;
    } else {
      return DeviceType.Phone;
    }
  };

  const $_resizeHandler = useThrottleFn(() => {
    if (!document.hidden) {
      appStore.changeClientHeight(document.body.clientHeight);
      const deviceType = $_createDeviceType();
      if (deviceType !== currentDeviceType.value) {
        appStore.toggleDevice(deviceType);
      }
      if (isMobile.value) {
        appStore.closeSideBar({ withoutAnimation: true });
      }
    }
  }, 300);

  watch(route, () => {
    if (isMobile.value && sidebar.value.opened) {
      appStore.closeSideBar({ withoutAnimation: false });
    }
  });

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler);
  });

  onMounted(() => {
    const deviceType = $_createDeviceType();
    appStore.changeClientHeight(document.body.clientHeight);
    if (deviceType) {
      appStore.toggleDevice(deviceType);
      if (isMobile.value) {
        appStore.closeSideBar({ withoutAnimation: true });
      }
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler);
  });
}
