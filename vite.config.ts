import { resolve } from 'path';
import { warpperEnv } from './build';
import { getPluginsList } from './build/plugins';
import { UserConfigExport, ConfigEnv, loadEnv, AliasOptions } from 'vite';

export const projRoot = resolve(__dirname, '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const coreRoot = resolve(pkgRoot, 'core');

// 当前执行node命令时文件夹的地址（工作目录）
const root: string = process.cwd();

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir);
};

// 设置别名
const alias: AliasOptions = [
  {
    find: '@',
    replacement: pathResolve('src'),
  },
  {
    find: '@build',
    replacement: pathResolve('build'),
  },
  {
    find: '@mock',
    replacement: pathResolve('mock'),
  },
  {
    find: '@config',
    replacement: pathResolve('config'),
  },
];

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const {
    VITE_PORT,
    VITE_LEGACY,
    VITE_PUBLIC_PATH,
    VITE_PROXY_DOMAIN,
    VITE_PROXY_DOMAIN_REAL,
    VITE_COMPRESSION,
    VITE_AppType,
  } = warpperEnv(loadEnv(mode, root));

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
      dedupe: ['vue', 'element-plus'],
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      // https: false,
      // 端口号
      port: VITE_PORT,
      host: '0.0.0.0',
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
      // 本地跨域代理
      proxy:
        VITE_PROXY_DOMAIN_REAL.length > 0
          ? {
              [VITE_PROXY_DOMAIN]: {
                target: VITE_PROXY_DOMAIN_REAL,
                // ws: true,
                changeOrigin: true,
                rewrite: (path: string) => {
                  console.log('path: ', path);
                  return path.replace(/^\/api/, '');
                },
              },
              // '/v1': {
              //   target: 'https://apis.map.qq.com/ws/geocoder',
              //   changeOrigin: true,
              // },
              // '/company/1823263644708900864': {
              //   target: 'http://localhost:5000/200100/querycommon',
              //   changeOrigin: true,
              // },
              // '/1823555004544454656': {
              //   target: 'http://localhost:5000/200100/sqlscript',
              //   changeOrigin: true,
              // },
            }
          : {},
    },
    plugins: getPluginsList(command, { VITE_LEGACY, VITE_COMPRESSION, VITE_AppType }),
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    build: {
      outDir: `dist/dist-818back-${VITE_AppType}-${mode}`,
    },
    optimizeDeps: {
      include: [
        'video.js',
        'xlsx-style',
        'jszip',
        '@/../lib/vuedraggable/dist/vuedraggable.umd.js',
        '@tencentcloud/chat-uikit-engine',
        'tuicall-engine-webrtc',
        'semver',
      ],
      exclude: ['@bole-12333/chat-kit', '@bole-12333/customer-chat'],
    },
  };
};
