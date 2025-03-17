<template>
  <div class="transaction-table-wrapper">
    <div class="transaction-table-title">
      <div class="transaction-table-title-left">
        <slot name="titleLeft"></slot>
      </div>
      <div class="transaction-table-title-right ellipsis">
        <slot name="titleRight"></slot>
      </div>
    </div>
    <div class="transaction-table-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TransactionTable',
});

type Props = {};

const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.transaction-table-wrapper {
  margin-top: 16px;

  .transaction-table-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 24px;
    background-color: #f5f5f5;

    .transaction-table-title-left {
      font-size: 14px;
      line-height: 20px;
      color: getCssVar('text-color', 'primary');
    }

    .transaction-table-title-right {
      font-size: 14px;
      line-height: 20px;
      color: getCssVar('text-color', 'secondary');
    }
  }

  .transaction-table-content {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    align-items: center;
    border: #e8e8e8 1px solid;
    border-top: none;
  }
}
</style>
