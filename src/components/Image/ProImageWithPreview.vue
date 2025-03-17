<template>
  <el-image fit="cover" :src="src" @click="handlePreview" class="pro-image-with-preview" />
</template>

<script setup lang="ts">
import { bolePreview } from '@bole-core/components';

defineOptions({
  name: 'ProImageWithPreview',
});

type Props = {
  src: string;
};

const props = withDefaults(defineProps<Props>(), {});

function handlePreview() {
  bolePreview({
    fileUrl: props.src,
  });
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.pro-image-with-preview {
  cursor: pointer;
}
</style>
