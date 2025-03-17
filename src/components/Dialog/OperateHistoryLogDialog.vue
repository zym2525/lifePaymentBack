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
      <ProTableV2
        v-bind="proTableProps"
        :columns="OperateHistoryTableColumns"
        :showOperationColumn="false"
      >
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
import { useTableLogList } from '@/hooks';

defineOptions({
  name: 'OperateHistoryLogDialog',
});

type Props = {
  modelValue: boolean;
  relationId: string;
  operateType?: number;
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

const { getList, proTableProps, state, OperateHistoryTableColumns } = useTableLogList({
  relationId: toRef(props, 'relationId'),
  operateType: toRef(props, 'operateType'),
});
</script>
