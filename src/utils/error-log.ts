import { App, nextTick } from 'vue';
import { isString, isArray } from 'lodash';
import settings from '@config/config';
import { useErrorLogStoreHook } from '@/store/modules/errorLog';

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings;

function checkNeed() {
  const env = process.env.NODE_ENV;
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    //@ts-ignore
    return needErrorLog.includes(env);
  }
  return false;
}

export function initErrorHandler(app: App) {
  if (checkNeed()) {
    app.config.errorHandler = function (err, vm, info) {
      nextTick(() => {
        useErrorLogStoreHook().addErrorLog({
          err,
          vm,
          info,
          url: window.location.href,
        });
        console.error(err, info);
      });
    };
  }
}
