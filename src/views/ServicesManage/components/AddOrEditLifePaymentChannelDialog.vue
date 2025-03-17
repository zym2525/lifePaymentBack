<template>
  <ProDialog
    :title="form.title"
    v-model="visible"
    @close="onDialogClose"
    destroy-on-close
    draggable
  >
    <ProForm :model="form" ref="dialogForm" label-width="120px">
      <ProFormItemV2
        label="渠道名称："
        prop="channlesName"
        :check-rules="[{ message: '请输入渠道名称' }]"
      >
        <ProFormText placeholder="请输入渠道名称" v-model.trim="form.channlesName"></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2 label="渠道类型：" prop="channlesType">
        <ProFormRadio v-model="form.channlesType" :value-enum="LifePayChannlesTypeEnumText" />
      </ProFormItemV2>
      <ProFormItemV2
        label="渠道ID："
        prop="channlesNum"
        :check-rules="[{ message: '请输入渠道ID' }]"
      >
        <ProFormText placeholder="请输入渠道ID" v-model.trim="form.channlesNum"></ProFormText>
      </ProFormItemV2>
      <ProFormItemV2
        label="渠道折扣："
        prop="channlesRate"
        :check-rules="[{ message: '请输入渠道折扣', type: 'number' }]"
      >
        <ProFormInputNumber
          v-model="form.channlesRate"
          :controls="false"
          :min="supplierRate"
          :max="100"
          unit="%"
        ></ProFormInputNumber>
      </ProFormItemV2>
      <ProFormItemV2
        label="接入类型："
        prop="switchType"
        :check-rules="[{ message: '请选择接入类型' }]"
      >
        <ProFormSelect
          placeholder="请选择接入类型"
          :value-enum="LifePaySwitchTypeEnumText"
          clearable
          v-model="form.switchType"
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
import { FormInstance } from 'element-plus';
import {
  ProDialog,
  ProForm,
  ProFormItemV2,
  ProFormText,
  ProFormInputNumber,
  ProFormRadio,
  ProFormSelect,
} from '@bole-core/components';
import {
  LifePaySwitchTypeEnum,
  LifePaySwitchTypeEnumText,
  LifePayChannlesTypeEnum,
  LifePayChannlesTypeEnumText,
} from '@/constants';
import { useLifePayRate } from '../hooks';

defineOptions({
  name: 'AddOrEditLifePaymentChannelDialog',
});

const visible = defineModel({ type: Boolean });

type Form = {
  title?: string;
  channlesName: string;
  channlesNum: string;
  channlesRate: number;
  switchType: LifePaySwitchTypeEnum;
  channlesType: LifePayChannlesTypeEnum;
  id: string;
};

const form = defineModel<Form>('form');

const emit = defineEmits<{
  (e: 'onConfirm'): void;
  (e: 'onCancel'): void;
}>();

const { supplierRate } = useLifePayRate();

const dialogForm = ref<FormInstance>();

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
