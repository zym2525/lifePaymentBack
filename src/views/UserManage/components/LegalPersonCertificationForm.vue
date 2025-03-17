<template>
  <CertificationElementForm v-model:form="form">
    <ProFormCol>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="法人姓名:" prop="legalPersonName">
          <ProFormText v-model.trim="form.legalPersonName"></ProFormText>
        </ProFormItemV2>
      </ProFormColItem>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="法人身份证号:" prop="legalPersonIdNumber">
          <ProFormText v-model.trim="form.legalPersonIdNumber"></ProFormText>
        </ProFormItemV2>
      </ProFormColItem>
    </ProFormCol>
    <ProFormItemV2 label="法人手持身份证照片:" prop="legalPersonIdImgUrl">
      <ProFormImageUpload v-model:file-url="form.legalPersonIdImgUrl" :limitFileSize="10">
      </ProFormImageUpload>
    </ProFormItemV2>
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
  name: 'LegalPersonCertificationForm',
});

const form = defineModel<DetailForm>('form');
</script>
