<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableQueryFilterBar @on-reset="reset" :show-reset-btn="false">
        <template #btn>
          <el-button
            v-if="checkSubModuleItemShow('pageButton', 'addChannelBtn')"
            @click="openDialog()"
            icon="Plus"
            type="primary"
            >新增渠道</el-button
          >
        </template>
      </ProTableQueryFilterBar>
      <ProTableV2 v-bind="proTableProps" :columns="column" :operationBtns="operationBtns">
      </ProTableV2>
    </AppContainer>
    <AddOrEditLifePaymentChannelDialog v-bind="dialogProps" />
    <OperateHistoryLogByTypeDialog v-bind="logDialogProps" />
  </LoadingLayout>
</template>

<script setup lang="ts">
import {
  ProTableQueryFilterBar,
  OperationBtnType,
  ProTableV2,
  SearchInput,
  LoadingLayout,
  AppContainer,
  QueryFilterItem,
  useTable,
  useFormDialog,
} from '@bole-core/components';
import { useAccess, useGroupColumns, useGroupOperationBtns, useOpenLogByTypeDialog } from '@/hooks';
import * as lifePayServices from '@/services/api/LifePay';
import { OrderInputType, Message } from '@bole-core/core';
import {
  OperateHistoryTypeEnum,
  LifePaySwitchTypeEnum,
  LifePaySwitchTypeEnumText,
  LifePayChannlesTypeEnum,
  LifePayChannlesTypeEnumText,
  LifePayChannelsStatsEnumText,
  LifePayChannelsStatsEnum,
} from '@/constants';
import AddOrEditLifePaymentChannelDialog from './components/AddOrEditLifePaymentChannelDialog.vue';

defineOptions({
  name: 'LifePaymentChannelManage',
});

const operationBtnMap: Record<string, OperationBtnType> = {
  editBtn: { emits: { onClick: (role) => openDialog(role) } },

  disabledBtn: {
    emits: { onClick: (role) => setLifePayChannelsStatus(role) },
    props: { type: 'danger' },
    extraProps: {
      hide: (row: API.CreateEditPayChannelsInput) => row.status !== LifePayChannelsStatsEnum.启用,
    },
  },
  enableBtn: {
    emits: { onClick: (role) => setLifePayChannelsStatus(role) },
    extraProps: {
      hide: (row) => row.status === LifePayChannelsStatsEnum.启用,
    },
  },
  logBtn: { emits: { onClick: (role) => openLogDialog(role.id) } },
};

const { checkSubModuleItemShow, column, operationBtns } = useAccess({
  operationBtnMap,
});

const BaseState = {
  loading: true,
};

const state = reactive({ ...BaseState });

onMounted(async () => {
  await getList();
  state.loading = false;
});

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
      let res = await lifePayServices.getLifePayChannlesPage(params, {
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
      channlesType: {
        type: 'enum',
        valueEnum: LifePayChannlesTypeEnumText,
      },
      channlesRate: { formatter: (row) => row.channlesRate + '%' },
      switchType: {
        type: 'enum',
        valueEnum: LifePaySwitchTypeEnumText,
      },
      status: {
        type: 'enum',
        valueEnum: LifePayChannelsStatsEnumText,
      },
    },
  }
);

function openDialog(row?: API.CreateEditPayChannelsInput) {
  console.log('row: ', row);
  if (row) {
    handleEdit({
      channlesName: row.channlesName,
      channlesNum: row.channlesNum,
      channlesRate: row.channlesRate,
      switchType: row.switchType,
      channlesType: row.channlesType,
      id: row.id,
    });
  } else {
    handleAdd();
  }
}

const { dialogProps, handleAdd, handleEdit, editForm, dialogState } = useFormDialog({
  onConfirm: handleAddOrEdit,
  defaultFormParams: {
    title: '新增渠道',
    channlesName: '',
    channlesNum: '',
    channlesRate: 0,
    switchType: '' as any as LifePaySwitchTypeEnum,
    channlesType: LifePayChannlesTypeEnum.内部渠道,
    id: '',
  },
  editTitle: '编辑渠道',
});

async function handleAddOrEdit() {
  try {
    const isEdit = editForm.id;
    let params: API.CreateEditPayChannelsInput = {
      channlesName: editForm.channlesName,
      channlesNum: editForm.channlesNum,
      channlesRate: editForm.channlesRate,
      switchType: editForm.switchType,
      channlesType: editForm.channlesType,
      status: LifePayChannelsStatsEnum.启用,
    };
    if (isEdit) {
      params.id = editForm.id;
    }
    let res = await lifePayServices.createEditPayChannels(params);
    if (res) {
      Message.successMessage('操作成功');
      getList(isEdit ? paginationState.pageIndex : 1);
      dialogState.dialogVisible = false;
    }
  } catch (error) {}
}

async function setLifePayChannelsStatus(row: API.CreateEditPayChannelsInput) {
  try {
    let params: API.APIsetLifePayChannelsStatusParams = {
      id: row.id,
      status:
        row.status === LifePayChannelsStatsEnum.启用
          ? LifePayChannelsStatsEnum.禁用
          : LifePayChannelsStatsEnum.启用,
    };
    let res = await lifePayServices.setLifePayChannelsStatus(params);
    if (res) {
      Message.successMessage('操作成功');
      getList(paginationState.pageIndex);
    }
  } catch (error) {}
}

const { openLogDialog, logDialogProps } = useOpenLogByTypeDialog({
  operateHistoryType: OperateHistoryTypeEnum.LifePayChannles,
});
</script>
