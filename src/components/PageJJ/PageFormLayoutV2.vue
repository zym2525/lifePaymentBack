<template>
  <div class="page-form-layout-v2">
    <slot name="title">
      <div v-if="props.title" class="page-form-layout-v2-title-wrapper">
        <div class="page-form-layout-v2-title-left">
          <div class="page-form-layout-v2-title-line"></div>
          <div class="page-form-layout-v2-title">{{ props.title }}</div>
        </div>
        <slot name="titleRight"></slot>
      </div>
    </slot>
    <el-scrollbar v-if="props.scrollable">
      <slot />
    </el-scrollbar>
    <slot v-else />
    <span v-if="$slots.footer" class="page-form-layout-v2-footer">
      <slot name="footer"> </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PageFormLayoutV2',
});

type Props = {
  scrollable?: boolean;
  title?: string;
};

const props = withDefaults(defineProps<Props>(), {
  scrollable: true,
});
</script>
