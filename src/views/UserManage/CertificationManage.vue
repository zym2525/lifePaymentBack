<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableQueryFilterBar @on-reset="reset">
        <template #query>
          <QueryFilterItem>
            <FieldRadio
              v-model="extraParamState.enterpriseType"
              :value-enum="EnterpriseTypeText"
              buttonStyle
              showAllBtn
              @change="getList()"
            />
          </QueryFilterItem>
          <QueryFilterItem>
            <FieldRadio
              v-model="extraParamState.status"
              :value-enum="UserCertificationStatusTextForFilterV2"
              buttonStyle
              showAllBtn
              @change="getList()"
            />
          </QueryFilterItem>
          <QueryFilterItem tip-content="提交日期">
            <FieldDatePicker
              v-model="extraParamState.creationTime"
              type="daterange"
              range-separator="~"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
              clearable
              @change="getList()"
            ></FieldDatePicker>
          </QueryFilterItem>
          <QueryFilterItem>
            <SearchInput
              v-model="extraParamState.keyword"
              style="width: 360px"
              placeholder="企业名称/联系人/手机号码/信用代码/订单号"
              @on-click-search="getList"
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
          <template v-if="column.property === 'roleType'">
            <div class="pre">{{ row[column.property] }}</div>
          </template>
          <template v-else-if="column.property === 'note'">
            <div class="pre">{{ row[column.property] }}</div>
          </template>
        </template>
      </ProTableV2>
    </AppContainer>
    <CertificationDetailDialog v-bind="dialogProps" />
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
  FieldDatePicker,
  FieldRadio,
  UploadUserFile,
} from '@bole-core/components';
import { useAccess, useOpenLogByTypeDialog } from '@/hooks';
import * as userServices from '@/services/api/User';
import { ModelValueType } from 'element-plus';
import { OrderInputType } from '@bole-core/core';
import {
  EnterpriseType,
  EnterpriseTypeText,
  UserCertificationStatus,
  UserCertificationModeEnumV2Text,
  UserCertificationChannelEnumText,
  UserCertificationChannelEnum,
  UserCertificationStatusTextV2,
  UserCertificationStatusTextForFilterV2,
  UserCertificationStatusTagV2,
  OperateHistoryTypeEnum,
  UserCertificationModeEnumV2,
  UserCertificationElementEnum,
} from '@/constants';
import { format, setOSSLink, convertApi2FormUrlOnlyOne } from '@/utils';
import CertificationDetailDialog from './components/CertificationDetailDialog.vue';

defineOptions({
  name: 'CertificationManage',
});

const operationBtnMap: Record<string, OperationBtnType> = {
  detailBtn: { emits: { onClick: (role) => openDialog(role) } },
  logBtn: { emits: { onClick: (role) => openLogDialog(role.userId) } },
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
      let params: API.QueryCertifiedUserListInput = {
        pageModel: {
          rows: pageSize,
          page: pageIndex,
          orderInput: extraParamState.orderInput,
        },
        status: extraParamState.status,
        enterpriseType: extraParamState.enterpriseType,
        searchKey2: extraParamState.keyword,
        creationBeginTime: format(extraParamState.creationTime?.[0] ?? '', 'YYYY-MM-DD 00:00:00'),
        creationEndTime: format(extraParamState.creationTime?.[1] ?? '', 'YYYY-MM-DD 23:59:59'),
      };
      let res = await userServices.getUserCertifiedManagerPage(params, {
        showLoading: !state.loading,
      });
      return res;
    } catch (error) {}
  },
  {
    defaultExtraParams: {
      keyword: '',
      creationTime: [] as unknown as ModelValueType,
      enterpriseType: '' as any as EnterpriseType,
      status: '' as any as UserCertificationStatus,
      orderInput: [{ property: 'id', order: OrderInputType.Desc }],
    },
    columnPropsMap: ['certificationTime'],
    columnsRenderProps: {
      contact: {
        formatter: (row: API.CertifiedUserListDto) =>
          row.certificationChannel === UserCertificationChannelEnum.ThirdParty
            ? row.certificationContact
            : row.contact,
      },
      contactPhone: {
        formatter: (row: API.CertifiedUserListDto) =>
          row.certificationChannel === UserCertificationChannelEnum.ThirdParty
            ? row.certificationContactPhone
            : row.contactPhone,
      },
      enterpriseType: {
        type: 'enum',
        valueEnum: EnterpriseTypeText,
      },
      //@ts-ignore
      certificationType: { formatter: () => '企业' },
      licenseUrl: {
        type: 'url',
        formatter: (row: API.CertifiedUserListDto) => setOSSLink(row.licenseUrl),
        modal: true,
        showDownloadBtn: false,
      },
      certificationChannel: {
        type: 'enum',
        valueEnum: UserCertificationChannelEnumText,
      },
      certificationMode: {
        type: 'enum',
        valueEnum: UserCertificationModeEnumV2Text,
      },
      status: {
        type: 'tag',
        valueEnum: UserCertificationStatusTextV2,
        tagTypeEnum: UserCertificationStatusTagV2,
      },
      certificationTime: {
        type: 'date',
      },
    },
  }
);

