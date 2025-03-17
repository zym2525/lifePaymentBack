<template>
  <ProxyPersonCertificationThirdPartyForm v-model:form="form">
    <ProFormCol>
      <ProFormColItem :span="12">
        <ProFormItemV2 label="刷脸认证结果:" prop="status">
          <ProFormRadio
            :value-enum="UserCertificationStatusTextV2"
            v-model="form.status"
          ></ProFormRadio>
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
import { UserCertificationStatusTextV2 } from '@/constants';

defineOptions({
  name: 'ProxyPersonFaceCertification',
});

const form = defineModel<DetailForm>('form');
</script>
