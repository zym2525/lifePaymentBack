<template>
  <ProFieldCustom>
    <div class="address-select">
      <el-cascader
        v-bind="areaByCascaderProps"
        v-model="innerAreaList"
        :placeholder="areaListPlaceholder"
        clearable
        :value-on-clear="() => []"
      ></el-cascader>
      <FieldText
        class="address-input"
        v-model.trim="innerAddress"
        :maxlength="20"
        show-word-limit
        :placeholder="addressPlaceholder"
      >
      </FieldText>
    </div>
    <template #readContent> {{ addressName }} </template>
  </ProFieldCustom>
</template>

<script setup lang="ts">
import { ProFieldCustom, FieldText } from '@bole-core/components';
import { useVModels, useAreaByCascader, useAllAreaList } from '@/hooks';
import { useAreaStore } from '@/store/modules/area';

defineOptions({
  name: 'ProFromAddressSelect',
});

type Props = {
  areaList: number[];
  address?: string;
  areaListPlaceholder?: string;
  addressPlaceholder?: string;
};

const props = withDefaults(defineProps<Props>(), {
  address: '',
  areaListPlaceholder: '请选择企业所在地',
  addressPlaceholder: '请输入详细地址',
});

const emit = defineEmits<{
  (e: 'update:areaList', val: number[]): void;
  (e: 'update:address', val: string): void;
}>();

const { areaList: innerAreaList, address: innerAddress } = useVModels(props, emit);

const areaStore = useAreaStore();

const { completeAreaList } = storeToRefs(areaStore);
const { findAreaNameFromCode } = useAllAreaList();

const areaByCascaderProps = useAreaByCascader();

const addressName = computed(() => {
  return `${props.areaList.map((x) => findAreaNameFromCode(x)).join('-')} ${props.address}`;
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
