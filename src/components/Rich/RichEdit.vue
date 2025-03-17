<template>
  <div class="rich-edit-wrapper">
    <div v-for="(item, index) in props.modelValue" :key="index" class="rich-edit-item-wrapper">
      <div class="rich-edit-item-top">
        <el-tooltip placement="top-start" content="上移">
          <el-button
            :disabled="index == 0"
            class="rich-edit-item-top-button"
            circle
            type="primary"
            icon="Top"
            @click="handleMoveUp(index)"
          ></el-button>
        </el-tooltip>
        <el-tooltip placement="top-start" content="下移">
          <el-button
            :disabled="index == props.modelValue.length - 1"
            class="rich-edit-item-top-button"
            circle
            type="primary"
            icon="Bottom"
            @click="handleMoveDown(index)"
          ></el-button>
        </el-tooltip>
        <el-tooltip placement="top-start" content="删除">
          <el-button
            :disabled="props.modelValue.length <= 1"
            class="rich-edit-item-top-button"
            circle
            type="primary"
            icon="Delete"
            @click="handleDelete(index)"
          ></el-button>
        </el-tooltip>
      </div>
      <div class="rich-edit-item">
        <FieldTextArea
          v-if="item.type === EditorType.Text"
          v-model="item.content"
          placeholder="请输入文本"
          :maxlength="maxLength"
        ></FieldTextArea>
        <ReadAbleImage v-else-if="item.type === EditorType.Image" :src="setOSSLink(item.path)" />
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
      </div>
    </div>

    <div class="rich-edit-actions">
      <el-button type="primary" icon="Plus" round @click="handleAddTextEditor">添加文本</el-button>
      <BlFileUpload
        accept="jpg/jpeg,png"
        :show-file-list="false"
        :on-success="uploadImageSuccess"
        :showTip="false"
        class="uploader-btn-wrapper"
      >
        <el-button type="primary" icon="Plus" round>添加图片</el-button>
      </BlFileUpload>
      <BlFileUpload
        :accept="'avi,mp4,wmv,mpg,mpg,mov,ram,swf,flv'"
        :show-file-list="false"
        :on-success="uploadVideoSuccess"
        :showTip="false"
        class="uploader-btn-wrapper"
      >
        <el-button type="primary" icon="Plus" round>添加视频</el-button>
      </BlFileUpload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FieldTextArea, ReadAbleImage, BlFileUpload } from '@bole-core/components';
import { VideoPlayer } from '@videojs-player/vue';
import { EditorType, EmptyTextEditorItem } from '@/constants';
import { setOSSLink } from '@/utils';

defineOptions({
  name: 'RichEdit',
});

type Props = {
  modelValue?: API.IntroInfo[];
  maxLength?: number;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [] as API.IntroInfo[],
});

function handleMoveUp(index: number) {
  [props.modelValue[index], props.modelValue[index - 1]] = [
    props.modelValue[index - 1],
    props.modelValue[index],
  ];
  props.modelValue.forEach((item, index) => {
    item.sequence = index;
  });
}

function handleMoveDown(index: number) {
  [props.modelValue[index + 1], props.modelValue[index]] = [
    props.modelValue[index],
    props.modelValue[index + 1],
  ];
  props.modelValue.forEach((item, index) => {
    item.sequence = index;
  });
}

function handleDelete(index: number) {
  // eslint-disable-next-line vue/no-mutating-props
  props.modelValue.splice(index, 1);
}

const createLastSequence = () => {
  const lastSequence = props.modelValue[props.modelValue.length - 1]?.sequence ?? 0;
  return lastSequence + 1;
};

function handleAddTextEditor() {
  // eslint-disable-next-line vue/no-mutating-props
  props.modelValue.push({
    ...EmptyTextEditorItem,
    sequence: createLastSequence(),
  });
}

function uploadImageSuccess(res) {
  console.log('file: ', res);
  // eslint-disable-next-line vue/no-mutating-props
  props.modelValue.push({
    type: EditorType.Image,
    path: res.path,
    sequence: createLastSequence(),
  });
}

function uploadVideoSuccess(res) {
  console.log('file: ', res);
  // eslint-disable-next-line vue/no-mutating-props
  props.modelValue.push({
    type: EditorType.Video,
    path: res.path,
    sequence: createLastSequence(),
  });
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.rich-edit-wrapper {
  width: 100%;

  .rich-edit-item-wrapper {
    margin-bottom: 16px;

    .rich-edit-item-top {
      margin-bottom: 6px;
    }

    .rich-edit-item-top-button {
      width: 24px;
      height: 24px !important;
      font-size: 12px;
    }

    .video-player-box {
      margin-bottom: 14px;
      padding-top: 0 !important;
      width: 400px;
      height: 150px;
    }
  }

  .uploader-btn-wrapper {
    display: inline-flex;
    vertical-align: middle;
    margin-left: 10px;
    width: auto !important;
  }
}
</style>
