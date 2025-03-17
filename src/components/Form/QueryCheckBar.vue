<template>
  <div class="query-check-bar-wrapper">
    <div class="query-check-bar-label">{{ label }}</div>
    <div class="query-check-bar-group-wrapper">
      <el-checkbox-group v-model="innerModelValue">
        <slot></slot>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'QueryCheckBar',
});

type Props = {
  label?: string;
  modelValue?: (string | number)[];
};

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: 'update:modelValue', val: (string | number)[]): void;
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

.query-check-bar-wrapper {
  display: flex;
  align-items: flex-start;
  padding-right: boleGetCssVar('proTable', 'filter-bar-horizontal-padding');
  padding-left: boleGetCssVar('proTable', 'filter-bar-horizontal-padding');
  background-color: #ffffff;

  .query-check-bar-label {
    padding-right: 12px;
    font-size: 14px;
    color: getCssVar('text-color', 'regular');
    line-height: 32px;
  }

  :deep(.el-checkbox__inner) {
    display: none;
  }

  :deep(.el-checkbox__label) {
    padding-left: 0;
  }

  :deep(.el-checkbox) {
    margin-right: 16px;
  }

  .query-check-bar-group-wrapper {
    flex: 1;
    min-width: 0;
  }
}
</style>
