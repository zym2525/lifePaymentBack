<template>
  <div class="table-info-item">
    <div class="table-info-item-label" v-if="label">{{ label }}</div>
    <div class="table-info-item-text">{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TableInfoItem',
});

type Props = {
  label?: string;
  content?: string;
};

const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.table-info-item {
  display: flex;
  justify-content: center;
  font-size: 14px;

  .table-info-item-label {
    margin-right: 8px;
    color: getCssVar('text-color', 'regular');
  }

  .table-info-item-text {
    color: getCssVar('text-color', 'primary');
  }
}
</style>
