<template>
  <div class="insure-detail-content-grid">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'InsureDetailContentGrid',
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.insure-detail-content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
}
</style>
