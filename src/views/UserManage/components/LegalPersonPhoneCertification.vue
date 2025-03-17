<template>
  <LegalPersonCertificationThirdPartyForm v-model:form="form">
    <ProFormItemV2 label="法人身份证照片:">
      <div class="id-imgUrl-wrapper">
        <ProFormItemV2 prop="legalPersonIdImgUrl" class="pro-form-item-label-hidden">
          <ProFormImageUpload
            v-model:file-url="form.legalPersonIdImgUrl"
            :limitFileSize="10"
            btnText="身份证人像面"
            :showTip="false"
          >
          </ProFormImageUpload>
        </ProFormItemV2>
        <ProFormItemV2 prop="legalPersonIdBackImgUrl" class="pro-form-item-label-hidden">
          <ProFormImageUpload
            v-model:file-url="form.legalPersonIdBackImgUrl"
            :limitFileSize="10"
            btnText="身份证国徽面"
            :showTip="false"
          >
          </ProFormImageUpload>
        </ProFormItemV2>
      </div>
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
  name: 'LegalPersonPhoneCertification',
});

const form = defineModel<DetailForm>('form');
</script>
