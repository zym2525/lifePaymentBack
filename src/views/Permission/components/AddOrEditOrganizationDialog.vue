<template>
  <ProDialog
    :title="title"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
    :width="600"
  >
    <ProForm :model="innerForm" ref="dialogForm" label-width="90px" :is-read="form.isCheck">
      <template v-if="form.sysOrgType === SysOrgTypeEnum.Company">
        <ProFormItemV2 label="类型:" prop="sysOrgType">
          <ProFormRadio
            v-model="innerForm.sysOrgType"
            :value-enum="[
              { value: SysOrgTypeEnum.Company, label: SysOrgTypeEnumText[SysOrgTypeEnum.Company] },
            ]"
            :buttonStyle="false"
          />
        </ProFormItemV2>
        <ProFormItemV2 label="上级组织:" prop="parentId">
          <ProFormSelect
            v-model="form.parentId"
            :valueEnum="sysOrgList"
            enumLabelKey="orgName"
            enum-value-key="id"
            clearable
            filterable
          >
          </ProFormSelect>
        </ProFormItemV2>
        <ProFormItemV2
          label="公司名称:"
          prop="orgName"
          :check-rules="[{ message: '请输入公司名称' }]"
        >
          <ProFormText
            placeholder="请输入公司名称"
            v-model.trim="innerForm.orgName"
            :maxlength="30"
          ></ProFormText>
        </ProFormItemV2>
        <ProFormItemV2 label="公司地址:" prop="orgAddress">
          <ProFormText
            placeholder="请输入公司地址"
            v-model.trim="innerForm.orgAddress"
            :maxlength="30"
          ></ProFormText>
        </ProFormItemV2>
        <ProFormItemV2 label="开户行:" prop="openBank">
          <ProFormText
            placeholder="请输入开户行"
            v-model.trim="innerForm.openBank"
            :maxlength="30"
          ></ProFormText>
        </ProFormItemV2>
        <ProFormItemV2
          label="银行账号:"
          prop="bankCardNo"
          :check-rules="[{ message: '请输入银行账号', type: 'bankCard', required: false }]"
        >
          <ProFormText
            placeholder="请输入银行账号"
            v-model.trim="innerForm.bankCardNo"
          ></ProFormText>
        </ProFormItemV2>
      </template>
      <template v-else-if="form.sysOrgType === SysOrgTypeEnum.Department">
        <ProFormItemV2 label="类型:" prop="sysOrgType">
          <ProFormRadio
            v-model="innerForm.sysOrgType"
            :value-enum="[
              {
                value: SysOrgTypeEnum.Department,
                label: SysOrgTypeEnumText[SysOrgTypeEnum.Department],
              },
            ]"
            :buttonStyle="false"
          />
        </ProFormItemV2>
        <ProFormItemV2 label="上级组织:" prop="parentId">
          <ProFormSelect
            v-model="form.parentId"
            :valueEnum="sysOrgList"
            enumLabelKey="orgName"
            enum-value-key="id"
            clearable
            filterable
          >
          </ProFormSelect>
        </ProFormItemV2>
        <ProFormItemV2
          label="部门名称:"
          prop="orgName"
          :check-rules="[{ message: '请输入部门名称' }]"
        >
          <ProFormText
            placeholder="请输入部门名称"
            v-model.trim="innerForm.orgName"
            :maxlength="30"
          ></ProFormText>
        </ProFormItemV2>
      </template>
    </ProForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" v-if="form.isCheck" @click="emit('onCancel')">确 认</el-button>
        <template v-else>
          <el-button @click="emit('onCancel')">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">保 存</el-button>
        </template>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus';
import {
  ProDialog,
  ProForm,
  ProFormItemV2,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@bole-core/components';
import { SysOrgTypeEnum, SysOrgTypeEnumText } from '@/constants';
import { useSysOrgDropDownList } from '@/hooks';

defineOptions({
  name: 'AddOrEditOrganizationDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    title?: string;
    id?: string;
    orgName?: string;
    orgAddress?: string;
    openBank?: string;
    bankCardNo?: string;
    parentId?: string;
    sysOrgType: SysOrgTypeEnum;
    isCheck?: boolean;
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

const { sysOrgList } = useSysOrgDropDownList({
  params: computed(() => ({
    isCliqueOrCompany: props.form?.sysOrgType == SysOrgTypeEnum.Department ? null : true,
  })),
});

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

const isEdit = computed(() => !!props?.form?.id);
const title = computed(() => {
  const opName = isEdit.value ? (props?.form?.isCheck ? '查看' : '编辑') : '新建';
  let orgName = SysOrgTypeEnumText[props?.form?.sysOrgType];

  return `${opName}${orgName}`;
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
