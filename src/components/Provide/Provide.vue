<template>
  <slot />
</template>

<script setup lang="ts">
import { ProvideKey } from './provide';
import type { PropType } from 'vue';

defineOptions({
  name: 'Provide',
});

const props = defineProps({
  config: {
    // eslint-disable-next-line
    type: Object as PropType<Partial<AppConfig>>,
    default: () => ({}),
  },
});

provide(ProvideKey, {
  config: props.config,
});
</script>
