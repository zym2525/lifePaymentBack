<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableV2 v-bind="proTableProps" :columns="column" :operationBtns="operationBtns">
      </ProTableV2>
    </AppContainer>
    <LifePaymentUserDetailDialog v-bind="dialogProps" />
  </LoadingLayout>
</template>

<script setup lang="ts">
import {
  OperationBtnType,
  ProTableV2,
  LoadingLayout,
  AppContainer,
  useTable,
  useFormDialog,
} from '@bole-core/components';
import { useAccess } from '@/hooks';
import * as lifePayServices from '@/services/api/LifePay';
import { OrderInputType } from '@bole-core/core';
import { omitByFalse } from '@/utils';
import _ from 'lodash';
import LifePaymentUserDetailDialog from './components/LifePaymentUserDetailDialog.vue';

defineOptions({
  name: 'LifePaymentUserManage',
});

const operationBtnMap: Record<string, OperationBtnType> = {
  detailBtn: {
    emits: { onClick: (role) => openDialog(role) },
  },
};

const { column, operationBtns } = useAccess({
  operationBtnMap,
});

const BaseState = {
  loading: true,
};
const state = reactive({ ...BaseState });

const {
  getDataSource: getList,
  proTableProps,
  paginationState,
  extraParamState,
  reset,
} = useTable(
  async ({ pageIndex, pageSize }, extraParamState) => {
    try {
      let params: API.PageInput = {
        pageModel: {
          rows: pageSize,
          page: pageIndex,
          orderInput: extraParamState.orderInput,
        },
      };
      let res = await lifePayServices.getUserPage(omitByFalse(params), {
        showLoading: !state.loading,
      });
      return res;
    } catch (error) {}
  },
  {
    defaultExtraParams: {
      orderInput: [{ property: 'id', order: OrderInputType.Desc }],
    },
    columnsRenderProps: {
      creationTime: { type: 'date', format: 'YYYY-MM-DD HH:mm:ss' },
      lastLoginTime: { type: 'date', format: 'YYYY-MM-DD HH:mm:ss' },
    },
  }
);

onMounted(async () => {
  await getList();
  state.loading = false;
});

const { dialogProps, handleAdd, handleEdit } = useFormDialog({
  defaultFormParams: {
    userId: '',
  },
});

function openDialog(row: any) {
  handleAdd({
    userId: row.id,
  });
}
</script>
