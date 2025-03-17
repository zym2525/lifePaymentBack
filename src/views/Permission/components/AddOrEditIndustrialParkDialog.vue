<template>
  <ProDialog
    :title="innerForm.title"
    v-model="innerVisible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :model="innerForm" ref="dialogForm" label-width="120px">
      <ProFormItemV2
        label="产业园名称:"
        prop="parkName"
        :check-rules="[{ message: '请输入产业园名称' }]"
      >
        <ProFormText
          placeholder="请输入产业园名称"
          v-model.trim="innerForm.parkName"
          :maxlength="30"
        ></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2
        label="负责人名称:"
        prop="leaderName"
        :check-rules="[{ message: '请输入负责人名称' }]"
      >
        <ProFormText
          placeholder="请输入负责人名称"
          v-model.trim="innerForm.leaderName"
          :maxlength="30"
        ></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2
        label="负责人电话:"
        prop="leaderMobile"
        :check-rules="[{ message: '请输入负责人电话', type: 'phone' }]"
      >
        <ProFormText
          placeholder="请输入负责人电话"
          v-model.trim="innerForm.leaderMobile"
        ></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2
        label="园区类型:"
        prop="leaderName"
        :check-rules="[{ message: '请选择园区类型' }]"
      >
        <ProFormSelect
          v-model="form.parkTypeId"
          :value-enum="parkTypeList"
          enumLabelKey="name"
          enum-value-key="id"
          clearable
          placeholder="请选择园区类型"
        >
        </ProFormSelect>
      </ProFormItemV2>
      <ProFormItemV2
        label="注册地址:"
        prop="registerAddress"
        :check-rules="[{ message: '请输入注册地址' }]"
      >
        <ProFormText
          placeholder="请输入注册地址"
          v-model.trim="innerForm.registerAddress"
          :maxlength="30"
        ></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2 label="备注:" prop="remark">
        <ProFormTextArea
          v-model="innerForm.remark"
          placeholder="请输入备注"
          :maxlength="200"
        ></ProFormTextArea>
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
import { FormInstance } from 'element-plus';
import {
  ProDialog,
  ProForm,
  ProFormItemV2,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@bole-core/components';
import { useSearchSettingType } from '@/hooks';
import { SearchType } from '@/constants';

defineOptions({
  name: 'AddOrEditIndustrialParkDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    title: string;
    parkName: string;
    leaderName: string;
    leaderMobile: string;
    parkTypeId: string;
    registerAddress: string;
    remark: string;
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

const { searchSettingTypeList: parkTypeList } = useSearchSettingType({
  searchType: SearchType.Park,
});

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
