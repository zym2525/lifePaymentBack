<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableQueryFilterBar @on-reset="reset">
        <template #query>
          <QueryFilterItem>
            <FieldSelect
              v-model="extraParamState.authType"
              :value-enum="EnterpriseTypeText"
              placeholder="请选择公司类型"
              clearable
              @change="getList()"
            />
          </QueryFilterItem>
          <QueryFilterItem tip-content="注册日期范围">
            <FieldDatePicker
              v-model="extraParamState.registDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
              @change="getList()"
            ></FieldDatePicker>
          </QueryFilterItem>
          <!-- <QueryFilterItem tip-content="最后登录日期范围">
            <FieldDatePicker
              v-model="extraParamState.lastLoginTime"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
              @change="getList()"
            ></FieldDatePicker>
          </QueryFilterItem> -->
          <QueryFilterItem>
            <SearchInput
              v-model="extraParamState.queryCondition"
              style="width: 300px"
              placeholder="公司名称/账号/用户手机号"
              @on-click-search="getList"
            >
            </SearchInput>
          </QueryFilterItem>
        </template>
        <template #btn>
          <el-button
            v-if="checkSubModuleItemShow('pageButton', 'addBtn')"
            @click="goAddOrEditPlatformUser()"
            icon="Plus"
            type="primary"
            >新增用户</el-button
          >
        </template>
      </ProTableQueryFilterBar>
      <ProTableV2
        v-bind="proTableProps"
        :columns="column"
        :operationBtns="operationBtns"
        :columnPropsMap="columnPropsMap"
      >
      </ProTableV2>
    </AppContainer>
    <PlatformUserDetailDialog v-bind="dialogProps" />
    <FuncConfigDialog v-bind="dialogFuncConfigProps" />
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
  FieldDatePicker,
  FieldSelect,
} from '@bole-core/components';
import { useAccess, useGlobalEventContext, useProductCategoryList } from '@/hooks';
import * as userServices from '@/services/api/User';
import {
  UserCertificationStatusTag,
  UserCertificationStatusText,
  UserCertificationStatus,
  EnterpriseTypeText,
  EnterpriseType,
  CanLoginUserSignEnum,
} from '@/constants';
import { OrderInputType, Message } from '@bole-core/core';
import PlatformUserDetailDialog from './components/PlatformUserDetailDialog.vue';
import FuncConfigDialog from './components/FuncConfigDialog.vue';
import { convertApi2FormUrlOnlyOne, format } from '@/utils';
import { ModelValueType } from 'element-plus';
import * as accountServices from '@/services/api/Account';

defineOptions({
  name: 'PlatformUser',
});

const operationBtnMap: Record<string, OperationBtnType> = {
  editBtn: {
    emits: { onClick: (role) => goAddOrEditPlatformUser(role) },
  },
  detailBtn: {
    emits: { onClick: (role) => openDialog(role) },
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
  logBtn: {
    emits: { onClick: (role) => goLog(role) },
  },
  resetPasswordBtn: {
    emits: { onClick: (role) => handleResetPassword(role) },
  },
  companyPublishBtn: {
    emits: { onClick: (role) => goCompanyPublish(role) },
    extraProps: {
      hide: (row) => !row.canPublishParkOrHR,
    },
  },
  funcConfigBtn: {
    emits: { onClick: (role) => openFuncConfigDialog(role) },
  },
};

const { column, operationBtns, columnPropsMap, checkSubModuleItemShow } = useAccess({
  operationBtnMap,
  columnPropsMap: {
    registDate: {
      sortable: 'custom',
    },
    // lastLoginTime: {
    //   sortable: 'custom',
    // },
    attestateDate: {
      sortable: 'custom',
    },
  },
});

const { iHasParkCategory, ensureCategoryMenu } = useProductCategoryList();

const eventContext = useGlobalEventContext();

eventContext.addEvent('parkAuditList:audit', () => {
  getList(paginationState.pageIndex);
});

eventContext.addEvent('platformUser:add', () => {
  getList();
});

eventContext.addEvent('platformUser:edit', () => {
  getList(paginationState.pageIndex);
});

const BaseState = {
  loading: true,
  categoryId: '',
};

const state = reactive({ ...BaseState });

onMounted(async () => {
  await ensureCategoryMenu();
  state.categoryId = iHasParkCategory.value.id;
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
      let params: API.GetAllAttestationsInputV2 = {
        pageModel: {
          rows: pageSize,
          page: pageIndex,
          orderInput: extraParamState.orderInput,
        },
        status: extraParamState.status,
        authType: extraParamState.authType,
        queryCondition: extraParamState.queryCondition,
        // beginLastLoginTime: format(extraParamState.lastLoginTime?.[0] ?? '', 'YYYY-MM-DD 00:00:00'),
        // endLastLoginTime: format(extraParamState.lastLoginTime?.[1] ?? '', 'YYYY-MM-DD 23:59:59'),
        beginRegistDate: format(extraParamState.registDate?.[0] ?? '', 'YYYY-MM-DD 00:00:00'),
        endRegistDate: format(extraParamState.registDate?.[1] ?? '', 'YYYY-MM-DD 23:59:59'),
      };
      let res = await userServices.getAllPlatUserAttestation(params, {
        showLoading: !state.loading,
      });
      return res;
    } catch (error) {}
  },
  {
    defaultExtraParams: {
      status: '' as any as UserCertificationStatus,
      authType: '' as any as EnterpriseType,
      queryCondition: '',
      registDate: [] as unknown as ModelValueType,
      // lastLoginTime: [] as unknown as ModelValueType,
      orderInput: [{ property: 'registDate', order: OrderInputType.Desc }],
    },
    queryKey: ['userServices/getAllPlatUserAttestation'],
    columnsRenderProps: {
      status: {
        type: 'tag',
        tagTypeEnum: UserCertificationStatusTag,
        valueEnum: UserCertificationStatusText,
      },
      authType: {
        type: 'enum',
        valueEnum: EnterpriseTypeText,
      },
      registDate: {
        type: 'date',
      },
      // attestateDate: {
      //   type: 'date',
      // },
      lastLoginTime: {
        type: 'date',
      },
    },
  }
);
function openDialog(row?: API.PlatUserAttestationDto) {
  // if (row) {
  //   try {
  //     let res = await userServices.getPlatUserAttestationInfo({ id: row.id });
  //     if (res) {
  //       handleEdit({
  //         customerName: res.customerName,
  //         societyCreditCode: res.societyCreditCode,
  //         licenseUrl: convertApi2FormUrlOnlyOne(res.licenseUrl),
  //         address: res.address,
  //         contacter: res.contacter,
  //         phoneNumber: res.phoneNumber,
  //         firmSize: res.firmSize,
  //         jobPosition: res.jobPosition,
  //         registDate: res.registDate,
  //         attestateDate: res.attestateDate,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  router.push({
    name: 'PlatformUserDetail',
    params: {
      id: row.userId ?? '',
    },
  });
}