async function openDialog(row?: API.CertifiedUserListDto) {
  try {
    console.log('row: ', row);
    let detail = await userServices.getCompanyUser({ id: row.id });
    if (row) {
      handleEdit({
        societyCreditCode: detail.societyCreditCode,
        licenseUrl: convertApi2FormUrlOnlyOne(detail.licenseUrl),
        legalPersonName: detail.legalPersonName,
        legalPersonIdNumber: detail.legalPersonIdNumber,
        legalPersonIdImgUrl: convertApi2FormUrlOnlyOne(detail.legalPersonIdImgUrl),
        certificationMode: detail.certificationMode ?? ('' as any),
        proxyPersonName: detail.proxyPersonName,
        proxyPersonIdNumber: detail.proxyPersonIdNumber,
        proxyPersonIdImgUrl: convertApi2FormUrlOnlyOne(detail.proxyPersonIdImgUrl),
        proxyPowerAttorneyUrl: convertApi2FormUrlOnlyOne(detail.proxyPowerAttorneyUrl),
        certificationChannel: detail.certificationChannel ?? ('' as any),
        certificationElement: detail.certificationElement ?? ('' as any),
        bankCardNumber: detail.bankCardNumber,
        legalPersonIdBackImgUrl: convertApi2FormUrlOnlyOne(detail.legalPersonIdBackImgUrl),
        proxyPersonIdBackImgUrl: convertApi2FormUrlOnlyOne(detail.proxyPersonIdBackImgUrl),
        id: detail.id,
        enterpriseType: detail.enterpriseType,
        enterpriseName: detail.enterpriseName,
        certificationTime: detail.certificationTime,
        status: detail.status ?? ('' as any),
        contact: detail.certificationContact,
        contactPhone: detail.certificationContactPhone,
        registTime: detail.registTime,
        legalPersonBankCardImgUrl: convertApi2FormUrlOnlyOne(detail.legalPersonBankCardImgUrl),
        proxyPersonBankCardImgUrl: convertApi2FormUrlOnlyOne(detail.proxyPersonBankCardImgUrl),
      });
    } else {
      handleAdd();
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

const { dialogProps, handleAdd, handleEdit, editForm } = useFormDialog({
  defaultFormParams: {
    societyCreditCode: '',
    licenseUrl: [] as UploadUserFile[],
    legalPersonName: '',
    legalPersonIdNumber: '',
    legalPersonIdImgUrl: [] as UploadUserFile[],
    certificationMode: '' as any as UserCertificationModeEnumV2,
    proxyPersonName: '',
    proxyPersonIdNumber: '',
    proxyPersonIdImgUrl: [] as UploadUserFile[],
    proxyPowerAttorneyUrl: [] as UploadUserFile[],
    certificationChannel: '' as any as UserCertificationChannelEnum,
    certificationElement: '' as any as UserCertificationElementEnum,
    bankCardNumber: '',
    legalPersonIdBackImgUrl: [] as UploadUserFile[],
    proxyPersonIdBackImgUrl: [] as UploadUserFile[],
    id: '',
    enterpriseType: EnterpriseType.HREnterprise,
    enterpriseName: '',
    certificationTime: '',
    status: UserCertificationStatus.NotCertified,
    contact: '',
    contactPhone: '',
    registTime: '',
    legalPersonBankCardImgUrl: [] as UploadUserFile[],
    proxyPersonBankCardImgUrl: [] as UploadUserFile[],
  },
});

const { openLogDialog, logDialogProps } = useOpenLogByTypeDialog({
  operateHistoryType: OperateHistoryTypeEnum.UserCertificationManage,
});
</script>
