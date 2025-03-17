<template>
  <div :class="['form-cell-v2-wrapper', { formCellMarginBottom: needFormCellMarginBottom }]">
    <div class="form-cell-title">
      <div class="form-cell-title-left">
        {{ props.title }} <span v-if="subTitle" class="form-cell-sub-title">{{ subTitle }}</span>
      </div>
      <slot name="titleRight"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FormCellV2',
});

type Props = {
  title?: string;
  subTitle?: string;
  needFormCellMarginBottom?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  needFormCellMarginBottom: false,
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.form-cell-v2-wrapper {
  overflow: hidden;
  --bole-pro-form-input-height: #{boleGetCssVar('jj-page', 'input-height')};

  .form-cell-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    font-size: 14px;
    font-weight: bold;
    color: getCssVar('text-color', 'primary');
    line-height: 22px;

    .form-cell-title-left {
      display: flex;
      align-items: center;

      &::before {
        content: '';
        display: inline-block;
        margin-right: 8px;
        width: 2px;
        height: 16px;
        background-color: getCssVar('color', 'primary');
      }
    }

    .form-cell-sub-title {
      margin-left: 8px;
      font-size: 12px;
      color: getCssVar('text-color', 'secondary');
    }
  }

  &.formCellMarginBottom {
    margin-bottom: 10px;
  }

  :deep() {
    .bl-table.pro-table-wrapper .pro-table-container {
      padding: 0;
    }
  }
}
</style>
