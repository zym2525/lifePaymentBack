import { Route } from '@/router';
import type { OperationBtnType, ColumnPropsMap } from '@bole-core/components';
import {
  useAccess as useBoleAccess,
  useGroupColumns as useBoleGroupColumns,
  useGroupOperationBtns as useBoleGroupOperationBtns,
} from '@bole-core/components';
import type { Ref, ComputedRef } from 'vue';
import * as baseModuleServices from '@/services/api/BaseModule';
import { myClient } from '@/constants/query';

type UseAccessOptions = {
  operationBtnMap?: Record<string, OperationBtnType>;
  /**
   * 需要显示tips的column的enCode
   * 已废弃，不要用了
   * @deprecated
   */
  needTipColumns?: string[];
  /**
   * @deprecated
   */
  immediate?: boolean;
  columnPropsMap?: ColumnPropsMap;
};

export function useAccess(options: UseAccessOptions = {}) {
  const route = useRoute() as any as Route;

  const moduleId = route.meta.moduleId;

  return useBoleAccess({
    queryKey: ['baseModuleServices/getCurrentSubModuleList', { moduleId }],
    service: async () => {
      return await baseModuleServices.getCurrentSubModuleList({ moduleId }, { showLoading: false });
    },
    ...options,
  });
}

export function useClearSubModule() {
  function clearSubModule() {
    myClient.removeQueries({ queryKey: ['baseModuleServices/getCurrentSubModuleList'] });
  }

  return { clearSubModule };
}

/**
 * 对columns进行分组
 */
export function useGroupColumns(columns: Ref<API.ModuleColumnDto[]>, groups: string[]) {
  //@ts-ignore
  return useBoleGroupColumns(columns, groups);
}

/**
 * 对operationBtns进行分组
 */
export function useGroupOperationBtns(
  operationBtns: ComputedRef<OperationBtnType[]>,
  groups: string[]
) {
  //@ts-ignore
  return useBoleGroupOperationBtns(operationBtns, groups);
}
