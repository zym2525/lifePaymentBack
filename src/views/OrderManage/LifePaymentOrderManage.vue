<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableQueryFilterBar @on-reset="reset">
        <template #query>
          <QueryFilterItem tip-content="支付时间">
            <FieldDatePicker
              v-model="extraParamState.payTime"
              type="daterange"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              clearable
              @change="getList()"
            ></FieldDatePicker>
          </QueryFilterItem>
          <QueryFilterItem tip-content="完成时间">
            <FieldDatePicker
              v-model="extraParamState.finishTime"
              type="daterange"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              clearable
              @change="getList()"
            ></FieldDatePicker>
          </QueryFilterItem>
          <QueryFilterItem>
            <FieldRadio
              v-model="extraParamState.lifePayOrderType"
              :value-enum="LifePayOrderTypeEnumText"
              buttonStyle
              showAllBtn
              @change="getList()"
            />
          </QueryFilterItem>
          <QueryFilterItem>
            <FieldRadio
              v-model="extraParamState.payStatus"
              :value-enum="LifePayStatusEnumText"
              buttonStyle
              showAllBtn
              @change="getList()"
            />
          </QueryFilterItem>
          <QueryFilterItem>
            <FieldRadio
              v-model="extraParamState.lifePayOrderStatus"
              :value-enum="LifePayOrderStatusEnumText"
              buttonStyle
              showAllBtn
              @change="getList()"
            />
          </QueryFilterItem>
          <QueryFilterItem>
            <FieldRadio
              v-model="extraParamState.lifePayOrderStatus"
              :value-enum="LifePayTypeEnumText"
              buttonStyle
              showAllBtn
              @change="getList()"
            />
          </QueryFilterItem>
          <QueryFilterItem>
            <SearchInput
              v-model="extraParamState.keyWord"
              style="width: 360px"
              placeholder="手机号/平台订单号/渠道流水号/外部订单号"
              @on-click-search="getList"
            >
            </SearchInput>
          </QueryFilterItem>
        </template>
        <template #btn>
          <el-button
            @click="getLifePayOrderPageExport()"
            icon="Download"
            type="primary"
            v-if="checkSubModuleItemShow('pageButton', 'exportBtn')"
            >导出</el-button
          >
        </template>
      </ProTableQueryFilterBar>
      <ProTableV2 v-bind="proTableProps" :columns="column" :operationBtns="operationBtns">
      </ProTableV2>
    </AppContainer>
    <OperateHistoryLogByTypeDialog v-bind="logDialogProps" />
    <UploadRefundVoucher v-bind="dialogUploadRefundVoucherProps" />
  </LoadingLayout>
</template>

<script setup lang="ts">
import {
  ProTableQueryFilterBar,
  QueryFilterItem,
  OperationBtnType,
  ProTableV2,
  LoadingLayout,
  AppContainer,
  useTable,
  FieldRadio,
  FieldDatePicker,
  useFormDialog,
  UploadUserFile,
  bolePreview,
  SearchInput,
} from '@bole-core/components';
import { useAccess, useOpenLogByTypeDialog } from '@/hooks';
import {
  LifePayStatusEnum,
  LifePayStatusEnumText,
  LifePayOrderStatusEnum,
  LifePayOrderStatusEnumText,
  LifePayOrderTypeEnum,
  LifePayOrderTypeEnumText,
  OperateHistoryTypeEnum,
  LifePayTypeEnumText,
  LifePayTypeEnum,
  LifePayRefundAuditStatus,
} from '@/constants';
import * as lifePayServices from '@/services/api/LifePay';
import { Message, OrderInputType } from '@bole-core/core';
import { format, omitByFalse, setOSSLink, downloadFile } from '@/utils';
import { ModelValueType } from 'element-plus';
import UploadRefundVoucher from '../ServicesManage/components/UploadRefundVoucher.vue';
import _ from 'lodash';

defineOptions({
  name: 'LifePaymentOrderManage',
});

const operationBtnMap: Record<string, OperationBtnType> = {
  voucherBtn: {
    emits: { onClick: (role) => handleVoucher(role) },
    props: { type: 'danger' },
    extraProps: {
      hide: (row: API.LifePayOrderListOutput) =>
        !(
          (row.lifePayOrderStatus === LifePayOrderStatusEnum.Failed ||
            row.lifePayOrderStatus === LifePayOrderStatusEnum.Refunded) &&
          row.payStatus === LifePayStatusEnum.Refunded
        ),
    },
  },
  refundBtn: {
    emits: { onClick: (role) => handleRefund(role) },
    props: { type: 'danger' },
    extraProps: {
      hide: (row: API.LifePayOrderListOutput) =>
        !(
          (row.lifePayOrderStatus === LifePayOrderStatusEnum.Failed &&
            row.payStatus === LifePayStatusEnum.WaitRefund) ||
          row.lifePayOrderStatus === LifePayOrderStatusEnum.RefundWaitAudit ||
          row.lifePayOrderStatus === LifePayOrderStatusEnum.WaitConfirm
        ),
    },
  },
  logBtn: { emits: { onClick: (role) => openLogDialog(role.id) } },
};

const { column, operationBtns, checkSubModuleItemShow } = useAccess({
  operationBtnMap,
});

