<template>
  <ProFieldCustom>
    <div class="select-tags-wrapper">
      <div class="select-tags-top-view">
        <el-radio-group v-model="state.tagMode">
          <el-radio-button class="select-tags-top-view-radio" :value="TagMode.System"
            >系统标签</el-radio-button
          >
          <el-radio-button class="select-tags-top-view-radio" :value="TagMode.Custom"
            >自定义</el-radio-button
          >
        </el-radio-group>
        <template v-if="state.tagMode === TagMode.Custom">
          <el-input
            class="select-tags-top-view-input"
            v-model.trim="state.customInputValue"
            placeholder="请输入新标签"
            :maxlength="8"
            :validate-event="false"
          />
          <el-button class="add-tags-button" link type="primary" @click="handleAddTag">
            添加标签 <el-icon> <circle-plus /> </el-icon
          ></el-button>
        </template>
      </div>
      <div class="select-tags-content-view">
        <div class="selected-tags-wrapper">
          <div class="selected-tags-title">
            已选择标签（{{ props.modelValue.length }}/{{ maxSelectedTagLength }}）
          </div>
          <TagGroup>
            <TagGroupItem
              v-for="tag in props.modelValue"
              :key="tag.value"
              showCloseBtn
              @close="hanldeRemoveSelectedTag(tag)"
              >{{ tag.text }}</TagGroupItem
            >
          </TagGroup>
        </div>
        <div class="select-tags-list-wrapper">
          <div class="select-tags-list-tab">
            <div
              v-for="group in groupTagList"
              :key="group.value"
              :class="['select-tags-list-tab-item', { active: group.value === state.activeTab }]"
              @click="handleChangeTab(group.value)"
            >
              {{ group.label }}
            </div>
          </div>
          <TagGroup>
            <TagGroupItem
              v-for="tag in groupTagOptions"
              :key="tag.value"
              can-select
              :active="props.modelValue.some((item) => item.value === tag.value)"
              @click="handleSelectTag(tag)"
              :show-close-btn="tag.canDelete"
              @close="handleDeleteOption(tag)"
              >{{ tag.text }}</TagGroupItem
            >
          </TagGroup>
        </div>
      </div>
    </div>
    <template #readContent>{{ props.modelValue.map((x) => x.text).join(',') }}</template>
  </ProFieldCustom>
</template>

<script setup lang="ts">
import { Message } from '@bole-core/core';
import TagGroup from './TagGroup.vue';
import TagGroupItem from './TagGroupItem.vue';
import {
  selectTagsProps,
  GroupTagListItemOption,
  SelectedTag,
  GroupTagListItem,
} from './selectTags';
import { useFormItem } from 'element-plus';
import { ProFieldCustom } from '@bole-core/components';

defineOptions({
  name: 'SelectTags',
});

const { formItem } = useFormItem();

const props = defineProps(selectTagsProps);

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectedTag[]): void;
  (e: 'addTag', value: string): void;
}>();

enum TagMode {
  System = 1,
  Custom,
}

const state = reactive({
  tagMode: TagMode.System,
  customInputValue: '',
  activeTab: props.groupTagList?.[0]?.value ?? '',
});

const flatTagList = (groupList: GroupTagListItem[]) => {
  let list: GroupTagListItemOption[] = [];
  groupList.forEach((item) => {
    list.push(...item.options);
  });
  return list;
};

watch(
  () => props.groupTagList,
  (newGroupTagList, oldGroupTagList) => {
    if (!props.groupTagList.some((x) => x.value === state.activeTab)) {
      state.activeTab = props.groupTagList?.[0]?.value ?? '';
    }

    if (!oldGroupTagList?.length && newGroupTagList?.length) {
      const tagList = flatTagList(props.groupTagList);

      emit(
        'update:modelValue',
        props.modelValue.filter((item) => tagList.some((x) => x.value === item.value))
      );
    }
  },
  {
    immediate: true,
  }
);

function updateModelValue(val: SelectedTag[]) {
  emit('update:modelValue', val);
  formItem?.validate?.('select');
}

const groupTagOptions = computed(() => {
  const group = props.groupTagList.find((item) => item.value === state.activeTab);
  if (!group) {
    return [];
  }
  return group.options;
});

function handleChangeTab(value: string) {
  state.activeTab = value;
}

function handleSelectTag(tag: GroupTagListItemOption) {
  if (props.modelValue.some((item) => item.value === tag.value)) {
    hanldeRemoveSelectedTag(tag);
  } else {
    if (props.modelValue.length >= props.maxSelectedTagLength) {
      Message.warnMessage(`最多选择${props.maxSelectedTagLength}个标签`);
      return;
    }
    updateModelValue([...props.modelValue, { text: tag.text, value: tag.value }]);
  }
}

function hanldeRemoveSelectedTag(tag: SelectedTag) {
  updateModelValue(props.modelValue.filter((item) => item.value !== tag.value));
}

function handleAddTag() {
  if (!state.customInputValue) {
    Message.warnMessage('请输入新标签');
    return;
  }
  emit('addTag', state.customInputValue);
  state.customInputValue = '';
}

async function handleDeleteOption(option: GroupTagListItemOption) {
  try {
    if (props.onDeleteCustomOption) {
      await props.onDeleteCustomOption(option);
    }
    updateModelValue(props.modelValue.filter((item) => item.value !== option.value));
  } catch (error) {}
}

// function handleAddTagChange(event) {
//   console.log('event: ', event);
// }
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.select-tags-wrapper {
  width: 100%;

  .select-tags-top-view {
    display: flex;
    align-items: center;

    .select-tags-top-view-radio {
      :deep(.el-radio-button__inner) {
        width: 120px;
      }
    }

    .select-tags-top-view-input {
      margin-left: 16px;
      width: 200px;

      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
      }
    }

    .add-tags-button {
      margin-left: 16px;

      .el-icon {
        margin-left: 6px;
      }
    }
  }

  .select-tags-content-view {
    margin-top: 20px;
    padding: 28px 24px 30px 34px;
    border: 1px solid getCssVar('border', 'color');
    border-radius: 4px;

    .selected-tags-wrapper {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid getCssVar('border', 'color');

      .selected-tags-title {
        margin-bottom: 22px;
        font-size: 16px;
        color: getCssVar('text-color', 'primary');
        line-height: 1;
      }
    }

    .select-tags-list-wrapper {
      .select-tags-list-tab {
        display: flex;
        margin-bottom: 20px;

        .select-tags-list-tab-item {
          margin-right: 34px;
          height: 27px;
          font-size: 16px;
          color: getCssVar('text-color', 'primary');
          box-sizing: border-box;
          line-height: 1;
          cursor: pointer;

          &:last-child {
            margin-right: 0;
          }

          &.active {
            border-bottom: 2px solid getCssVar('color', 'primary');
            color: getCssVar('color', 'primary');
          }
        }
      }
    }
  }
}
</style>
