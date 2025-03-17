<template>
  <RadioWithExtra
    v-model="innerModelValue"
    @handle-change="emit('handleChange')"
    :showExtra="showExtra"
    :disabled="disabled"
  >
    <template #extra>
      <ProFieldCustom>
        <el-input
          v-model="innerText"
          :placeholder="placeholder"
          clearable
          class="radio-with-input"
          :maxlength="maxLength"
          :disabled="disabled"
        ></el-input>
        <template #readContent
          ><el-button
            v-if="inputIsLink"
            class="radio-with-link"
            type="primary"
            link
            @click="openLink(text)"
            >{{ innerText }}</el-button
          >
          <span v-else>{{ innerText }}</span>
        </template>
      </ProFieldCustom>
    </template>
  </RadioWithExtra>
</template>

<script setup lang="ts">
import { ProFieldCustom } from '@bole-core/components';
import { openLink } from '@/utils';
import RadioWithExtra from './RadioWithExtra.vue';

defineOptions({
  name: 'RadioWithInput',
});

type Props = {
  modelValue: string | number;
  text: string;
  placeholder?: string;
  showExtra: boolean;
  inputIsLink?: boolean;
  maxLength?: number;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showExtra: false,
  inputIsLink: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void;
  (e: 'update:text', val: string): void;
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
const innerText = computed({
  get() {
    return props.text;
  },
  set(val) {
    emit('update:text', val);
  },
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.radio-with-input {
  width: 200px;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
}
</style>
