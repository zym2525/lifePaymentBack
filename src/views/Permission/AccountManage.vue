<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableQueryFilterBar @on-reset="reset">
        <template #query>
          <QueryFilterItem>
            <SearchInput
              v-model="extraParamState.queryCondition"
              style="width: 200px"
              placeholder="账号/姓名/手机号"
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
        <template #columns="{ row, column }">
          <template v-if="column.property === 'roles'">
            {{ row[column.property].map((x) => x.name).join() }}
          </template>
        </template>
      </ProTableV2>
    </AppContainer>
    <AddOrEditAccountDialog v-bind="dialogProps" />
    <DialogAuthorize v-model:authorizeId="rowState.authorizeId" authorizeType="User" />
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
import { useAccess } from '@/hooks';
import * as userRoleServices from '@/services/api/UserRole';
import * as userServices from '@/services/api/User';
import * as accountServices from '@/services/api/Account';
import { Message, OrderInputType } from '@bole-core/core';
import AddOrEditAccountDialog from './components/AddOrEditAccountDialog.vue';
import DialogAuthorize from './components/dialogAuthorize.vue';
import TencentUserDetailDialog from './components/TencentUserDetailDialog.vue';

defineOptions({
  name: 'AccountManage',
});

const operationBtnMap: Record<string, OperationBtnType> = {
  editBtn: { emits: { onClick: (role) => openDialog(role) } },
  resetBtn: { emits: { onClick: (role) => resetPassword(role) } },
  authorize: { emits: { onClick: (role) => openAuthorizeDialog(role) } },
  delBtn: {
    emits: { onClick: (role) => handleDeleteUser(role) },
    props: { type: 'danger' },
  },
  disabledBtn: {
    emits: { onClick: (role) => userEnableOrForbid(role) },
    extraProps: {
      hide: (row) => row.isLocked,
    },
  },
  enableBtn: {
    emits: { onClick: (role) => userEnableOrForbid(role) },
    extraProps: {
      hide: (row) => !row.isLocked,
    },
  },
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
      let params = {
        pageModel: {
          rows: pageSize,
          page: pageIndex,
          orderInput: [{ property: 'id', order: OrderInputType.Desc }],
        },
        queryCondition: extraParamState.queryCondition,
      };
      let res = await userRoleServices.getBackClientUsers(params, { showLoading: !state.loading });
      return res;
    } catch (error) {}
  },
  {
    defaultExtraParams: {
      queryCondition: '',
    },
    queryKey: ['userRoleServices/getBackClientUsers'],
  }
);

function openDialog(row?: API.UserDto) {
  console.log('row: ', row);
  if (row) {
    handleEdit({
      id: row.id,
      name: row.name,
      userName: row.userName,
      phoneNumber: row.phoneNumber,
      roleNames: row.roles.map((x) => x.name),
      remark: row.remark,
      companyOrgId: row?.companyOrgId ?? '',
      departmentOrgId: row?.departmentOrgId ?? '',
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
    userName: '',
    phoneNumber: '',
    remark: '',
    roleNames: [] as string[],
    companyOrgId: '',
    departmentOrgId: '',
  },
});

const {
  dialogProps: dialogTencentProps,
  handleEdit: handleTencentUser,
  editForm: tencentForm,
  dialogState: dialogTencentState,
} = useFormDialog({
  onConfirm: handleSetTencentUser,
  defaultFormParams: {
    tencentUserId: '',
    userId: '',
    remark: '',
  },
});

async function handleAddOrEdit() {
  const isEdit = editForm.id;
  try {
    let params: API.CreateBackClientUserInput = {
      name: editForm.name,
      phoneNumber: editForm.phoneNumber,
      userName: editForm.userName,
      roleNames: editForm.roleNames,
      remark: editForm.remark,
      companyOrgId: editForm.companyOrgId,
      departmentOrgId: editForm.departmentOrgId,
    };

    let res;
    if (isEdit) {
      (params as API.UpdateBackClientUserInput).id = editForm.id;
      res = await userRoleServices.updateBackClientUser(params);
    } else {
      res = await userRoleServices.createBackClientUser(params);
    }
    if (res) {
      Message.successMessage('操作成功');
      getList(isEdit ? paginationState.pageIndex : 1);
      dialogState.dialogVisible = false;
    }
  } catch (error) {}
}

async function userEnableOrForbid(row: API.UserDto) {
  try {
    await Message.tipMessage(`是否${row.isLocked ? '启用' : '禁用'}用户`);
    let res = await userServices.userEnableOrForbid({
      id: row.id,
    });
    if (res) {
      Message.successMessage('操作成功');
      getList(paginationState.pageIndex);
      return !!res;
    }
  } catch (error) {}
}

async function handleDeleteUser(row: API.UserDto) {
  try {
    await Message.deleteMessage();
    let params = {
      id: row.id,
    };
    let res = await userRoleServices.deleteBackClientUser(params);
    if (res) {
      Message.successMessage('操作成功');
      getList(paginationState.pageIndex);
    }
  } catch (error) {}
}

async function resetPassword(row: API.UserDto) {
  try {
    const res = await accountServices.resetPasswordWithMicroNotify(
      {
        userId: row.id,
      },
      {
        showLoading: !state.loading,
      }
    );
    if (res) {
      Message.successMessage('密码已重置');
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
