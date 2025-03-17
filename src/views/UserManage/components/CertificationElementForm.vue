<template>
  <ProFormItemV2 label="认证通道:" prop="certificationChannel">
    <ProFormSelect
      :value-enum="UserCertificationChannelEnumText"
      v-model="form.certificationChannel"
    ></ProFormSelect>
  </ProFormItemV2>
  <ProFormItemV2 label="认证方式:" prop="certificationMode">
    <ProFormSelect
      :value-enum="UserCertificationModeEnumV2Text"
      v-model="form.certificationMode"
    ></ProFormSelect>
  </ProFormItemV2>
  <ProFormItemV2 label="企业类型:" prop="enterpriseType">
    <ProFormSelect :value-enum="EnterpriseTypeText" v-model="form.enterpriseType"></ProFormSelect>
  </ProFormItemV2>
  <ProFormItemV2 label="认证企业名称:" prop="enterpriseName">
    <ProFormText v-model.trim="form.enterpriseName"></ProFormText>
  </ProFormItemV2>
  <ProFormItemV2 label="营业执照:" prop="licenseUrl">
    <ProFormUpload v-model:file-url="form.licenseUrl"></ProFormUpload>
  </ProFormItemV2>
  <ProFormItemV2 label="信用代码:" prop="societyCreditCode">
    <ProFormText v-model.trim="form.societyCreditCode"></ProFormText>
  </ProFormItemV2>
  <slot></slot>
  <ProFormCol>
    <ProFormColItem :span="12">
      <ProFormItemV2 label="注册日期:" prop="registTime">
        <ProFormDatePicker
          v-model="form.registTime"
          type="date"
          format="YYYY-MM-DD"
        ></ProFormDatePicker>
      </ProFormItemV2>
    </ProFormColItem>
    <ProFormColItem :span="12">
      <ProFormItemV2 label="认证日期:" prop="certificationTime">
        <ProFormDatePicker
          v-model="form.certificationTime"
          type="date"
          format="YYYY-MM-DD"
        ></ProFormDatePicker>
      </ProFormItemV2>
    </ProFormColItem>
    <ProFormColItem :span="12">
      <ProFormItemV2 label="认证状态:" prop="status">
        <ProFormRadio
          :value-enum="UserCertificationStatusTextV2"
          v-model="form.status"
        ></ProFormRadio>
      </ProFormItemV2>
    </ProFormColItem>
  </ProFormCol>
</template>

<script setup lang="ts">
import { DetailForm } from './certificationDetail';
import {
  ProFormItemV2,
  ProFormText,
  ProFormSelect,
  ProFormUpload,
  ProFormImageUpload,
  ProFormDatePicker,
  UploadUserFile,
  ProFormCol,
  ProFormColItem,
  ProFormRadio,
} from '@bole-core/components';
import {
  UserCertificationModeEnumV2,
  UserCertificationChannelEnum,
  UserCertificationChannelEnumText,
  UserCertificationElementEnum,
  EnterpriseType,
  UserCertificationStatus,
  UserCertificationModeEnumV2Text,
  EnterpriseTypeText,
  UserCertificationStatusTextV2,
} from '@/constants';

defineOptions({
  name: 'CertificationElementForm',
});

// type Props = {
//   form?: DetailForm;
// };

// const props = withDefaults(defineProps<Props>(), {});
const form = defineModel<DetailForm>('form');
</script>
