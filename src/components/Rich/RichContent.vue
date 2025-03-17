<template>
  <div class="rich-edit-content">
    <template v-for="(item, index) in props.content" :key="index">
      <ReadAbleImage v-if="item.type === EditorType.Image" :src="setOSSLink(item.path)" />
      <video-player
        v-else-if="item.type === EditorType.Video"
        class="video-player-box"
        playsinline
        :options="{
          aspectRatio: '16:9',
          autoplay: false,
          muted: false,
          language: 'en',
          fluid: false,
          poster: '', // 封面地址
          controls: true,
          controlBar: {
            timeDivider: false, // 当前时间和持续时间的分隔符
            durationDisplay: false, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true, // 是否显示全屏按钮
          },
          sources: [
            {
              type: 'video/mp4', // 类型
              src: setOSSLink(item.path), // url地址
            },
          ],
        }"
        src="/src/assets/boleclound.png"
      />
      <RichEditorContent
        v-else-if="item.type === EditorType.Rich"
        :content="item.content"
      ></RichEditorContent>
      <FieldTextArea v-else v-model="item.content" style="width: 700px" isItemRead></FieldTextArea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { EditorType } from '@/constants';
import { setOSSLink } from '@/utils';
import { ReadAbleImage, FieldTextArea } from '@bole-core/components';
import { VideoPlayer } from '@videojs-player/vue';
import RichEditorContent from '../RichEditor/RichEditorContent.vue';

defineOptions({
  name: 'RichContent',
});

type Props = {
  content: API.IntroInfo[];
};

const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.rich-edit-content {
  .video-player-box {
    margin-bottom: 14px;
    padding-top: 0 !important;
    width: 400px;
    height: 150px;
  }

  :deep(.pro-from-item-read-content-wrapper) {
    margin-bottom: 10px;
  }
}
</style>
