<template>
  <PageFormLayoutV2 :class="['page-jj-layout', { hasFooter }]" :scrollable="props.scrollable">
    <template #title>
      <slot name="title">
        <PageTitleV2 :show-line="props.showLine" :title="props.title" :sub-title="props.subTitle">
          <template #titleRight>
            <slot name="titleRight"></slot>
          </template>
        </PageTitleV2>
      </slot>
    </template>
    <slot />
    <template #footer v-if="$slots.footer">
      <slot name="footer"> </slot>
    </template>
  </PageFormLayoutV2>
</template>

<script setup lang="ts">
import PageTitleV2 from './PageTitleV2.vue';
import PageFormLayoutV2 from './PageFormLayoutV2.vue';
import { PageTitleV2Props } from './pageJJ';

defineOptions({
  name: 'PageJJLayout',
});

type Props = {
  scrollable?: boolean;
} & PageTitleV2Props;

const props = withDefaults(defineProps<Props>(), {
  scrollable: true,
});

const slots = useSlots();
const hasFooter = computed(() => !!slots.footer);
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.page-jj-layout {
  padding: boleGetCssVar('jj-page', 'page-v') boleGetCssVar('jj-page', 'page-h');
  --bole-pro-form-input-height: #{boleGetCssVar('jj-page', 'input-height')};

  :deep() {
    .el-form {
      padding: 40px 0 0;
    }

    .bl-table.pro-table-wrapper .pro-table-container {
      padding: 0;
    }

    .steps-form-wrapper {
      padding-top: 40px;
    }

    .page-form-layout-v2 .el-dialog .el-form {
      padding: 0;
    }

    .page-form-layout .el-dialog .el-form {
      padding: 0;
    }
  }

  &.hasFooter {
    padding-bottom: 0;

    :deep() {
      .page-form-layout-v2-footer {
        padding: 0;
      }
    }
  }
}
</style>
