<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableQueryFilterBar @on-reset="reset">
        <template #query>
          <QueryFilterItem>
            <SearchInput
              v-model="extraParamState.queryCondition"
              style="width: 200px"
              placeholder="角色名称"
              @on-click-search="getList"
              @keyup.enter="getList()"
            >
            </SearchInput>
          </QueryFilterItem>
        </template>
        <template #btn>
          <el-button
            v-if="checkSubModuleItemShow('pageButton', 'addBtn')"
            @click="openDialog()"
            icon="Plus"
            type="primary"
            >新增</el-button
          >
        </template>
      </ProTableQueryFilterBar>
      <ProTableV2 v-bind="proTableProps" :columns="column" :operationBtns="operationBtns">
      </ProTableV2>
    </AppContainer>
    <AddOrEditRoleDialog v-bind="dialogProps" />
    <DialogAuthorize v-model:authorizeId="rowState.authorizeId" authorizeType="Role" />
    <!-- <DialogMember v-model:visibleId="rowState.setMemberRoleId" /> -->
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
import { useAccess, useAllRoleList } from '@/hooks';
import * as userRoleServices from '@/services/api/UserRole';
import { Message, OrderInputType } from '@bole-core/core';
import AddOrEditRoleDialog from './components/AddOrEditRoleDialog.vue';
import { DataRangeEnum, DataRangeEnumText } from '@/constants';
import DialogAuthorize from './components/dialogAuthorize.vue';
import { formatRoleName } from '@/utils';

defineOptions({
  name: 'RoleManage',
});

const operationBtnMap: Record<string, OperationBtnType> = {
  editBtn: { emits: { onClick: (role) => openDialog(role) } },
  delBtn: { emits: { onClick: (role) => handleDeleteRole(role) }, props: { type: 'danger' } },
  authorize: { emits: { onClick: (role) => openAuthorizeDialog(role) } },
  // member: { emits: { onClick: (role) => openMemberDialog(role) } },
  disabledBtn: {
    emits: { onClick: (role) => roleEnableOrForbid(role) },
    extraProps: {
      hide: (row) => row.isEnable,
    },
  },
  enableBtn: {
    emits: { onClick: (role) => roleEnableOrForbid(role) },
    extraProps: {
      hide: (row) => !row.isEnable,
    },
  },
};

const { checkSubModuleItemShow, column, operationBtns } = useAccess({
  operationBtnMap,
});

const { refetch } = useAllRoleList();

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
      let params: API.GetRolesInput = {
        pageModel: {
          rows: pageSize,
          page: pageIndex,
          orderInput: [{ property: 'sequence', order: OrderInputType.Asc }],
        },
        queryCondition: extraParamState.queryCondition,
      };
      let res = await userRoleServices.getRoles(params, {
        showLoading: !state.loading,
      });
      return {
        data: res.data.map((x) => ({
          ...x,
          name: formatRoleName(x.name),
        })),
        pageModel: {
          rows: pageSize,
          page: pageIndex,
          totalCount: res.pageModel.totalCount,
        },
      };
    } catch (error) {}
  },
  {
    defaultExtraParams: {
      queryCondition: '',
    },
    queryKey: ['userRoleServices/getRoles'],
  }
);

function openDialog(row?: API.RoleInfo) {
  if (row) {
    handleEdit({
      id: row.id,
      name: formatRoleName(row.name),
      remark: row.remark,
      dataRange: row.dataRange,
    });
  } else {
    handleAdd();
  }
}

const { dialogProps, handleAdd, handleEdit, editForm, dialogState } = useFormDialog({
  onConfirm: handleAddOrEdit,
  defaultFormParams: {
    id: '',
    name: '',
    remark: '',
    dataRange: DataRangeEnum.All,
  },
});

async function handleAddOrEdit() {
  try {
    const isEdit = editForm.id;
    let params: API.CreateOrUpdateRoleInput = {
      name: editForm.name,
      remark: editForm.remark,
      dataRange: editForm.dataRange,
    };
    let res;
    if (isEdit) {
      params.id = editForm.id;
      res = await userRoleServices.updateRole(params);
    } else {
      res = await userRoleServices.createRole(params);
    }
    if (res) {
      Message.successMessage('操作成功');
      getList(isEdit ? paginationState.pageIndex : 1);
      refetch({ type: 'inactive' });
    }
  } catch (error) {}
}

async function handleDeleteRole(row: API.RoleInfo) {
  try {
    await Message.deleteMessage();
    let params = {
      id: row.id,
    };
    let res = await userRoleServices.deleteRole(params);
    if (res) {
      Message.successMessage('操作成功');
      getList(paginationState.pageIndex);
      refetch({ type: 'inactive' });
    }
  } catch (error) {}
}

async function roleEnableOrForbid(row: API.RoleInfo) {
  try {
    await Message.tipMessage(`是否${!row.isEnable ? '启用' : '禁用'}角色`);
    let res = await userRoleServices.roleEnableOrForbid({
      id: row.id,
      isEnable: !row.isEnable,
    });
    if (res) {
      Message.successMessage('操作成功');
      getList(paginationState.pageIndex);
      refetch({ type: 'inactive' });
      return !!res;
    }
  } catch (error) {}
}

const rowState = reactive({
  authorizeId: '',
  setMemberRoleId: '',
});

function openAuthorizeDialog(row: API.IdentityRoleDto) {
  rowState.authorizeId = row.id;
}
</script>
