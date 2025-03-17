<template>
  <div :class="['image-upload-wrapper', wrapperClass]">
    <ProFormImageUpload :fileDirectory="OssCover" v-model:file-url="innerFileUrl" v-bind="$attrs">
      <template #actions="{ file }">
        <SetCoverBtn :isCover="file.isMain" @click="handleSetCover(file)"></SetCoverBtn>
      </template>
    </ProFormImageUpload>
    <ProFieldCustom v-if="demoCoverList.length > 0">
      <div class="system-cover-list-wrapper">
        <div class="system-cover-list-title">您还可以从系统中选择图片：</div>
        <div class="system-cover-list">
          <div class="system-cover-list-item" v-for="cover in demoCoverList" :key="cover.url">
            <img :src="cover.url" @click="handleUploadSystemCover(cover.url)" />
          </div>
        </div>
      </div>
      <template #readContent><span></span></template>
    </ProFieldCustom>
  </div>
</template>

<script setup lang="ts">
import { ProFormImageUpload, ProFieldCustom } from '@bole-core/components';
import SetCoverBtn from './SetCoverBtn.vue';
import { imageUrlToFile, uploadRequest, convertApi2FormUrl } from '@/utils';
import { Message } from '@bole-core/core';
import { OssCover } from '@/constants';
import { CoverItem } from './upload';

defineOptions({
  name: 'ProFormImageUploadWithDemo',
  inheritAttrs: false,
});

type Props = {
  demoCoverList: API.CoverMsg[];
  wrapperClass?: string;
  fileUrl: CoverItem[];
};

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: 'update:fileUrl', val: CoverItem[]): void;
}>();

const innerFileUrl = computed({
  get() {
    return props.fileUrl;
  },
  set(val) {
    emit('update:fileUrl', val);
  },
});

async function handleUploadSystemCover(url: string) {
  try {
    const file = await imageUrlToFile(url, 'cover.png');
    let res = await uploadRequest({
      file: file,
      fileDirectory: OssCover,
    });
    emit('update:fileUrl', [...props.fileUrl, convertApi2FormUrl(res.url)]);
  } catch (error) {
    Message.errorMessage('上传失败');
  }
}

function handleSetCover(file: CoverItem) {
  emit(
    'update:fileUrl',
    props.fileUrl.map((x) => {
      return {
        ...x,
        isMain: x.uid === file.uid,
      };
    })
  );
}

watch(
  () => props.fileUrl.length,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      const index = props.fileUrl.findIndex((x) => x.isMain);
      if (index < 0) {
        handleSetCover(props.fileUrl[0]);
      }
    }
  }
);
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.image-upload-wrapper {
  display: flex;
  align-items: flex-start;
  width: 100%;

  :deep(.upload-wrapper) {
    width: auto;
  }

  .system-cover-list-wrapper {
    margin-left: 20px;
    flex-direction: column;

    .system-cover-list-title {
      margin-bottom: 14px;
      font-size: 12px;
      color: getCssVar('text-color', 'primary');
      line-height: 1;
    }

    .system-cover-list {
      display: flex;
      flex-wrap: wrap;
      margin: -4px;

      .system-cover-list-item {
        padding: 4px;

        img {
          width: 94px;
          height: 94px;
          border: 1px solid var(--el-border-color);
          border-radius: 6px;
          box-sizing: border-box;
          object-fit: contain;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