const { dialogProps, handleEdit } = useFormDialog({
  defaultFormParams: {
    customerName: '',
    societyCreditCode: '',
    licenseUrl: [] as UploadUserFile[],
    address: '',
    contacter: '',
    phoneNumber: '',
    firmSize: 0,
    jobPosition: 0,
    registDate: '',
    attestateDate: '',
  },
  editTitle: '详情',
});

async function userEnableOrForbid(row: API.PlatUserAttestationDto) {
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

const router = useRouter();

function goLog(row: API.PlatUserAttestationDto) {
  router.push({
    name: 'PlatformUserLog',
    params: {
      id: row.userId,
    },
  });
}

function goCompanyPublish(row: API.PlatUserAttestationDto) {
  router.push({
    name: 'AddOrEditHREnterprise',
    query: {
      userId: row.userId,
    },
  });
}

async function handleResetPassword(row: API.PlatUserAttestationDto) {
  try {
    await Message.tipMessage(`确定是否重置用户账户密码？`);
    let res = await accountServices.resetPasswordWithMicroNotify({
      userId: row.userId,
    });
    if (res) {
      Message.successMessage('操作成功');
    }
  } catch (error) {}
}

function goAddOrEditPlatformUser(row?: API.PlatUserAttestationDto) {
  router.push({
    name: 'AddOrEditPlatformUserInfo',
    params: {
      id: row?.userId ?? '',
    },
  });
}

const {
  dialogProps: dialogFuncConfigProps,
  handleEdit: handleFuncConfigEdit,
  editForm: funcConfigForm,
} = useFormDialog({
  onConfirm: handleFuncConfig,
  defaultFormParams: {
    id: '',
    bussinessCode: '',
    funcConfigType: [] as CanLoginUserSignEnum[],
  },
});

function openFuncConfigDialog(row?: API.PlatUserAttestationDto) {
  handleFuncConfigEdit({
    id: row?.id ?? '',
    funcConfigType:
      row.canLoginUserSign === CanLoginUserSignEnum.CanLoginSign
        ? [CanLoginUserSignEnum.CanLoginSign, CanLoginUserSignEnum.CanLogin818]
        : [CanLoginUserSignEnum.CanLogin818],
    bussinessCode: row.bussinessCode ?? '',
  });
}

async function handleFuncConfig() {
  try {
    let canLoginUserSignList = funcConfigForm.funcConfigType?.filter(
      (x) => x !== CanLoginUserSignEnum.CanLogin818
    );
    let params: API.SetCanLoginUserSignInput = {
      id: funcConfigForm.id,
      canLoginUserSign:
        canLoginUserSignList?.length > 0 ? canLoginUserSignList[0] : CanLoginUserSignEnum.CanNot,
      bussinessCode: funcConfigForm.bussinessCode,
    };
    let res = await userServices.setCanLoginUserSign(params);
    if (res) {
      Message.successMessage('操作成功');
      getList(paginationState.pageIndex);
    }
  } catch (error) {}
}
</script>
