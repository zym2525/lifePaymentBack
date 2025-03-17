<template>
  <ProDialog
    title="上传退款凭证"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :rules="rules" :model="innerForm" ref="dialogForm" label-width="120px">
      <ProFormItemV2 label="" prop="refundApplyRemark" class="pro-form-item-label-hidden">
        <ProFormTextArea
          v-model="innerForm.refundApplyRemark"
          maxlength="200"
          show-word-limit
          placeholder="用户填写的退款原因"
          disabled
        />
      </ProFormItemV2>
      <ProFormItemV2 label="退款审核：" prop="status" required>
        <ProFormRadio v-model="innerForm.status" :value-enum="LifePayRefundAuditStatusText" />
      </ProFormItemV2>
      <ProFormItemV2
        v-if="innerForm.status === LifePayRefundAuditStatus.Pass"
        label="上传凭证："
        prop="refundCredentialsImgUrl"
        :check-rules="[{ message: '请上传凭证', type: 'upload' }]"
      >
        <ProFormUpload
          v-model:file-url="innerForm.refundCredentialsImgUrl"
          :limit="1"
          :limitFileSize="10"
          accept="jpg/jpeg,png"
        ></ProFormUpload>
      </ProFormItemV2>
      <ProFormItemV2
        v-else
        label="驳回原因："
        prop="remark"
        :checkRules="[{ message: '请选择驳回原因' }]"
      >
        <ProFormSelect
          placeholder="请选择驳回原因"
          :value-enum="RemarkMap"
          clearable
          v-model="innerForm.remark"
        ></ProFormSelect>
      </ProFormItemV2>
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
import {
  ProDialog,
  ProForm,
  ProFormItemV2,
  UploadUserFile,
  ProFormUpload,
  ProFormTextArea,
  ProFormRadio,
  ProFormSelect,
} from '@bole-core/components';
import { LifePayRefundAuditStatus, LifePayRefundAuditStatusText } from '@/constants';

defineOptions({
  name: 'UploadRefundVoucher',
});

type Props = {
  modelValue: boolean;
  form: {
    id: string;
    refundCredentialsImgUrl: UploadUserFile[];
    remark: string;
    refundApplyRemark: string;
    status: LifePayRefundAuditStatus;
  };
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

const RemarkMap = {
  '该手机号已充值成功，退款审核失败': '该手机号已充值成功，退款审核失败',
  '该户号已充值成功，退款审核失败': '该户号已充值成功，退款审核失败',
};

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

const rules = reactive<FormRules>({
  refundCredentialsImgUrl: [{ required: true, message: '请上传凭证', trigger: 'blur/change' }],
});

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
