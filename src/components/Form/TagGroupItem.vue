<template>
  <div class="tag-group-item-wrapper">
    <div :class="['tag-group-item', { active: props.active, canSelect: props.canSelect }]">
      <slot />
      <div v-if="showCloseBtn" class="close-btn-wrapper" @click.stop="emit('close')">
        <el-icon class="close-btn" :size="12"> <close /> </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TagGroupItem',
});

type Props = {
  active?: boolean;
  canSelect?: boolean;
  showCloseBtn?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  active: false,
  canSelect: false,
  showCloseBtn: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.tag-group-item-wrapper {
  padding: 10px;

  .tag-group-item {
    position: relative;
    padding: 0 10px;
    height: 30px;
    font-size: 14px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    text-align: center;
    color: getCssVar('text-color', 'regular');
    background: #f3f3f3;
    transition: all 0.1s;
    line-height: 28px;

    &.canSelect {
      cursor: pointer;
    }

    &.active {
      border-color: getCssVar('color', 'primary', 'light-9');
      color: getCssVar('color', 'primary');
      background: getCssVar('color', 'primary', 'light-9');
    }

    .close-btn-wrapper {
      position: absolute;
      top: -6px;
      right: -6px;
      padding: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: getCssVar('color', 'danger');
      cursor: pointer;
      box-sizing: border-box;
      line-height: 14px;
    }

    .close-btn {
      border-radius: 50%;
      color: #ffffff;
    }
  }
}
</style>
