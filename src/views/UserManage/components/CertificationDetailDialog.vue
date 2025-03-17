<template>
  <ProDialog
    title="认证详情"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
    :width="800"
  >
    <ProForm :rules="rules" :model="innerForm" ref="dialogForm" label-width="180px" is-read>
      <ProxyPersonCertificationForm
        v-if="innerForm.certificationMode === UserCertificationModeEnumV2.ProxyPersonCertification"
        v-model:form="innerForm"
      />
      <LegalPersonPhoneCertification
        v-else-if="
          innerForm.certificationMode === UserCertificationModeEnumV2.LegalPersonPhoneCertification
        "
        v-model:form="innerForm"
      />
      <LegalPersonBankCardCertificationForm
        v-else-if="
          innerForm.certificationMode ===
          UserCertificationModeEnumV2.LegalPersonBankCardCertification
        "
        v-model:form="innerForm"
      />
      <LegalPersonFaceCertificationForm
        v-else-if="
          innerForm.certificationMode === UserCertificationModeEnumV2.LegalPersonFaceCertification
        "
        v-model:form="innerForm"
      />
      <ProxyPersonPhoneCertification
        v-else-if="
          innerForm.certificationMode === UserCertificationModeEnumV2.ProxyPersonPhoneCertification
        "
        v-model:form="innerForm"
      />
      <ProxyPersonBankCardCertificationForm
        v-else-if="
          innerForm.certificationMode ===
          UserCertificationModeEnumV2.ProxyPersonBankCardCertification
        "
        v-model:form="innerForm"
      />
      <ProxyPersonFaceCertification
        v-else-if="
          innerForm.certificationMode === UserCertificationModeEnumV2.ProxyPersonFaceCertification
        "
        v-model:form="innerForm"
      />
      <LegalPersonCertificationForm v-else v-model:form="innerForm" />
    </ProForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('onCancel')">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import { FormRules, FormInstance } from 'element-plus';
import { ProDialog, ProForm } from '@bole-core/components';
import {
  UserCertificationModeEnumV2,
  UserCertificationChannelEnum,
  UserCertificationChannelEnumText,
  UserCertificationElementEnum,
  EnterpriseType,
  UserCertificationStatus,
} from '@/constants';
import { DetailForm } from './certificationDetail';
import LegalPersonCertificationForm from './LegalPersonCertificationForm.vue';
import ProxyPersonCertificationForm from './ProxyPersonCertificationForm.vue';
import LegalPersonPhoneCertification from './LegalPersonPhoneCertification.vue';
import LegalPersonBankCardCertificationForm from './LegalPersonBankCardCertificationForm.vue';
import LegalPersonFaceCertificationForm from './LegalPersonFaceCertificationForm.vue';
import ProxyPersonPhoneCertification from './ProxyPersonPhoneCertification.vue';
import ProxyPersonBankCardCertificationForm from './ProxyPersonBankCardCertificationForm.vue';
import ProxyPersonFaceCertification from './ProxyPersonFaceCertification.vue';

defineOptions({
  name: 'CertificationDetailDialog',
});

type Props = {
  modelValue: boolean;
  form?: DetailForm;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:form', value: Props['form']): void;
  (e: 'onConfirm'): void;
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

const rules = reactive<FormRules>({});

function onDialogClose() {
  if (!dialogForm.value) return;
  dialogForm.value.resetFields();
}

function handleConfirm() {
  if (!dialogForm.value) return;
  dialogForm.value.validate((valid) => {
    if (valid) {
      emit('onConfirm');
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;
</style>
