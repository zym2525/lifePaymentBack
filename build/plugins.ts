import vue from '@vitejs/plugin-vue';

import vueJsx from '@vitejs/plugin-vue-jsx';
import { enhancePlugin } from 'vite-plugin-vue-enhance';
import removeConsole from 'vite-plugin-remove-console';

import { viteBuildInfo } from './info';

import liveReload from 'vite-plugin-live-reload';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // 把svg 打包放一起

import svgLoader from 'vite-svg-loader'; // svg?component

import legacy from '@vitejs/plugin-legacy';

import { visualizer } from 'rollup-plugin-visualizer';

import { createHtmlPlugin } from 'vite-plugin-html';

// import ElementPlus from 'unplugin-element-plus/vite'

import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';

// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { viteMockServe } from 'vite-plugin-mock';
// import vitePluginImportus from 'vite-plugin-importus';

import path from 'path';

import Config from '../config/config';
import { ConfigEnv } from 'vite';
import * as hooks from '../src/hooks/global';
import { configCompressPlugin } from './compress';
import { SubMenuManager } from '@bole-core/theme';

type Options = {
  VITE_LEGACY: ViteEnv['VITE_LEGACY'];
  VITE_COMPRESSION: ViteEnv['VITE_COMPRESSION'];
  VITE_AppType: ViteEnv['VITE_AppType'];
};

export function getPluginsList(
  command: ConfigEnv['command'],
  { VITE_LEGACY, VITE_COMPRESSION, VITE_AppType }: Options
) {
  // const prodMock = true;
  const lifecycle = process.env.npm_lifecycle_event;
  console.log(lifecycle, command);

  return [
    enhancePlugin(),
    vue(),
    // jsx、tsx语法支持
    vueJsx(),

    // https://github.com/vbenjs/vite-plugin-html/tree/main#readme
    createHtmlPlugin({
      minify: true,
      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: Config.title,
          subMenuIconCssPath: SubMenuManager.SubMenuIconCssPath,
          isJx: VITE_AppType === 'jx',
        },
      },
    }),

    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'pinia',
        'vue-router',
        {
          '@/hooks/global': Object.keys(hooks),
        },
        { '@/constants': ['CommonAnnexTableColumns'] },
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

    configCompressPlugin(VITE_COMPRESSION),

    // vitePluginImportus([
    //   {
    //     libraryName: 'lodash',
    //     libraryDirectory: '',
    //     camel2DashComponentName: false,
    //     customName: function (formated: string) {
    //       return `lodash/${formated}`;
    //     },
    //   },
    // ]),

    // 线上环境删除console
    removeConsole(),
    // buildInfo terminal output
    viteBuildInfo(),
    // 修改layout文件夹下的文件时自动重载浏览器
    liveReload(['src/layout/**/*', 'src/router/**/*']),

    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [
        path.resolve(process.cwd(), 'src/assets/svgIcons/'),
        // path.resolve(process.cwd(), 'src/TUIKit/assets/icon'),
      ],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',

      /**
       * custom insert position
       * inject?: 'body-last' | 'body-first'
       * @default: body-last
       */
      inject: 'body-last',

      /**
       * custom dom id
       * customDomId: '__svg__icons__dom__',
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),

    // svg组件化支持
    svgLoader({
      defaultImport: 'url',
    }),

    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
        // {
        //   libraryName: 'ant-design-vue',
        //   esModule: true,
        //   resolveStyle: (name) => {
        //     return `ant-design-vue/es/${name}/style/index`
        //   },
        // },
      ],
    }),

    // 是否为打包后的文件提供传统浏览器兼容性支持
    // VITE_LEGACY ? legacy() : null,
    // 打包分析
    lifecycle === 'report'
      ? visualizer({ open: true, brotliSize: true, filename: 'report.html' })
      : null,

    viteMockServe({
      mockPath: 'mock',
      enable: true,
      watchFiles: false,
      logger: false,
    }),
  ];
}
