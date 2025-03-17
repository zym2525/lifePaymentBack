import { defineStore } from 'pinia';
import { store } from '@/store';
import { getToken, setToken, removeToken, removeUserInfo, setUserInfo, getUserInfo } from '@/utils';
import { resetRouter, router } from '@/router';
import { useTagsViewStoreHook } from './tagsView';
import * as accountServices from '@/services/api/Account';
import { usePermissionStoreHook } from './permission';
import { getAccountInfoFromAccessToken, AccountInfo } from '@bole-core/core';
import { useClearSubModule } from '@/hooks';
import { myClient } from '@/constants/query';

export interface UserState {
  token: string;
  userInfo: API.IdentityModelTokenCacheItem;
  accountInfo: Partial<AccountInfo>;
  name: string;
}

function getDefaultState() {
  const accessToken = getToken();
  const userInfo = getUserInfo();
  const accountInfo = getAccountInfoFromAccessToken(accessToken);

  return {
    token: accessToken,
    name: accountInfo.name,
    accountInfo: accountInfo || {},
    userInfo: userInfo || {},
  } as UserState;
}

export const useUserStore = defineStore({
  id: 'user',
  state: getDefaultState,
  getters: {
    accessToken(state) {
      return state.token;
    },
    user(state) {
      return state.userInfo;
    },

    userId(state) {
      return state.accountInfo.sub;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    setName(name: string) {
      this.name = name;
    },
    setUserInfo(userInfo: API.IdentityModelTokenCacheItem) {
      this.userInfo = userInfo;
      setUserInfo(userInfo);
    },
    setAccountInfo(accountInfo: Partial<AccountInfo>) {
      this.accountInfo = accountInfo;
    },

    // 用户登入
    loginByUsername(data: API.AccessRequestDto) {
      return new Promise<void>((resolve, reject) => {
        accountServices
          .getTokenForWeb(data, { showLoading: false })
          .then((res) => {
            if (res) {
              console.log('res: ', res);
              this.setToken(res.accessToken);

              const accountInfo = getAccountInfoFromAccessToken(res.accessToken);

              this.setName(accountInfo.name);
              this.setAccountInfo(accountInfo);

              // 获取用户信息
              this.setUserInfo(res);

              resolve();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出 清空缓存
    logout(redirectPath = '/') {
      return new Promise(async (resolve) => {
        removeToken();
        removeUserInfo();
        this.resetState();
        resetRouter();
        myClient.removeQueries();

        await router.push(`/login?redirect=${redirectPath}`);

        const tagsViewStore = useTagsViewStoreHook();
        tagsViewStore.delAllViews();
        const { clearSubModule } = useClearSubModule();
        clearSubModule();

        const permissionStore = usePermissionStoreHook();
        permissionStore.resetModuleList();
        resolve(1);
      });
    },

    resetToken() {
      this.token = '';
      removeToken();
      this.resetState();
    },

    resetState() {
      Object.assign(this, getDefaultState());
    },

    refreshToken(params: API.AccessRefreshToken) {
      return new Promise<API.IdentityModelTokenCacheItem>(
        // eslint-disable-next-line no-async-promise-executor
        async (resolve, reject) => {
          try {
            const res = await accountServices.getTokenByRefreshToken(params, {
              showLoading: false,
            });
            if (res) {
              this.setToken(res.accessToken);
              this.setUserInfo(res);
              resolve(res);
              return;
            }
            reject('出错了');
          } catch (error) {
            reject(error);
          }
        }
      );
    },
  },
});

export function useUserStoreHook() {
  return useUserStore(store);
}
