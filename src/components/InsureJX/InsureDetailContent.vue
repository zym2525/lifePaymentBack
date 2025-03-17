<template>
  <div class="insure-detail-content">
    <div class="insure-detail-content-title" v-if="title || $slots.title || $slots.titleRight">
      <div class="insure-detail-content-title-inner">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </div>
      <div class="insure-detail-content-title-right">
        <slot name="title-right"></slot>
      </div>
    </div>
    <div class="insure-detail-content-wrapper">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'InsureDetailContent',
});

type Props = {
  title?: string;
};

const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.insure-detail-content {
  margin: 40px 0;
  border: #e8e8e8 1px solid;
  border-radius: 4px;

  .insure-detail-content-title {
    display: flex;
    align-items: center;
    padding: 0 24px;
    height: 40px;
    background: #f5f5f5;
  }

  .insure-detail-content-title-inner {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    color: getCssVar('text-color', 'primary');
  }

  .insure-detail-content-wrapper {
    padding: 40px 24px;
  }
}
</style>
