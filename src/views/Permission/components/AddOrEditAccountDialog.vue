<template>
  <ProDialog
    :title="innerForm.title"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :rules="rules" :model="innerForm" ref="dialogForm" label-width="90px">
      <ProFormItemV2 label="姓名" prop="name">
        <ProFormText placeholder="请输入姓名" v-model.trim="innerForm.name"></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2 label="手机号" prop="phoneNumber">
        <ProFormText placeholder="请输入手机号" v-model.trim="innerForm.phoneNumber"></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2 label="账号" prop="userName">
        <ProFormText placeholder="请输入账号" v-model.trim="innerForm.userName"></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2 label="角色" prop="roleNames">
        <ProFormCheckbox
          v-model="innerForm.roleNames"
          :value-enum="allRoleList"
          enumLabelKey="name"
          enum-value-key="name"
        ></ProFormCheckbox>
      </ProFormItemV2>
      <ProFormItemV2
        label="所属公司:"
        prop="companyOrgId"
        :check-rules="[{ message: '请选择公司' }]"
      >
        <ProFormSelect
          v-model="form.companyOrgId"
          :valueEnum="sysOrgList"
          enumLabelKey="orgName"
          enum-value-key="id"
          clearable
          filterable
          placeholder="请选择公司"
          @change="changeCompany"
        >
        </ProFormSelect>
      </ProFormItemV2>
      <ProFormItemV2
        label="所属部门:"
        prop="departmentOrgId"
        :check-rules="[{ message: '请选择部门' }]"
      >
        <ProFormSelect
          v-model="form.departmentOrgId"
          :valueEnum="allDepartmentList"
          enumLabelKey="orgName"
          enum-value-key="id"
          clearable
          filterable
          placeholder="请选择部门"
        >
        </ProFormSelect>
      </ProFormItemV2>
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
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@bole-core/components';
import { BoleRegExp } from '@bole-core/core';
import { useAllRoleList } from '@/hooks/useUser';
import { useSysOrgWithDepartmentCascader } from '@/hooks';

defineOptions({
  name: 'AddOrEditAccountDialog',
});

type Props = {
  modelValue: boolean;
  form: {
    name: string;
    title?: string;
    id: string;
    userName: string;
    phoneNumber: string;
    remark: string;
    roleNames: string[];
    companyOrgId: string;
    departmentOrgId: string;
  };
};
const { allRoleList } = useAllRoleList();

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const { sysOrgList, allDepartmentList, changeCompany } = useSysOrgWithDepartmentCascader({
  companyOrgId: toRef(props.form, 'companyOrgId'),
  departmentOrgId: toRef(props.form, 'departmentOrgId'),
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
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  phoneNumber: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur',
    },
    {
      message: '请输入正确的手机号',
      trigger: 'blur',
      pattern: BoleRegExp.RegTelNumber,
    },
  ],
  roleNames: [{ required: true, message: '请选择角色', trigger: 'change' }],
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
