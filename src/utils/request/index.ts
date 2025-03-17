import { type IRequestOptions, BoleRequest, type RequestConfig } from '@bole-core/core';
import { type AxiosRequestConfig, type AxiosError } from 'axios';
import qs from 'qs';
import NProgress from '../progress';
import { loadEnv } from '@build/index';
import { getToken, getUserInfo } from '../storage';
import { useUserStoreHook } from '@/store/modules/user';
import { ElLoading as Loading, ElNotification } from 'element-plus';
import { router } from '@/router';
import { Message, tokenIsExpired } from '@/utils';

// 加载环境变量 VITE_PROXY_DOMAIN（开发环境）  VITE_PROXY_DOMAIN_REAL（打包后的线上环境）
const { VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL, DEV } = loadEnv();

const RefreshTokenUrl = '/GetTokenByRefreshToken';

/** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
const whiteList = [RefreshTokenUrl, '/GetToken'];

let loadingInstance: ReturnType<typeof Loading.service>;

function startLoading() {
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    background: 'transparent',
  });
}

function endLoading() {
  if (loadingInstance) {
    loadingInstance.close();
  }
}

// 错误处理方案： 错误类型
enum ErrorShowType {
  /**
   * 啥也不干
   */
  SILENT = 0,

  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  /**
   * 通知报错
   */
  NOTIFICATION = 3,
  /**
   * 重定向
   */
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  /**
   * 错误码
   */
  error?: number;
  /**
   * 错误信息
   */
  msg?: string;
  showType?: ErrorShowType;
}

interface ErrorResponse {
  error?: {
    data: any;
    code: number;
    message: string;
  };
}

interface ErrorInfo {
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
  data: any;
}

const AxiosOptions: AxiosRequestConfig = {
  baseURL: DEV ? VITE_PROXY_DOMAIN : VITE_PROXY_DOMAIN_REAL,
  timeout: 30000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化
  paramsSerializer: {
    //@ts-ignore
    serialize: (params) => qs.stringify(params, { indices: false }),
  },
  withCredentials: true,
};

const config: RequestConfig<ResponseStructure, IRequestOptions> = {
  ...AxiosOptions,

  errorConfig: {
    // 错误接收及处理
    errorHandler: (error, opts) => {
      console.log('error: ', error);
      if (opts?.skipErrorHandler) throw error;

      if (opts?.customErrorHandler) {
        if (opts?.customErrorHandler(error)) {
          return;
        }
      }

      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ErrorInfo | undefined = (error as any).info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              Message.warnMessage(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              Message.errorMessage(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              ElNotification.error({
                message: `${errorCode}: ${errorMessage}`,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              Message.errorMessage(errorMessage);
          }
        }
      } else if ((error as AxiosError<ResponseStructure, IRequestOptions>).response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        handleAxiosResponseError(error as AxiosError<ErrorResponse, IRequestOptions>);
        // Message.errorMessage(`Response status:${(error as AxiosError).response.status}`);
      } else if ((error as AxiosError).request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        Message.errorMessage('服务器无响应，请重试');
      } else {
        // 发送请求时出了点问题
        Message.errorMessage('发送请求时出了点问题');
      }
    },

    // 错误抛出
    errorThrower: (res) => {
      const { success, data, error: errorCode, msg, showType } = res;
      if (!success) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage: msg, showType, data };
        throw error; // 抛出自制的错误
      }
    },
  },

  requestInterceptors: [
    [
      (config) => {
        const $config = config;
        // 开启进度条动画
        if (config.needNProcess) {
          NProgress.start();
        }

        const token = getToken();

        const userInfo = getUserInfo();

        const { showLoading = true, mock } = $config;

        if (mock) {
          $config.url = $config.url.replace(/^\/api/, '');
        }

        /**
         * 如果是refreshToken这个方法 就直接返回 防止内存泄漏
         */
        if (whiteList.some((url) => $config.url.toLowerCase().includes(url.toLowerCase()))) {
          return $config;
        }

        if (showLoading) {
          startLoading();
        }

        return new Promise((resolve) => {
          if (token && $config.withCredentials) {
            if (tokenIsExpired(userInfo)) {
              if (!BoleRequest.refreshTokenPending) {
                const userStore = useUserStoreHook();
                BoleRequest.refreshTokenPending = true;
                // token过期刷新
                userStore
                  .refreshToken({
                    refreshToken: userInfo.refreshToken,
                    clientId: userStore.accountInfo.client_id,
                  })
                  .then((res) => {
                    $config.headers['Authorization'] = 'Bearer ' + res.accessToken;
                    BoleRequest.requests.forEach((cb) => cb(res.accessToken));
                    BoleRequest.requests = [];
                  })
                  .finally(() => {
                    BoleRequest.refreshTokenPending = false;
                  });
              }
              resolve(BoleRequest.retryOriginalRequest($config));
            } else {
              $config.headers['Authorization'] = 'Bearer ' + token;
              resolve($config);
            }
          } else {
            resolve($config);
          }
        });
      },
      (error: AxiosError) => {
        endLoading();
        return Promise.reject(error);
      },
    ],
  ],
  responseInterceptors: [
    [
      (response) => {
        const $config = response.config as IRequestOptions;

        const { needNProcess, getResponse = false } = $config;

        // 关闭进度条动画
        if (needNProcess) {
          NProgress.done();
        }

        endLoading();

        return getResponse ? response : (response.data as any).result;
      },
      (error) => {
        endLoading();
        return Promise.reject(error);
      },
    ],
  ],
};

const ErrorMessageMap = {
  [400]: '请求错误',
  [401]: '未授权，请登录',
  [403]: '拒绝访问',
  [404]: '请求地址出错',
  [408]: '请求超时',
  [500]: '服务器内部错误',
  [501]: '服务未实现',
  [502]: '网关错误',
  [503]: '服务不可用',
  [504]: '网关超时',
  [505]: 'HTTP版本不受支持',
};

function handleAxiosResponseError(error: AxiosError<ErrorResponse, IRequestOptions>) {
  if (error.response.config.url.toLowerCase().includes(RefreshTokenUrl.toLowerCase())) {
    handleLogout();
    return;
  }
  if (error && error.response) {
    let message = ErrorMessageMap[error.response?.status] ?? '请求错误';
    if (error.response.data?.error?.message) {
      message = error.response.data?.error?.message;
    }

    if (error.response?.status === 401) {
      handleLogout();
    }
    Message.errorMessage(message);
  }
}

function handleLogout() {
  const userStore = useUserStoreHook();
  let path = '/';
  if (userStore.token) {
    path = router.currentRoute.value.fullPath;
  }
  userStore.logout();
  router.replace(`/login?redirect=${path}`);
}

export const request = BoleRequest.create(config);
