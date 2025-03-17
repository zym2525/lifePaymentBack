<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableQueryFilterBar @on-reset="reset">
        <template #query>
          <QueryFilterItem>
            <SearchInput
              v-model="extraParamState.queryCondition"
              placeholder="名称/手机号"
              @on-click-search="getList"
              @keyup.enter="getList()"
            >
            </SearchInput>
          </QueryFilterItem>
        </template>
      </ProTableQueryFilterBar>
      <ProTableV2 v-bind="proTableProps" :columns="column" :operationBtns="operationBtns">
        <template #columns="{ row, column }">
          <template v-if="column.property === 'registDate' || column.property === 'attestateDate'">
            {{ format(row[column.property], 'YYYY-MM-DD') }}
          </template>
          <template v-else-if="column.property === 'frontIdUrl'">
            <PreviewBtn
              v-if="row.frontIdUrl"
              :url="setOSSLink(row.frontIdUrl)"
              class="enterprise-logo"
              :show-download-btn="false"
            />
          </template>
        </template>
      </ProTableV2>
    </AppContainer>
    <IndividualUserDetailDialog v-bind="dialogProps" />
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
  UploadUserFile,
  PreviewBtn,
} from '@bole-core/components';
import { useAccess } from '@/hooks';
import { convertApi2FormUrl, format, setOSSLink } from '@/utils';
import * as userServices from '@/services/api/User';
import IndividualUserDetailDialog from './components/IndividualUserDetailDialog.vue';
import { Message } from '@bole-core/core';

defineOptions({
  name: 'IndividualUser',
});

const operationBtnMap: Record<string, OperationBtnType> = {
  /**
   * 键值名为encode
   */
  delBtn: { emits: { onClick: (role) => openDialog(role) } },
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

const { column, operationBtns } = useAccess({
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
      let params: API.GetCompanyUsersInput = {
        pageModel: {
          rows: pageSize,
          page: pageIndex,
        },
        queryCondition: extraParamState.queryCondition,
      };
      let res = await userServices.getPersonalUsers(params, {
        showLoading: !state.loading,
      });
      return res;
    } catch (error) {
      console.log('error: ', error);
    }
  },
  {
    defaultExtraParams: {
      queryCondition: '',
    },
    showSummary: true,
    summaryPropertys: [
      { property: 'productCount', valueKey: 'productCountSum' },
      { property: 'informationCount', valueKey: 'informationCountSum' },
    ],
    queryKey: ['userServices/getPersonalUsers'],
  }
);

async function openDialog(row?: any) {
  if (row) {
    let res = await getPersonalUser(row.userId);
    handleUserDetail({
      contacter: res.contacter,
      idNumber: res.idNumber,
      frontIdUrl: res.frontIdUrl?.length ? [convertApi2FormUrl(res.frontIdUrl)] : [],
      contacterPhone: res.contacter,
      registDate: res.registDate,
      attestateDate: res.attestateDate,
      productCount: res.productCount,
      informationCount: res.informationCount,
      serveStarLevel: res.serveStarLevel,
    });
  }
}

const { dialogProps, handleEdit: handleUserDetail } = useFormDialog({
  defaultFormParams: {
    contacter: '',
    idNumber: '',
    frontIdUrl: [] as UploadUserFile[],
    contacterPhone: '',
    registDate: '',
    attestateDate: '',
    productCount: 0,
    informationCount: 0,
    serveStarLevel: 0,
  },
  editTitle: '详情',
});

async function getPersonalUser(id: string) {
  try {
    return await userServices.getPersonalUser(
      { id: id },
      {
        showLoading: false,
      }
    );
  } catch (error) {}
}

async function userEnableOrForbid(row: API.PersonalUserDto) {
  try {
    await Message.tipMessage(`是否${row.isLocked ? '启用' : '禁用'}用户`);
    let res = await userServices.userEnableOrForbid({
      id: row.userId,
    });
    if (res) {
      Message.successMessage('操作成功');
      getList(paginationState.pageIndex);
      return !!res;
    }
  } catch (error) {}
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;
</style>
