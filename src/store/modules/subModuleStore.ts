import { store } from '@/store';
import { defineStore } from 'pinia';
import * as baseModuleServices from '@/services/api/BaseModule';

export interface SubModuleState {
  subModuleMap: Record<string, API.AllSubModule>;
}

export const useSubModuleStore = defineStore({
  id: 'subModule',
  state: (): SubModuleState => ({
    subModuleMap: {},
  }),
  actions: {
    async getCurrentSubModuleList(moduleId: string) {
      try {
        if (!moduleId) return;

        if (this.subModuleMap[moduleId]) {
          return this.subModuleMap[moduleId];
        }

        const subModule = await baseModuleServices.getCurrentSubModuleList(
          { moduleId },
          { showLoading: false }
        );
        this.subModuleMap[moduleId] = subModule;
        return subModule;
      } catch (error) {
        return {
          pageButton: [],
          column: [],
          dataButton: [],
        } as API.AllSubModule;
      }
    },
    clearSubModule() {
      this.subModuleMap = {};
    },
  },
});

export function useSubModuleStoreHook() {
  return useSubModuleStore(store);
}
