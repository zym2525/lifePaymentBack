<template>
  <ProDialog
    title="功能配置"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
    :width="500"
  >
    <ProForm :rules="rules" :model="innerForm" ref="dialogForm" label-width="90px">
      <ProFormItemV2 prop="funcConfigType" class="pro-form-item-label-hidden">
        <ProFormCheckbox
          :value-enum="CanLoginUserSignEnumText"
          v-model="innerForm.funcConfigType"
          :optionsProps="
            (item) => ({
              disabled: item.value === CanLoginUserSignEnum.CanLogin818,
            })
          "
        ></ProFormCheckbox>
      </ProFormItemV2>
      <!-- <ProFormItemV2
        prop="bussinessCode"
        label="业务编码:"
        :check-rules="[{ message: '请输入业务编码' }]"
      >
        <ProFormText
          placeholder="请输入业务编码"
          v-model.trim="innerForm.bussinessCode"
          :maxlength="5"
          :formatter="filterNumbersFromString"
        ></ProFormText>
      </ProFormItemV2> -->
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
  ProFormCheckbox,
  ProFormItemV2,
  ProFormText,
} from '@bole-core/components';
import { CanLoginUserSignEnumText, CanLoginUserSignEnum } from '@/constants';
import { filterNumbersFromString } from '@/utils';

defineOptions({
  name: 'FuncConfigDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    id: string;
    bussinessCode: string;
    funcConfigType: any[];
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
