import { ElTree } from 'element-plus';
import { Ref,PropType as VPropType,Ref } from 'vue';
import {
  OperationBtnType as BlOperationBtnType,
} from '@bole-core/components';


declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  const pdfjsLib: any

  interface Window {
    webkitCancelAnimationFrame: (handle: number) => void;
    mozCancelAnimationFrame: (handle: number) => void;
    oCancelAnimationFrame: (handle: number) => void;
    msCancelAnimationFrame: (handle: number) => void;
    webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    WeixinJSBridge:any
  }

  type TreeInstanceType = InstanceType<typeof ElTree>;
  type OperationBtnType = BlOperationBtnType;
  type PropType<T> = VPropType<T>;
  type MaybeRef<T> = T | Ref<T>;

  type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  type Nullable<T> = T | null;
  type Recordable<T = any> = Record<string, T>;
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  type Indexable<T = any> = {
    [key: string]: T;
  };
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  type ValueOf<T> = T[keyof T];
  type TimeoutHandle = ReturnType<typeof setTimeout>;
  type IntervalHandle = ReturnType<typeof setInterval>;

  interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  interface WheelEvent {
    path?: EventTarget[];
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  /**
   * 打包压缩格式的类型声明
   */
  type ViteCompression =
    | "none"
    | "gzip"
    | "brotli"
    | "both"
    | "gzip-clear"
    | "brotli-clear"
    | "both-clear";

  interface ViteEnv {
    /**
     * 项目本地运行端口号
     */
    VITE_PORT: number;
    /**
     * 开发环境读取配置文件路径
     */
    VITE_PUBLIC_PATH: string;
    /**
     * 开发环境代理
     */
    VITE_PROXY_DOMAIN: string;
    /**
     * 开发环境后端地址
     */
    VITE_PROXY_DOMAIN_REAL: string;
    /**
     * 开发环境路由历史模式
     */
    VITE_ROUTER_HISTORY: string;
    /**
     * 是否为打包后的文件提供传统浏览器兼容性支持 支持 true 不支持 false
     */
    VITE_LEGACY: boolean;
    /**
     * OSS上传地址
     */
    VITE_OSS_URL: string;
    VITE_OSS_URL_BUCKET: string;
    /**
     * api基础地址
     */
    VITE_BASE_URL: string;

    VITE_COMPRESSION: ViteCompression;
    VITE_WEMAP_KEY:string;
    VITE_CLIENT_ORIGIN:string;
    VITE_AppType: 'one' | 'jx';
  }

  interface AppConfig {

    title: string;

    /**
     * @description 登录页form title
     */
    loginFormTitle: string;

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     */
    errorLog: string | Array<'production' | 'development'>;
  }

  interface WeMapModel {
    latitude?: number;
    longitude?: number;
    provinceName?: string;
    cityName?: string;
    countyName?: string;
    provinceCode?: number;
    cityCode?: number;
    countyCode?: number;
    address?: string;
  }

  interface CommonAnnexItem {
    url?: string;
    name?: string;
    path?: string;
  };

}

export { }
