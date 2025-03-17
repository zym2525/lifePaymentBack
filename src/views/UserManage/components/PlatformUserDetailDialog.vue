<template>
  <ProDialog
    :title="innerForm.title"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :model="innerForm" ref="dialogForm" label-width="110px">
      <ProFormCol :gutter="20">
        <ProFormColItem :span="12">
          <ProFormItemV2 label="企业名称:" prop="customerName" mode="read">
            <ProFormText v-model.trim="innerForm.customerName" />
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="信用代码:" prop="societyCreditCode" mode="read">
            <ProFormText v-model.trim="innerForm.societyCreditCode" />
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="执照/证书:" prop="licenseUrl" mode="read">
            <ProFormImageUpload
              v-model:file-url="innerForm.licenseUrl"
              :limitFileCount="1"
            ></ProFormImageUpload>
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="所属区域:" prop="address" mode="read">
            <ProFormText v-model.trim="innerForm.address" />
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="联系人:" prop="contacter" mode="read">
            <ProFormText v-model.trim="innerForm.contacter" />
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="手机号:" prop="phoneNumber" mode="read">
            <ProFormText v-model.trim="innerForm.phoneNumber" />
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="企业规模:" prop="firmSize" mode="read">
            <ProFormField>
              <template #readContent>
                {{ EnterpriseSizeText[innerForm.firmSize] }}
              </template>
            </ProFormField>
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="所在职位:" prop="jobPosition" mode="read">
            <ProFormRadio v-model="innerForm.jobPosition" :value-enum="PostTypeText" />
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="注册日期:" prop="registDate" mode="read">
            <ProFormDatePicker
              v-model="innerForm.registDate"
              type="date"
              format="YYYY-MM-DD"
            ></ProFormDatePicker>
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="认证日期:" prop="attestateDate" mode="read">
            <ProFormDatePicker
              v-model="innerForm.attestateDate"
              type="date"
              format="YYYY-MM-DD"
            ></ProFormDatePicker>
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
    </ProForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('onCancel')">关闭</el-button>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import { FormInstance, UploadUserFile } from 'element-plus';
import {
  ProDialog,
  ProForm,
  ProFormColItem,
  ProFormCol,
  ProFormItemV2,
  ProFormText,
  ProFormRadio,
  ProFormField,
  ProFormDatePicker,
  ProFormImageUpload,
} from '@bole-core/components';
import { EnterpriseSizeText, PostTypeText } from '@/constants';

defineOptions({
  name: 'PlatformUserDetailDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    title?: string;
    customerName: string;
    societyCreditCode: string;
    licenseUrl: UploadUserFile[];
    address: string;
    contacter: string;
    phoneNumber: string;
    firmSize: number;
    jobPosition: number;
    registDate: string;
    attestateDate: string;
  };
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:form', value: Props['form']): void;
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
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;
</style>
