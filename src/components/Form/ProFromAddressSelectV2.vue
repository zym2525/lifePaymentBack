<template>
  <ProFieldCustom>
    <div class="address-select">
      <el-cascader
        v-bind="areaByCascaderProps"
        v-model="innerAreaList"
        :placeholder="areaListPlaceholder"
        clearable
        :value-on-clear="() => []"
        :disabled="disabled"
      ></el-cascader>
    </div>
    <template #readContent> {{ addressName }} </template>
  </ProFieldCustom>
</template>

<script setup lang="ts">
import { ProFieldCustom } from '@bole-core/components';
import { useVModels, useAreaByCascader, useAllAreaList } from '@/hooks';
import { AreaType } from '@/constants';

defineOptions({
  name: 'ProFromAddressSelectV2',
});

type Props = {
  areaList: number[];
  areaListPlaceholder?: string;
  disabled?: boolean;
  layer?: AreaType;
};

const props = withDefaults(defineProps<Props>(), {
  areaListPlaceholder: '请选择企业所在地',
  layer: AreaType.Area,
});

const emit = defineEmits<{
  (e: 'update:areaList', val: number[]): void;
}>();

const { areaList: innerAreaList } = useVModels(props, emit);

const { findAreaNameFromCode } = useAllAreaList();

const areaByCascaderProps = useAreaByCascader({ layer: props.layer });

const addressName = computed(() => {
  return `${props.areaList.map((x) => findAreaNameFromCode(x)).join('-')}`;
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.address-select {
  display: flex;
  align-items: center;
  width: 100%;

  :deep() {
    .el-cascader {
      flex: 2;
    }

    .address-input {
      flex: 1;
      margin-left: 10px;
    }
  }
}
</style>
