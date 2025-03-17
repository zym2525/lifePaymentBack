<template>
  <LegalPersonCertificationThirdPartyForm v-model:form="form">
    <ProFormItemV2 label="法人银行卡照片:" prop="legalPersonBankCardImgUrl">
      <ProFormImageUpload v-model:file-url="form.legalPersonBankCardImgUrl" :limitFileSize="10">
      </ProFormImageUpload>
    </ProFormItemV2>
    <ProFormItemV2 label="银行卡号:" prop="bankCardNumber">
      <ProFormText v-model.trim="form.bankCardNumber"></ProFormText>
    </ProFormItemV2>
    <ProFormItemV2 label="法人手机号:" prop="contactPhone">
      <ProFormText v-model.trim="form.contactPhone"></ProFormText>
    </ProFormItemV2>
  </LegalPersonCertificationThirdPartyForm>
</template>

<script setup lang="ts">
import LegalPersonCertificationThirdPartyForm from './LegalPersonCertificationThirdPartyForm.vue';
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
  name: 'LegalPersonBankCardCertificationForm',
});

const form = defineModel<DetailForm>('form');
</script>
