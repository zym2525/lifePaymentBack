<template>
  <ProDialog
    :title="innerForm.title"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :model="innerForm" ref="dialogForm" label-width="100px">
      <ProFormCol>
        <ProFormColItem :span="24">
          <ProFormItemV2 label="腾讯UserId:" prop="tencentUserId">
            <ProFormText placeholder="请输入姓名" v-model.trim="innerForm.tencentUserId" />
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
      <ProFormCol>
        <ProFormColItem :span="24">
          <ProFormItemV2 label="备注:" prop="remark">
            <ProFormText placeholder="请输入备注" v-model.trim="innerForm.remark"></ProFormText>
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
    </ProForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('onCancel')">关闭</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus';
import {
  ProDialog,
  ProForm,
  ProFormCol,
  ProFormColItem,
  ProFormItemV2,
  ProFormText,
} from '@bole-core/components';

defineOptions({
  name: 'TencentUserDetailDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    title?: string;
    tencentUserId: string;
    remark: string;
  };
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:form', value: Props['form']): void;
  (e: 'onConfirm'): void;
  (e: 'onCancel'): void;
}>();

const dialogForm = ref<FormInstance>();

const innerVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const innerForm = computed({
  get() {
    return props.form;
  },
  set(val) {
    emit('update:form', val);
  },
});

function onDialogClose() {
  if (!dialogForm.value) return;
  dialogForm.value.resetFields();
}
function handleConfirm() {
  if (!dialogForm.value) return;
  dialogForm.value.validate((valid) => {
    if (valid) {
      emit('onConfirm');
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;
</style>
