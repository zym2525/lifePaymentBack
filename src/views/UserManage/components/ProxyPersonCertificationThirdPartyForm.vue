<template>
  <CertificationElementForm v-model:form="form">
    <ProFormItemV2 label="法人姓名:" prop="legalPersonName">
      <ProFormText v-model.trim="form.legalPersonName"></ProFormText>
    </ProFormItemV2>
    <ProFormItemV2 label="经办人身份证照片:">
      <div class="id-imgUrl-wrapper">
        <ProFormItemV2 prop="proxyPersonIdImgUrl" class="pro-form-item-label-hidden">
          <ProFormImageUpload
            v-model:file-url="form.proxyPersonIdImgUrl"
            :limitFileSize="10"
            btnText="身份证人像面"
            :showTip="false"
          >
          </ProFormImageUpload>
        </ProFormItemV2>
        <ProFormItemV2 prop="proxyPersonIdBackImgUrl" class="pro-form-item-label-hidden">
          <ProFormImageUpload
            v-model:file-url="form.proxyPersonIdBackImgUrl"
            :limitFileSize="10"
            btnText="身份证国徽面"
            :showTip="false"
          >
          </ProFormImageUpload>
        </ProFormItemV2>
      </div>
    </ProFormItemV2>
    <ProFormItemV2 label="经办人姓名:" prop="proxyPersonName">
      <ProFormText v-model.trim="form.proxyPersonName"></ProFormText>
    </ProFormItemV2>
    <ProFormItemV2 label="经办人身份证号:" prop="proxyPersonIdNumber">
      <ProFormText v-model.trim="form.proxyPersonIdNumber"></ProFormText>
    </ProFormItemV2>
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
  name: 'ProxyPersonCertificationThirdPartyForm',
});

const form = defineModel<DetailForm>('form');
</script>
