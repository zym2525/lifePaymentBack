<template>
  <div class="input-number-with-extra">
    <ProFormInputNumber v-model="innerModelValue" v-bind="$attrs"></ProFormInputNumber>
    <div class="input-number-with-extra-wrapper" v-if="showExtra">{{ extra }}</div>
  </div>
</template>

<script setup lang="ts">
import { ProFormInputNumber } from '@bole-core/components';

defineOptions({
  name: 'NumberInputWithExtra',
});

type Props = {
  modelValue: number | null;
  showExtra: boolean;
  extra: string;
};

const props = withDefaults(defineProps<Props>(), {
  showExtra: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void;
}>();

const innerModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.input-number-with-extra {
  display: flex;
  margin-bottom: 18px;
  width: 100%;

  .input-number-with-extra-wrapper {
    margin-left: 10px;
  }
}
</style>
