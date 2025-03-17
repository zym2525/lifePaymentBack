<template>
  <RadioWithExtra v-model="innerModelValue" :showExtra="showExtra">
    <template #extra>
      <FieldSelect
        v-model="innerListId"
        :placeholder="placeholder"
        :value-enum="list"
        :enum-label-key="listLable"
        :enum-value-key="listValue"
        clearable
        :multiple="multiple"
        :filterable="filterable"
      />
    </template>
  </RadioWithExtra>
</template>

<script setup lang="ts">
import { FieldSelect } from '@bole-core/components';
import RadioWithExtra from './RadioWithExtra.vue';

defineOptions({
  name: 'RadioWithSelect',
});

type Props = {
  modelValue: string | number;
  placeholder?: string;
  showExtra: boolean;
  list: Array<Object>;
  listId: string | number | (string | number)[];
  listLable?: string;
  listValue?: string;
  multiple?: boolean;
  filterable?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showExtra: false,
  listLable: 'name',
  listValue: 'id',
  multiple: false,
  filterable: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void;
  (e: 'update:listId', val: string | number | (string | number)[]): void;
}>();

const innerModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
const innerListId = computed({
  get() {
    return props.listId;
  },
  set(val) {
    emit('update:listId', val);
  },
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.radio-with-input {
  width: 300px;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
}
</style>
