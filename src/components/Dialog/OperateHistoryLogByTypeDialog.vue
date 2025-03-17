<template>
  <ProDialog
    title="日志"
    v-model="innerVisible"
    destroy-on-close
    draggable
    bodyNoPaddingBottom
    @close="onDialogClose"
  >
    <ProDialogTableWrapper :height="500">
      <ProTableV2 v-bind="proTableProps" :columns="extraColumns" :showOperationColumn="false">
        <template #functionColumn>{{ props.functionModule }}</template>
      </ProTableV2>
    </ProDialogTableWrapper>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="innerVisible = false" type="primary">确 定</el-button>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import { ProDialog, ProTableV2, ProDialogTableWrapper } from '@bole-core/components';
import { useTableLogListByType } from '@/hooks';
import { OperateHistoryTypeEnum } from '@/constants';

defineOptions({
  name: 'OperateHistoryLogByTypeDialog',
});

type Props = {
  modelValue: boolean;
  relationId: string;
  operateHistoryType?: OperateHistoryTypeEnum;

  functionModule?: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'onConfirm'): void;
}>();

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
      state.loading = false;
    }
  }
);

function onDialogClose() {
  state.loading = true;
}

const functionModuleColumns: API.CustomModuleColumnDto[] = [
  { id: '0', enCode: 'functionColumn', name: '功能模块' },
];

const extraColumns = computed(() => {
  return props.functionModule
    ? functionModuleColumns.concat(OperateHistoryTableColumns)
    : OperateHistoryTableColumns;
});

const { getList, proTableProps, state, OperateHistoryTableColumns } = useTableLogListByType({
  relationId: toRef(props, 'relationId'),
  operateHistoryType: toRef(props, 'operateHistoryType'),
});
</script>
