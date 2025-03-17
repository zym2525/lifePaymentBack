<template>
  <div class="configure-insure-product-wrapper">
    <div class="configure-insure-product-left">
      <div class="configure-insure-product-item">
        {{ productName }}
        <el-button type="primary" link @click="toggleShow()">{{
          `共${schemeTypeCount ?? 0}方案`
        }}</el-button>
      </div>
      <el-collapse-transition>
        <div class="configure-insure-product-scheme" v-show="isShow">
          <TextOverTooltip>{{ schemeName.join('/') }}</TextOverTooltip>
        </div>
      </el-collapse-transition>
    </div>
    <div class="configure-insure-product-right">
      <el-switch
        v-model="isAuthed"
        inline-prompt
        active-text="开"
        inactive-text="关"
        :before-change="beforeChange"
        style="height: auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { TextOverTooltip } from '@bole-core/components';

defineOptions({
  name: 'ConfigureInsureProductItem',
});

type Props = {
  productName?: string;
  schemeTypeCount?: number;
  schemeName?: string[];
  beforeChange?: () => Promise<boolean>;
};

const props = withDefaults(defineProps<Props>(), {
  schemeName: () => [] as string[],
});

const [isShow, toggleShow] = useToggle();

const isAuthed = defineModel<boolean>('isAuthed');
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.configure-insure-product-wrapper {
  display: flex;
  justify-content: space-between;

  .configure-insure-product-left {
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
  }

  .configure-insure-product-item {
    display: flex;
    align-items: center;
  }

  .configure-insure-product-scheme {
    margin-top: 15px;
    padding: 10px 8px;
    font-size: 14px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    line-height: 20px;
  }
}
</style>
