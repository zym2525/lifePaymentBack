<template>
  <div class="set-cover-btn" @click="emit('click', isCover)">
    {{ isCover ? '取消封面' : '设为封面' }}
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SetCoverBtn',
});

type Props = {
  isCover?: boolean;
};

withDefaults(defineProps<Props>(), {
  isCover: false,
});

const emit = defineEmits<{
  (e: 'click', val: boolean): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.set-cover-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  line-height: 2;
}
</style>
