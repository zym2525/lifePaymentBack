<template>
  <ProDialog
    :title="innerForm.title"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :rules="rules" :model="innerForm" ref="dialogForm" label-width="110px">
      <ProFormItemV2 label="角色名称" prop="name">
        <ProFormText placeholder="请输入角色名称" v-model.trim="innerForm.name"></ProFormText>
      </ProFormItemV2>
      <!-- <ProFormItemV2 label="数据可见范围" prop="dataRange">
        <ProFormRadio
          v-model="innerForm.dataRange"
          :value-enum="DataRangeEnumText"
          :buttonStyle="false"
        ></ProFormRadio>
      </ProFormItemV2> -->
      <ProFormItemV2 label="备注:" prop="remark">
        <ProFormTextArea
          v-model="innerForm.remark"
          placeholder="请输入备注"
          show-word-limit
          :maxlength="2000"
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
  ProFormRadio,
  ProFormTextArea,
} from '@bole-core/components';
import { DataRangeEnumText, DataRangeEnum } from '@/constants';

defineOptions({
  name: 'AddOrEditRoleDialog',
});

type Props = {
  modelValue: boolean;
  form: {
    id: string;
    title?: string;
    name: string;
    // departmentId: number;
    remark: string;
    dataRange: DataRangeEnum;
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
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  departmentId: [{ required: true, message: '请选择部门', trigger: 'change' }],
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
