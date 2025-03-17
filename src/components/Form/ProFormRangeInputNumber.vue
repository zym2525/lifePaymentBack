<template>
  <ProFieldCustom>
    <FieldInputNumber v-model="innerLeft" :controls="false" v-bind="leftProps" />
    <div class="form-input-separator">{{ separator }}</div>
    <FieldInputNumber v-model="innerRight" :controls="false" v-bind="rightProps" />
    <div class="form-input-unit" v-if="unit">{{ unit }}</div>
    <template #readContent>{{ readContent }}</template>
  </ProFieldCustom>
</template>

<script setup lang="ts">
import { ProFieldCustom, FieldInputNumber } from '@bole-core/components';
import { useVModel } from '@/hooks';

defineOptions({
  name: 'ProFormRangeInputNumber',
});

type Props = {
  left: number;
  right: number;
  leftProps?: object;
  rightProps?: object;
  separator?: string;
  unit?: string;
};

const props = withDefaults(defineProps<Props>(), {
  leftProps: () => ({}),
  rightProps: () => ({}),
  separator: '至',
});

const emit = defineEmits<{
  (e: 'update:left', val: number): void;
  (e: 'update:right', val: number): void;
}>();

const innerLeft = useVModel(props, 'left', emit);
const innerRight = useVModel(props, 'right', emit);

const readContent = computed(() => {
  return `${innerLeft.value}${props.separator}${innerRight.value}${props.unit ?? ''}`;
});
</script>
