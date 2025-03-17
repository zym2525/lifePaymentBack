<template>
  <div
    class="grid-layout-wrapper"
    :style="{
      'grid-template-columns': `repeat(${chunkSize}, 1fr)`,
      'grid-column-gap': `${gutter}px`,
      'grid-row-gap': `${rowGap ? gutter : rowGutter}px`,
    }"
  >
    <div class="grid-layout-item" v-for="(item, index) in tableData" :key="index">
      <slot name="item" :item="item" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T = any">
defineOptions({
  name: 'GridView',
});

type Props = {
  chunkSize?: number;
  gutter: number;
  tableData: T[];
  rowGap?: boolean;
  rowGutter?: number;
};

const props = withDefaults(defineProps<Props>(), {
  gutter: 0,
  rowGutter: 0,
  chunkSize: 0,
  rowGap: false,
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.grid-layout-wrapper {
  display: grid;

  .grid-layout-item {
    min-width: 0;
  }
}
</style>
