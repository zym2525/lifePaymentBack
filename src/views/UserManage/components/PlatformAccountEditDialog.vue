<template>
  <ProDialog
    title="账号修改"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :rules="rules" :model="innerForm" ref="dialogForm" label-width="90px">
      <ProFormItemV2 label="原账号" prop="userName">
        <ProFormText v-model.trim="innerForm.userName" disabled></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2 label="新账号" prop="newUserName">
        <ProFormText placeholder="请输入新账号" v-model.trim="innerForm.newUserName"></ProFormText>
        <template #tip> 账号由8-13位字符（大写字母、小写字母、数字）组成</template>
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
import { ProDialog, ProForm, ProFormItemV2, ProFormText } from '@bole-core/components';

defineOptions({
  name: 'PlatformAccountEditDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    userId: string;
    userName: string;
    newUserName: string;
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

const rules = reactive<FormRules>({
  newUserName: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新账号'));
        } else if (value === innerForm.value.userName) {
          callback(new Error('账号重复，请输入新账号'));
        } else if (!/^[A-Za-z0-9]{8,13}$/.test(value)) {
          callback(new Error('账号应满足8-13位，并包含大写字母或小写字母或数字'));
        } else {
          callback();
        }
      },
    },
  ],
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
