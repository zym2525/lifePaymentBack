<template>
  <ProDialog title="详情" v-model="innerVisible" destroy-on-close draggable bodyNoPaddingBottom>
    <ProDialogTableWrapper :height="400">
      <ProTableV2 v-bind="proTableProps" :columns="columns" :showOperationColumn="false">
      </ProTableV2>
    </ProDialogTableWrapper>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('onCancel')">取 消</el-button>
        <el-button @click="emit('onConfirm')" type="primary">确 定</el-button>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import {
  ProDialog,
  ProTableV2,
  ProDialogTableWrapper,
  useTable,
  defineColumns,
} from '@bole-core/components';
import { OrderInputType } from '@bole-core/core';
import * as lifePayServices from '@/services/api/LifePay';
import { LifePayOrderTypeEnumText } from '@/constants';

defineOptions({
  name: 'LifePaymentUserDetailDialog',
});

type Props = {
  modelValue: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const form = defineModel<{
  userId: string;
}>('form');

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'onCancel'): void;
  (e: 'onConfirm'): void;
}>();

const columns = defineColumns([
  {
    id: '1',
    enCode: 'lifePayType',
    name: '户号类型',
  },
  {
    id: '2',
    enCode: 'city',
    name: '城市',
  },
  {
    id: '3',
    enCode: 'content',
    name: '户号',
  },
  {
    id: '4',
    enCode: 'isDeleted',
    name: '删除状态',
  },
  {
    id: '5',
    enCode: 'remark',
    name: '备注',
  },
]);

const innerVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

watch(
  () => props.modelValue,
  async (visible, oldVisible) => {
    if (!oldVisible && visible) {
      await getList();
    }
  }
);

const {
  getDataSource: getList,
  proTableProps,
  paginationState,
  extraParamState,
} = useTable(
  async ({ pageIndex, pageSize }, extraParamState) => {
    try {
      let params: API.QueryUserAccountListInput = {
        pageModel: {
          rows: pageSize,
          page: pageIndex,
          orderInput: extraParamState.orderInput,
        },
        userId: form.value.userId,
      };
      let res = await lifePayServices.getAccountPage(params);
      return res;
    } catch (error) {}
  },
  {
    defaultExtraParams: {
      orderInput: [{ property: 'creationTime', order: OrderInputType.Desc }],
    },
    columnsRenderProps: {
      lifePayType: {
        type: 'enum',
        valueEnum: LifePayOrderTypeEnumText,
      },
      isDeleted: {
        formatter: (row) => (row.isDeleted ? '已删除' : ''),
      },
    },
  }
);
</script>
