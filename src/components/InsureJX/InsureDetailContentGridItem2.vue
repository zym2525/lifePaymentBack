<template>
  <div class="insure-detail-content-grid-item2">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'InsureDetailContentGridItem',
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.insure-detail-content-grid-item2 {
  display: inline-grid;
  min-width: 0;
  grid-column-end: span 2;
}
</style>
