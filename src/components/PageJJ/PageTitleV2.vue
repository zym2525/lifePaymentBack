<template>
  <div :class="['page-title-v2-wrapper', { showLine }]">
    <div class="page-title-inner">
      <div class="page-title">{{ title }}</div>
      <div class="page-sub-title" v-if="subTitle">{{ subTitle }}</div>
    </div>
    <slot name="titleRight"></slot>
  </div>
</template>

<script setup lang="ts">
import { PageTitleV2Props } from './pageJJ';

defineOptions({
  name: 'PageTitleV2',
});

const props = withDefaults(defineProps<PageTitleV2Props>(), {
  showLine: false,
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.page-title-v2-wrapper {
  display: flex;
  align-items: center;
  padding-bottom: boleGetCssVar('jj-page', 'page-v');

  &.showLine {
    border-bottom: 1px solid #eeeeee;
  }

  .page-title-inner {
    display: flex;
    align-items: center;
    min-width: 0;
    flex: 1;
  }

  .page-title {
    font-size: 16px;
    font-weight: bold;
    color: getCssVar('text-color', 'primary');
    line-height: 22px;
  }

  .page-sub-title {
    margin-left: 16px;
    font-size: 12px;
    color: #7a7a7a;
    line-height: 14px;
  }

  :deep() {
    .el-button {
      --bole-pro-form-input-height: 32px;
      padding: 8px 25px;
    }
  }
}
</style>
