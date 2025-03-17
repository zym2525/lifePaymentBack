<template>
  <ProFieldCustom>
    <el-scrollbar
      v-if="editorType === EditorType.WXContent"
      :maxHeight="300"
      class="rich-editor-read-content"
    >
      <div v-html="modelValue"></div>
    </el-scrollbar>
    <RichEditor v-else v-model="innerModelValue" :placeholder="placeholder" />

    <template #readContent>
      <el-scrollbar :maxHeight="300" class="rich-editor-read-content">
        <RichEditorContent :content="modelValue"></RichEditorContent>
      </el-scrollbar>
    </template>
  </ProFieldCustom>
</template>

<script setup lang="ts">
import { ProFieldCustom } from '@bole-core/components';
import { useVModel } from '@/hooks';
import RichEditor from './RichEditor.vue';
import RichEditorContent from './RichEditorContent.vue';
import { EditorType } from '@/constants';

defineOptions({
  name: 'ProFormRichEditor',
});

type Props = {
  modelValue: string;
  placeholder?: string;
  editorType?: EditorType;
};

const props = withDefaults(defineProps<Props>(), {
  editorType: EditorType.Rich,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
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

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.rich-editor-read-content {
  padding: 5px 11px;
  width: 100%;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
}
</style>
