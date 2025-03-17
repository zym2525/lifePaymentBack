<template>
  <ProDialog
    :title="`${dialogTitle}${statusText}`"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :rules="rules" :model="innerForm" ref="dialogForm" label-width="110px">
      <ProFormMixinsItemContainer>
        <ProFormItemV2 label="所属账号:" mode="read">
          <ProFormText placeholder="请输入名称" :modelValue="name"></ProFormText>
        </ProFormItemV2>
      </ProFormMixinsItemContainer>

      <ProFormItemV2 :label="`${statusText}原因:`" prop="remark">
        <ProFormTextArea
          placeholder="多行输入"
          v-model="innerForm.remark"
          :maxlength="150"
        ></ProFormTextArea>
      </ProFormItemV2>
    </ProForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('onCancel')">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import { FormRules, FormInstance } from 'element-plus';
import {
  ProDialog,
  ProForm,
  ProFormItemV2,
  ProFormText,
  ProFormTextArea,
  ProFormMixinsItemContainer,
} from '@bole-core/components';
import { OrderStatus } from '@/constants';

defineOptions({
  name: 'OrderTakeDownDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    title?: string;
    userName: string;
    companyName?: string;
    remark: string;
    status?: number;
  };
  dialogTitle?: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  dialogTitle: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:form', value: Props['form']): void;
  (e: 'onConfirm', value: number): void;
  (e: 'onCancel'): void;
}>();

const dialogForm = ref<FormInstance>();

const statusText = computed(() => {
  return props.form?.status === OrderStatus.Passed ? '下架' : '上架';
});

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

const name = computed(() => `${props.form.userName}`);

const rules = computed<FormRules>(() => {
  return {
    remark: [
      { required: true, message: `请输入${statusText.value}原因`, trigger: 'blur' },
      { max: 150, message: `${statusText.value}原因不能超过150个字符`, trigger: 'blur' },
    ],
  };
});

function onDialogClose() {
  if (!dialogForm.value) return;
  dialogForm.value.resetFields();
}

function handleConfirm() {
  if (!dialogForm.value) return;
  dialogForm.value.validate((valid) => {
    if (valid) {
      emit('onConfirm', innerForm.value.status);
    } else {
      return;
    }
  });
}
</script>
