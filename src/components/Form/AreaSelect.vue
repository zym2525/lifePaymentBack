<template>
  <div class="area-select-wrapper">
    <el-select
      v-model="innerProvinceId"
      placeholder="请选择省份"
      filterable
      clearable
      :disabled="disabled"
    >
      <el-option
        v-for="(item, index) in provinceList"
        :key="index"
        :label="item.areaName"
        :value="item.areaCode"
      />
    </el-select>
    <el-select
      v-model="innerCityId"
      placeholder="请选择市"
      filterable
      clearable
      :disabled="disabled"
    >
      <el-option
        v-for="(item, index) in cityList"
        :key="index"
        :label="item.areaName"
        :value="item.areaCode"
      />
    </el-select>
    <el-select
      v-model="innerCountyId"
      placeholder="请选择区县"
      filterable
      clearable
      :disabled="disabled"
    >
      <el-option
        v-for="(item, index) in countyList"
        :key="index"
        :label="item.areaName"
        :value="item.areaCode"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { useVModels, useAreaSelect } from '@/hooks';

defineOptions({
  name: 'AreaSelect',
});

type Props = {
  provinceId?: number | string;
  cityId?: number | string;
  countyId?: number | string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:provinceId', id: number): void;
  (e: 'update:cityId', id: number): void;
  (e: 'update:countyId', id: number): void;
}>();

const {
  provinceId: innerProvinceId,
  cityId: innerCityId,
  countyId: innerCountyId,
} = useVModels(props, emit);

const { provinceList, cityList, countyList } = useAreaSelect(
  innerProvinceId as Ref<number>,
  innerCityId as Ref<number>,
  innerCountyId as Ref<number>
);
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.area-select-wrapper {
  display: inline-flex;
  align-items: center;

  :deep() {
    .el-select {
      width: 140px;

      & + .el-select {
        margin-left: 10px;
      }
    }
  }
}
</style>
