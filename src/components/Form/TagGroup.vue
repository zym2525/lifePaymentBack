<template>
  <div class="tag-group-wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TagGroup',
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.tag-group-wrapper {
  display: flex;
  overflow-y: auto;
  margin: -10px;
  max-height: 400px;
  flex-wrap: wrap;
}
</style>
