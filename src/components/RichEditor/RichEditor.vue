<template>
  <div style="border: 1px solid #cccccc">
    <Toolbar
      style="border-bottom: 1px solid #cccccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="overflow-y: hidden; height: 500px"
      v-model="innerModelValue"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
      @customPaste="handleCustomPaste"
      @onChange="handleChange"
      @onBlur="handleBlur"
      mode="simple"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'RichEditor',
};
</script>

<script setup lang="ts">
import '@wangeditor-next/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue';
import { IEditorConfig, IDomEditor, IToolbarConfig, DomEditor } from '@wangeditor-next/editor';
import { OssRich } from '@/constants';
import { OssManager } from '@/utils';
import { RichEditorUtils } from '@bole-core/components';
import { useVModel } from '@/hooks';
import { useFormItem } from 'element-plus';

type Props = {
  modelValue: string;
  placeholder?: string;
  editorConfig?: Partial<IEditorConfig>;
  mode?: 'default' | 'simple';
};

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  editorConfig: () => ({} as Partial<IEditorConfig>),
  mode: 'default',
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
}>();

const innerModelValue = useVModel(props, 'modelValue', emit);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>();

// onMounted(() => {
//   setTimeout(() => {
//     const editor = editorRef.value;
//     const toolbar = DomEditor.getToolbar(editor);

//     const curToolbarConfig = toolbar.getConfig();
//     console.log(curToolbarConfig.toolbarKeys);
//   }, 2000);
// });

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor === null) return;
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

async function customUpload(file: File, insertFn) {
  // TS 语法
  // customInsert(res, insertFn) {                  // JS 语法
  // res 即服务端的返回结果
  // 从 res 中找到 url poster ，然后插入视频
  let res = await OssManager.asyncUpload({ file: file, fileDirectory: OssRich });

  insertFn(res.url, res.name, res.url);
}

const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      customUpload: customUpload,
    },
    uploadVideo: {
      async customUpload(file: File, insertFn) {
        // TS 语法
        // customInsert(res, insertFn) {                  // JS 语法
        // res 即服务端的返回结果
        // 从 res 中找到 url poster ，然后插入视频
        let res = await OssManager.asyncUpload({ file: file, fileDirectory: OssRich });

        insertFn(res.url, res.name, res.url);
      },
    },
    // insertImage: {
    //   onInsertedImage(imageNode: ImageElement | null) {
    //     // onInsertedImage(imageNode) {                    // JS 语法
    //     if (imageNode === null) return;

    //     const { src, alt, url, href } = imageNode;
    //     console.log('inserted image', src, alt, url, href);
    //   },
    //   checkImage(src) {
    //     console.log('src2: ', src);
    //     return src;
    //   },
    //   parseImageSrc(src) {
    //     console.log('src: ', src);
    //     return src;
    //   },
    // },
    // editImage: {
    //   checkImage(src) {
    //     console.log('src2: ', src);
    //     return src;
    //   },
    //   parseImageSrc(src) {
    //     console.log('src: ', src);
    //     return src;
    //   },
    // },
  },
  placeholder: props.placeholder,
  autoFocus: false,
  ...props.editorConfig,
};

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['emotion', 'group-video', 'insertTable', 'codeBlock', 'fullScreen'],
};

async function handleCustomPaste(
  editor: IDomEditor,
  event: ClipboardEvent,
  callback: (e: boolean) => any
) {
  let html = event.clipboardData.getData('text/html');
  const rtf = event.clipboardData.getData('text/rtf'); // 获取 rtf 数据（如从 word wsp 复制粘贴）
  if (html && rtf) {
    event.preventDefault();
    html = html.replace(/text\\-indent:\\-(.*?)pt/gi, '');
    const imgSrcs = RichEditorUtils.findAllImgSrcsFromHtml(html);
    // 如果有
    if (imgSrcs && Array.isArray(imgSrcs) && imgSrcs.length) {
      // 从rtf内容中查找图片数据
      const rtfImageData = RichEditorUtils.extractImageDataFromRtf(rtf);

      // 如果找到
      if (rtfImageData.length && imgSrcs.length === rtfImageData.length) {
        let urlList: string[] = [];
        for (let i = 0; i < rtfImageData.length; i++) {
          const hexData = rtfImageData[i];
          let file = RichEditorUtils.hexToFile(hexData.hex, hexData.type);
          let res = await OssManager.asyncUpload({ file: file, fileDirectory: OssRich });
          html = RichEditorUtils.replaceImagesFileSource(html, imgSrcs[i], res.url);
        }
        editor.dangerouslyInsertHtml(html);
      }
    }
    // 阻止默认的粘贴行为
    callback(false);
  } else {
    callback(true);
  }
}

const { formItem } = useFormItem();

function handleChange() {
  formItem?.validate('change');
}

function handleBlur() {
  formItem?.validate('blur');
}
</script>
