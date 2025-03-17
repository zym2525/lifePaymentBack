<template>
  <ProxyPersonCertificationThirdPartyForm v-model:form="form">
    <ProFormItemV2 label="经办人银行卡照片:" prop="proxyPersonBankCardImgUrl">
      <ProFormImageUpload v-model:file-url="form.proxyPersonBankCardImgUrl" :limitFileSize="10">
      </ProFormImageUpload>
    </ProFormItemV2>
    <ProFormItemV2 label="经办人银行卡:" prop="bankCardNumber">
      <ProFormText v-model.trim="form.bankCardNumber"></ProFormText>
    </ProFormItemV2>
    <ProFormCol>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="经办人手机号:" prop="contactPhone">
          <ProFormText v-model.trim="form.contactPhone"></ProFormText>
        </ProFormItemV2>
      </ProFormColItem>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="企业授权书:" prop="proxyPowerAttorneyUrl">
          <ProFormUpload v-model:file-url="form.proxyPowerAttorneyUrl" :limitFileSize="10">
          </ProFormUpload>
        </ProFormItemV2>
      </ProFormColItem>
    </ProFormCol>
  </ProxyPersonCertificationThirdPartyForm>
</template>

<script setup lang="ts">
import ProxyPersonCertificationThirdPartyForm from './ProxyPersonCertificationThirdPartyForm.vue';
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
  name: 'ProxyPersonBankCardCertificationForm',
});

const form = defineModel<DetailForm>('form');
</script>
