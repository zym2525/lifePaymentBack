<template>
  <CertificationElementForm v-model:form="form">
    <ProFormCol>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="代理人姓名:" prop="proxyPersonName">
          <ProFormText v-model.trim="form.proxyPersonName"></ProFormText>
        </ProFormItemV2>
      </ProFormColItem>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="代理人身份证号:" prop="proxyPersonIdNumber">
          <ProFormText v-model.trim="form.proxyPersonIdNumber"></ProFormText>
        </ProFormItemV2>
      </ProFormColItem>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="代理人手持身份证照片:" prop="proxyPersonIdImgUrl">
          <ProFormImageUpload v-model:file-url="form.proxyPersonIdImgUrl" :limitFileSize="10">
          </ProFormImageUpload>
        </ProFormItemV2>
      </ProFormColItem>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="企业授权书:" prop="proxyPowerAttorneyUrl">
          <ProFormUpload v-model:file-url="form.proxyPowerAttorneyUrl" :limitFileSize="10">
          </ProFormUpload>
        </ProFormItemV2>
      </ProFormColItem>
    </ProFormCol>
    <ProFormCol>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="联系人姓名:" prop="contact">
          <ProFormText v-model.trim="form.contact"></ProFormText>
        </ProFormItemV2>
      </ProFormColItem>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="联系人电话:" prop="contactPhone">
          <ProFormText v-model.trim="form.contactPhone"></ProFormText>
        </ProFormItemV2>
      </ProFormColItem>
    </ProFormCol>
  </CertificationElementForm>
</template>

<script setup lang="ts">
import CertificationElementForm from './CertificationElementForm.vue';
import { DetailForm } from './certificationDetail';
import {
  ProFormItemV2,
  ProFormText,
  ProFormSelect,
  ProFormUpload,
  ProFormImageUpload,
  ProFormDatePicker,
  ProFormCol,
  ProFormColItem,
  ProFormRadio,
} from '@bole-core/components';

defineOptions({
  name: 'ProxyPersonCertificationForm',
});

const form = defineModel<DetailForm>('form');
</script>
