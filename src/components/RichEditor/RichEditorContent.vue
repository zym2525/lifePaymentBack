<template>
  <Editor
    class="rich-editor-simple"
    style="overflow-y: hidden"
    :modelValue="content"
    mode="simple"
    :defaultConfig="editorConfig"
  />
</template>

<script setup lang="ts">
import '@wangeditor-next/editor/dist/css/style.css';
import { Editor } from '@wangeditor-next/editor-for-vue';
import { IEditorConfig } from '@wangeditor-next/editor';

defineOptions({
  name: 'RichEditorContent',
});

type Props = {
  content: string;
};

const props = withDefaults(defineProps<Props>(), {});

const editorConfig: Partial<IEditorConfig> = {
  autoFocus: false,
  readOnly: true,
};
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.rich-editor-simple {
  :deep() {
    [data-slate-editor] {
      padding: 0;
    }
  }
}
</style>
