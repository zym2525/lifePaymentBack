<template>
  <ProDialog
    :title="innerForm.title"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :model="innerForm" ref="dialogForm" label-width="100px" is-read>
      <ProFormCol>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="名称:" prop="contacter">
            <ProFormText v-model.trim="innerForm.contacter" />
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="身份证号:" prop="idNumber" mode="read">
            <ProFormText v-model.trim="innerForm.idNumber" />
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
      <ProFormCol>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="身份证:" prop="frontIdUrl">
            <ProFormImageUpload
              v-model:file-url="innerForm.frontIdUrl"
              :limitFileCount="1"
            ></ProFormImageUpload>
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="手机号:" prop="contacterPhone">
            <ProFormText v-model.trim="innerForm.contacterPhone"></ProFormText>
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
      <ProFormCol>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="注册日期:" prop="registDate">
            <ProFormDatePicker v-model.trim="innerForm.registDate" />
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="认证日期:" prop="attestateDate" mode="read">
            <ProFormDatePicker v-model.trim="innerForm.attestateDate" />
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
      <ProFormCol>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="发布产品数:" prop="productCount">
            <ProFormInputNumber
              :controls="false"
              v-model="innerForm.productCount"
            ></ProFormInputNumber>
          </ProFormItemV2>
        </ProFormColItem>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="发布资讯数:" prop="informationCount">
            <ProFormInputNumber
              :controls="false"
              v-model="innerForm.informationCount"
            ></ProFormInputNumber>
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
      <ProFormCol>
        <ProFormColItem :span="24">
          <ProFormItemV2 label="服务商星级:" prop="serveStarLevel" mode="read">
            <el-rate v-model="innerForm.serveStarLevel" disabled :colors="StarLevelColor" />
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
import { FormInstance } from 'element-plus';
import {
  ProDialog,
  ProForm,
  ProFormCol,
  ProFormColItem,
  ProFormItemV2,
  ProFormText,
  ProFormImageUpload,
  UploadUserFile,
  ProFormDatePicker,
  ProFormInputNumber,
} from '@bole-core/components';
import { StarLevelColor } from '@/constants';

defineOptions({
  name: 'IndividualUserDetailDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    frontIdUrl: UploadUserFile[];
    idNumber: string;
    contacter: string;
    contacterPhone: string;
    registDate: string;
    attestateDate: string;
    serveStarLevel: number;
    productCount: number;
    informationCount: number;
    title?: string;
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
