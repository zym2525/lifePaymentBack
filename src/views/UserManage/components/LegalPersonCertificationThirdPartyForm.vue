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
    <slot></slot>
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
  name: 'LegalPersonCertificationThirdPartyForm',
});

const form = defineModel<DetailForm>('form');
</script>
