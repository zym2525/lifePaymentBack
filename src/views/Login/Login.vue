<template>
  <img :src="bg" class="wave" />
  <div class="login-container">
    <div class="img">
      <illustration />
    </div>
    <div class="login-box">
      <div class="login-form">
        <avatar class="avatar" />
        <h2
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 100,
            },
          }"
        >
          {{ ctx.config.loginFormTitle }}
        </h2>
        <div
          class="input-group user"
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 200,
            },
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="userFilled" width="14" height="14" />
          </div>
          <div>
            <h5>用户名</h5>
            <input
              type="text"
              name="username"
              class="input"
              v-model="user"
              @focus="onUserFocus"
              @blur="onUserBlur"
            />
          </div>
        </div>
        <div
          class="input-group pwd"
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 300,
            },
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="lock" width="14" height="14" />
          </div>
          <div>
            <h5>密码</h5>

            <input
              v-if="ifDisplay"
              type="text"
              name="password"
              class="input"
              v-model="pwd"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
              @keyup.enter="beforeLog"
            />
            <input
              v-else
              type="password"
              name="password"
              class="input"
              v-model="pwd"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
              @keyup.enter="beforeLog"
            />
            <closeEye v-show="!ifDisplay" class="icon-hide" @click="ifDisplay = !ifDisplay" />
            <openEye v-show="ifDisplay" class="icon-hide" @click="ifDisplay = !ifDisplay" />
          </div>
        </div>
        <button
          class="btn"
          v-motion
          :initial="{
            opacity: 0,
            y: 10,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 400,
            },
          }"
          @click="beforeLog"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { addClass, removeClass } from '@/utils';
import { useUserStore } from '@/store/modules/user';
import bg from '@/assets/login/bg.png';
import { useDebounceFn } from '@vueuse/core';
import { useProvideContext } from '@/components/Provide/provide';

import avatar from '@/assets/login/avatar.svg?component';

import illustration from '@/assets/login/illustration.svg?component';

import { ElMessage } from 'element-plus';

import closeEye from '@/assets/svgIcons/close_eye.svg?component';
import openEye from '@/assets/svgIcons/close_eye.svg?component';
// import { useSettingStoreHook } from '@/store/modules/settings';

// const boleSetting = useSettingStoreHook();
const ctx = useProvideContext();

const router = useRouter();
const route = useRoute();

let user = ref('');
let pwd = ref('');
let loading = ref(false);
let ifDisplay = ref(false);
const userStore = useUserStore();

const redirect = computed<string>(() => route.query?.redirect as string);
const otherQuery = computed(() => {
  const query = route.query;
  if (query) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur];
      }
      return acc;
    }, {});
  }
});

const onLogin = async (): Promise<void> => {
  try {
    if (!user.value || !pwd.value) {
      ElMessage({
        message: '请输入用户名或密码！',
        type: 'warning',
      });
      return;
    }
    loading.value = true;
    await userStore.loginByUsername({
      userName: unref(user),
      userPassword: unref(pwd),
    });
    loading.value = false;
    router.push({
      path: redirect.value || '/',
      query: otherQuery.value,
    });
  } catch (error) {
    console.log(error);
    ElMessage({
      message: '用户名或密码错误！',
      type: 'error',
    });
  }
};
const beforeLog = useDebounceFn(onLogin, 1000);

function onUserFocus() {
  addClass(document.querySelector('.user'), 'focus');
}

function onUserBlur() {
  if (user.value.length === 0) removeClass(document.querySelector('.user'), 'focus');
}

function onPwdFocus() {
  addClass(document.querySelector('.pwd'), 'focus');
}

function onPwdBlur() {
  if (pwd.value.length === 0) removeClass(document.querySelector('.pwd'), 'focus');
}
</script>

<style scoped>
@import url('@/style/login.css');

.icon-hide {
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 14px;
  height: 14px;
  font-size: 16px;
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
}
</style>
