<template>
  <div class="transaction-table-title-wrapper">
    <slot>
      <div class="transaction-table-title-wrapper-item">{{ title1 }}</div>
      <div class="transaction-table-title-wrapper-item">{{ title2 }}</div>
      <div class="transaction-table-title-wrapper-item">{{ title3 }}</div>
      <div class="transaction-table-title-wrapper-item">{{ title4 }}</div>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TransactionTableTitle',
});

type Props = {
  title1: string;
  title2: string;
  title3: string;
  title4: string;
};

const _props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.transaction-table-title-wrapper {
  display: grid;
  padding: 16px 0;
  border-radius: 4px 4px 0 0;
  background-color: #3a71ff;
  grid-template-columns: 2fr 2fr 1fr 1fr;

  .transaction-table-title-wrapper-item {
    padding-left: 24px;
    font-size: 14px;
    color: #e2eaff;
    line-height: 20px;
  }
}
</style>
