<template>
  <ProFieldCustom>
    <RichEdit v-model="innerModelValue" :maxlength="maxlength"></RichEdit>
    <template #readContent>
      <RichContent :content="innerModelValue" />
    </template>
  </ProFieldCustom>
</template>

<script setup lang="ts">
import { ProFieldCustom } from '@bole-core/components';
import RichEdit from './RichEdit.vue';
import RichContent from './RichContent.vue';

defineOptions({
  name: 'FormRichEdit',
});

type Props = {
  modelValue?: API.IntroInfo[];
  maxlength?: number;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [] as API.IntroInfo[],
});

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: API.IntroInfo[]): void;
}>();

const innerModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
</script>
