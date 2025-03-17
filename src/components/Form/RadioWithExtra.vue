<template>
  <div class="radio-with-input-wrapper">
    <ProFormRadio
      v-model="innerModelValue"
      @change="emit('handleChange')"
      :validate-event="false"
      v-bind="$attrs"
    ></ProFormRadio>
    <div class="radio-with-input-extra-wrapper" v-if="showExtra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProFormRadio } from '@bole-core/components';

defineOptions({
  name: 'RadioWithExtra',
});

type Props = {
  modelValue: string | number;
  showExtra: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showExtra: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void;
  (e: 'handleChange'): void;
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

.radio-with-input-wrapper {
  display: inline-flex;
  align-items: center;
  width: 100%;

  .radio-with-input-extra-wrapper {
    margin-left: 10px;
    flex: 1;
    min-width: 0;
    @include utils-ellipsis;
  }

  :deep(.pro-from-item-read-content-wrapper) {
    width: auto;
  }
}
</style>
