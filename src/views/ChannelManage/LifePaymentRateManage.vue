<template>
  <LoadingLayout :loading="isLoading">
    <AppContainer>
      <PageFormLayout>
        <ProForm :model="form" ref="formRef" label-width="150px">
          <ProFormItemV2 label="供应商折扣：" prop="supplierRate" required>
            <ProFormInputNumber
              v-model="form.supplierRate"
              :controls="false"
              :min="0"
              :max="100"
              unit="%"
              disabled
            ></ProFormInputNumber>
          </ProFormItemV2>
          <ProFormItemV2 label="平台话费折扣：" prop="platformPhoneRate" required>
            <ProFormInputNumber
              v-model="form.platformPhoneRate"
              :controls="false"
              :min="form.supplierRate"
              :max="100"
              unit="%"
              @change="handleChangeRate"
            ></ProFormInputNumber>
          </ProFormItemV2>
          <ProFormItemV2 label="平台电费折扣：" prop="platformElectricRate" required>
            <ProFormInputNumber
              v-model="form.platformElectricRate"
              :controls="false"
              :min="form.supplierRate"
              :max="100"
              unit="%"
              @change="handleChangeRate"
            ></ProFormInputNumber>
          </ProFormItemV2>
          <ProFormItemV2 label="平台燃气费折扣：" prop="platformGasRate" required>
            <ProFormInputNumber
              v-model="form.platformGasRate"
              :controls="false"
              :min="form.supplierRate"
              :max="100"
              unit="%"
              @change="handleChangeRate"
            ></ProFormInputNumber>
          </ProFormItemV2>
        </ProForm>
      </PageFormLayout>
    </AppContainer>
  </LoadingLayout>
</template>

<script setup lang="ts">
import {
  LoadingLayout,
  AppContainer,
  PageFormLayout,
  ProForm,
  ProFormItemV2,
  ProFormInputNumber,
} from '@bole-core/components';
import { LifePayRateTypeEnum } from '@/constants';
import * as lifePayServices from '@/services/api/LifePay';
import { useLifePayRate, DefaultSupplierRate } from '@/hooks';

defineOptions({
  name: 'LifePaymentRateManage',
});

const form = reactive({
  supplierRate: DefaultSupplierRate,
  platformPhoneRate: 0,
  platformElectricRate: 0,
  platformGasRate: 0,
});

const { rateList, isLoading, refetch } = useLifePayRate({
  onSuccess: (data) => {
    data.forEach((item) => {
      if (item.rateType === LifePayRateTypeEnum.供应商折扣价) {
        form.supplierRate = item.rate || DefaultSupplierRate;
      } else if (item.rateType === LifePayRateTypeEnum.默认话费折扣) {
        form.platformPhoneRate = item.rate;
      } else if (item.rateType === LifePayRateTypeEnum.默认电费折扣) {
        form.platformElectricRate = item.rate;
      } else if (item.rateType === LifePayRateTypeEnum.默认燃气折扣) {
        form.platformGasRate = item.rate;
      }
    });
  },
});

async function handleChangeRate() {
  try {
    let params: API.LifePayRateInput[] = [
      createLifePayRate(LifePayRateTypeEnum.供应商折扣价),
      createLifePayRate(LifePayRateTypeEnum.默认话费折扣),
      createLifePayRate(LifePayRateTypeEnum.默认电费折扣),
      createLifePayRate(LifePayRateTypeEnum.默认燃气折扣),
    ];

    let res = await lifePayServices.createEditLifePayRate(params);
    await refetch();
  } catch (error) {}
}

const RateTypeToFormKeyMap = {
  [LifePayRateTypeEnum.供应商折扣价]: 'supplierRate',
  [LifePayRateTypeEnum.默认话费折扣]: 'platformPhoneRate',
  [LifePayRateTypeEnum.默认电费折扣]: 'platformElectricRate',
  [LifePayRateTypeEnum.默认燃气折扣]: 'platformGasRate',
} as const;

function createLifePayRate(rateType: LifePayRateTypeEnum) {
  const rateItem = rateList.value.find((item) => item.rateType === rateType);
  return {
    rateType: rateType,
    rate: form[RateTypeToFormKeyMap[rateType]],
    id: rateItem?.id,
  } as API.LifePayRateInput;
}
</script>
