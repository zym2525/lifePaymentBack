<template>
  <div class="insure-detail-content-grid-item">
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

.insure-detail-content-grid-item {
  min-width: 0;
}
</style>