const BaseState = {
  loading: true,
};
const state = reactive({ ...BaseState });
const route = useRoute();
const companyId = (route.params.id as string) ?? '';

const {
  getDataSource: getList,
  proTableProps,
  paginationState,
  extraParamState,
  reset,
} = useTable(
  async ({ pageIndex, pageSize }, extraParamState) => {
    try {
      let params = createParams(pageIndex, pageSize);
      let res = await lifePayServices.getLifePayOrderPage(omitByFalse(params), {
        showLoading: !state.loading,
      });
      return res;
    } catch (error) {}
  },
  {
    defaultExtraParams: {
      payStatus: '' as any as LifePayStatusEnum,
      lifePayOrderStatus: '' as any as LifePayOrderStatusEnum,
      lifePayOrderType: '' as any as LifePayOrderTypeEnum,
      lifePayType: '' as any as LifePayTypeEnum,
      payTime: [] as unknown as ModelValueType,
      finishTime: [] as unknown as ModelValueType,
      orderInput: [{ property: 'id', order: OrderInputType.Desc }],
      keyWord: '',
    },
    columnsRenderProps: {
      lifePayOrderType: { type: 'enum', valueEnum: LifePayOrderTypeEnumText },
      payStatus: { type: 'enum', valueEnum: LifePayStatusEnumText },
      lifePayOrderStatus: { type: 'enum', valueEnum: LifePayOrderStatusEnumText },
      payTime: { type: 'date', format: 'YYYY-MM-DD HH:mm:ss' },
      finishTime: { type: 'date', format: 'YYYY-MM-DD HH:mm:ss' },
      creationTime: { type: 'date', format: 'YYYY-MM-DD HH:mm:ss' },
      rechargeAmount: { type: 'money' },
      payAmount: { type: 'money' },
      lifePayType: { type: 'enum', valueEnum: LifePayTypeEnumText },
    },
  }
);

function createParams(pageIndex: number, pageSize: number) {
  let params: API.QueryLifePayOrderListInput = {
    pageModel: {
      rows: pageSize,
      page: pageIndex,
      orderInput: extraParamState.orderInput,
    },
    lifePayOrderType: extraParamState.lifePayOrderType,
    payStatus: extraParamState.payStatus,
    lifePayOrderStatus: extraParamState.lifePayOrderStatus,
    userId: companyId,
    beginPayTime: format(extraParamState.payTime?.[0] ?? '', 'YYYY-MM-DD 00:00:00'),
    endPayTime: format(extraParamState.payTime?.[1] ?? '', 'YYYY-MM-DD 23:59:59'),
    beginFinishTime: format(extraParamState.finishTime?.[0] ?? '', 'YYYY-MM-DD 00:00:00'),
    endFinishTime: format(extraParamState.finishTime?.[1] ?? '', 'YYYY-MM-DD 23:59:59'),
    lifePayType: extraParamState.lifePayType,
    keyWords: extraParamState.keyWord,
  };
  return params;
}

async function getLifePayOrderPageExport() {
  try {
    let params = createParams(paginationState.pageIndex, paginationState.pageSize);
    let res = await lifePayServices.getLifePayOrderPageExport(params, {
      getResponse: true,
      responseType: 'blob',
    });
    if (res) {
      downloadFile(res.data, `缴费订单`, 'xlsx');
      Message.successMessage('导出成功');
    }
  } catch (error) {}
}

const {
  dialogProps: dialogUploadRefundVoucherProps,
  handleEdit: handleUploadRefundVoucherEdit,
  editForm: editUploadRefundVoucherForm,
} = useFormDialog({
  onConfirm: refundLifePayOrder,
  defaultFormParams: {
    id: '',
    refundCredentialsImgUrl: [] as UploadUserFile[],
    remark: '',
    refundApplyRemark: '',
    status: LifePayRefundAuditStatus.Pass,
  },
});

const handleRefund = (row?: API.LifePayOrderListOutput) => {
  handleUploadRefundVoucherEdit({
    id: row?.id ?? '',
    refundCredentialsImgUrl: [] as UploadUserFile[],
    remark: '',
    refundApplyRemark: row.refundApplyRemark,
    status: LifePayRefundAuditStatus.Pass,
  });
};

async function refundLifePayOrder() {
  try {
    let params: API.RefundLifePayOrderInput = {
      id: editUploadRefundVoucherForm.id,
      refundCredentialsImgUrl: editUploadRefundVoucherForm.refundCredentialsImgUrl?.[0]?.path ?? '',
      refundCheckRemark: editUploadRefundVoucherForm.remark,
    };
    let res: number;
    if (editUploadRefundVoucherForm.status === LifePayRefundAuditStatus.Pass) {
      res = await lifePayServices.refundLifePayOrder(params);
    } else {
      res = await lifePayServices.rejectRefundLifePayOrder(params);
    }
    if (res) {
      Message.successMessage('操作成功');
      getList(paginationState.pageIndex);
    }
  } catch (error) {}
}

function handleVoucher(row?: API.LifePayOrderListOutput) {
  bolePreview({
    fileUrl: setOSSLink(row.refundCredentialsImgUrl),
  });
}

const { openLogDialog, logDialogProps } = useOpenLogByTypeDialog({
  operateHistoryType: OperateHistoryTypeEnum.LifePayOrder,
});
onMounted(async () => {
  await getList();
  state.loading = false;
});
</script>
