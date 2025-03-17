import App from './App.vue';
import { router } from './router';
import { setupStore } from '@/store';
import { createApp, Directive } from 'vue';
import { MotionPlugin } from '@vueuse/motion';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import * as Components from '@/components';
import draggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js';
import { QueryFilterItem } from '@bole-core/components';
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import 'dayjs/locale/zh-cn';
import { myClient } from '@/constants/query';

import { initErrorHandler } from '@/utils/error-log';
import 'animate.css';

// 导入公共样式
import './style/index.scss';
import 'video.js/dist/video-js.css';

// 导入字体图标
// import './assets/iconfont/iconfont.js'
// import './assets/iconfont/iconfont.css'

import 'virtual:svg-icons-register';
import './permission';

import { ThemeColors } from '@/constants';
import { ThemeManager } from '@/utils';

ThemeManager.init(ThemeColors);

dayjs.extend(localeData);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('zh-cn');

const app = createApp(App);

// // // 自定义指令
import * as directives from '@/directives';

Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon, SvgIcon } from './components/ReIcon';
app.component('IconifyIconOffline', IconifyIconOffline);
app.component('IconifyIconOnline', IconifyIconOnline);
app.component('FontIcon', FontIcon);
app.component('SvgIcon', SvgIcon);

for (const [key, component] of Object.entries({
  ...ElementPlusIconsVue,
  ...Components,
  draggable,
  QueryFilterItem,
})) {
  app.component(key, component);
}

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: myClient,
};

setupStore(app);
app.use(router).use(MotionPlugin);
initErrorHandler(app);
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.mount('#app');
