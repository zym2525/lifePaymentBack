import { store } from '@/store';
import { defineStore } from 'pinia';

import { ComponentPublicInstance } from 'vue';

interface LogItem {
  err: unknown;
  vm: ComponentPublicInstance | null;
  info: string;
  url: string;
}

export interface ErrorLogState {
  logs: LogItem[];
}

export const useErrorLogStore = defineStore({
  id: 'errorlog',
  state: (): ErrorLogState => ({
    logs: [],
  }),
  actions: {
    addErrorLog(log: LogItem) {
      this.logs.push(log);
    },
    clearErrorLog() {
      this.logs.splice(0);
    },
  },
});

export function useErrorLogStoreHook() {
  return useErrorLogStore(store);
}
