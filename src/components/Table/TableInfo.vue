<template>
  <div class="table-info">
    <div class="table-info-title" v-if="title">{{ title }}</div>
    <div class="table-info-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TableInfo',
});

type Props = {
  title?: string;
};

const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.table-info {
  .table-info-title {
    color: getCssVar('text-color', 'primary');
  }
}
</style>
