import * as operateHistoryServices from '@/services/api/OperateHistory';
import { OrderInputType } from '@bole-core/core';
import { useTable } from '@bole-core/components';
import { MaybeRef } from 'vue';
import { OperateHistoryTypeEnum } from '@/constants';

export enum OperateType {
  /**
   * 审核
   */
  Audit = 1,
  /**
   * 入账
   */
  Account = 2,
  /**
   * 上传发票
   */
  Invoice = 3,
}

export const OperateTypeText = {
  [OperateType.Audit]: '审核',
  [OperateType.Account]: '入账',
  [OperateType.Invoice]: '上传发票',
};

export type UseTableLogListOptions = {
  relationId: MaybeRef<string>;
  operateType?: MaybeRef<number>;
};

export function useTableLogList({ relationId, operateType }: UseTableLogListOptions) {
  const BaseState = {
    loading: true,
  };

  const state = reactive({ ...BaseState });

  const { getDataSource: getList, proTableProps } = useTable(
    async ({ pageIndex, pageSize }) => {
      try {
        let params: API.GetOperateHistoryInput = {
          pageModel: {
            rows: pageSize,
            page: pageIndex,
            orderInput: [{ property: 'creationTime', order: OrderInputType.Desc }],
          },
          relationId: unref(relationId),
        };
        const _operateType = unref(operateType);
        if (_operateType) {
          params.operateName = OperateTypeText[_operateType];
        }
        let res = await operateHistoryServices.getOperateHistoryByRelationId(params, {
          showLoading: !state.loading,
        });
        return res;
      } catch (error) {}
    },
    {
      queryKey: ['operateHistoryServices/getOperateHistoryByRelationId'],
      columnsRenderProps: {
        creationTime: {
          type: 'date',
          format: 'YYYY-MM-DD HH:mm:ss',
        },
      },
    }
  );

  const OperateHistoryTableColumns: API.CustomModuleColumnDto[] = [
    { id: '1', enCode: 'creatorName', name: '操作人' },
    { id: '2', enCode: 'creationTime', name: '操作时间', width: 180 },
    { id: '3', enCode: 'operateName', name: '操作' },
    { id: '4', enCode: 'operateContent', name: '操作内容' },
  ];

  return {
    state,
    getList,
    proTableProps,
    OperateHistoryTableColumns,
  };
}

export type UseTableLogListByTypeOptions = {
  relationId: MaybeRef<string>;
  operateHistoryType?: MaybeRef<OperateHistoryTypeEnum>;
};

export function useTableLogListByType({
  relationId,
  operateHistoryType,
}: UseTableLogListByTypeOptions) {
  const BaseState = {
    loading: true,
  };

  const state = reactive({ ...BaseState });

  const { getDataSource: getList, proTableProps } = useTable(
    async ({ pageIndex, pageSize }) => {
      try {
        let params: API.QueryOperateHistoryByTypeInput = {
          pageModel: {
            rows: pageSize,
            page: pageIndex,
            orderInput: [{ property: 'creationTime', order: OrderInputType.Desc }],
          },
          typeId: unref(relationId),
          operateHistoryType: unref(operateHistoryType),
        };

        let res = await operateHistoryServices.getOperateHistoryByType(params, {
          showLoading: !state.loading,
        });
        return res;
      } catch (error) {}
    },
    {
      queryKey: ['operateHistoryServices/getOperateHistoryByRelationId'],
      columnsRenderProps: {
        creationTime: {
          type: 'date',
          format: 'YYYY-MM-DD HH:mm:ss',
        },
      },
    }
  );

  const OperateHistoryTableColumns: API.CustomModuleColumnDto[] = [
    { id: '1', enCode: 'creatorName', name: '操作人' },
    { id: '2', enCode: 'creationTime', name: '操作时间', width: 180 },
    { id: '3', enCode: 'operateName', name: '操作' },
    { id: '4', enCode: 'operateContent', name: '操作内容' },
  ];

  return {
    state,
    getList,
    proTableProps,
    OperateHistoryTableColumns,
  };
}
